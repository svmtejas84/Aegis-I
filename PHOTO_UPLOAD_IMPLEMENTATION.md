# Photo Upload & Additional Notes Implementation

## Overview
This feature allows users to upload photos and add additional notes when reporting incidents. All data (photos and notes) are stored directly in MongoDB Atlas.

## Implementation Details

### 1. Backend Changes

#### Database Model (`backend/src/modules/incidents/incident.model.js`)
- **Added `photo` field** to store image data in MongoDB:
  ```javascript
  photo: {
    data: String,        // Base64 encoded image data
    contentType: String, // MIME type (e.g., 'image/jpeg', 'image/png')
    filename: String     // Original filename
  }
  ```
- **Added `additionalNotes` field** for user notes:
  ```javascript
  additionalNotes: {
    type: String,
    trim: true,
    default: ''
  }
  ```

#### Controller (`backend/src/modules/incidents/incident.controller.js`)
- **Removed Cloudinary dependency** - no longer using external image hosting
- **Photo Processing**:
  - Reads uploaded file from multer temporary storage
  - Converts image to Base64 string
  - Stores Base64 data, content type, and filename in MongoDB
  - Cleans up temporary files after processing
- **Additional Notes Handling**:
  - Extracts `additionalNotes` from request body
  - Stores in MongoDB with the incident

### 2. Frontend Changes

#### Form Submission (`frontend/ReportIncidents/src/App.tsx`)
- **Updated `handleSubmit` function** to include:
  - Photo file (if uploaded)
  - Additional notes (if provided)
  - Location (GeoJSON format)
  - Disaster type

#### Data Flow
```
User fills form → Uploads photo → Adds notes → Submit
                     ↓
              FormData created with:
              - type (disaster type)
              - location (GeoJSON)
              - photo (File object)
              - additionalNotes (string)
                     ↓
              POST /api/incidents
                     ↓
              Backend processes:
              - Converts photo to Base64
              - Saves to MongoDB Atlas
                     ↓
              Response with success/error
```

## How Photos are Stored

### Storage Method: Base64 in MongoDB
- Photos are converted to Base64 strings
- Stored directly in MongoDB document
- No external services needed (no Cloudinary required)

### Structure in MongoDB:
```json
{
  "_id": "...",
  "type": "Flood",
  "location": {
    "type": "Point",
    "coordinates": [-122.4194, 37.7749]
  },
  "photo": {
    "data": "iVBORw0KGgoAAAANSUhEUgAA...", // Base64 string
    "contentType": "image/jpeg",
    "filename": "flood-photo.jpg"
  },
  "additionalNotes": "Water level rising near Main St.",
  "status": "Pending",
  "createdAt": "2025-10-25T...",
  "updatedAt": "2025-10-25T..."
}
```

## Testing the Feature

### 1. Start Backend Server
```bash
cd backend
node server.js
```

### 2. Start Frontend
```bash
cd frontend/ReportIncidents
npm run dev
```

### 3. Test Flow
1. Select a disaster type
2. Upload a photo (max 1MB)
3. Add location (auto-captured or manual)
4. Type additional notes (optional)
5. Click "Submit Report"
6. Check MongoDB Atlas to verify data is stored

## API Endpoint

### POST `/api/incidents`
**Content-Type:** `multipart/form-data`

**Request Body:**
- `type` (string): Disaster type (e.g., "Flood", "Fire")
- `location` (JSON string): GeoJSON Point object
- `photo` (file): Image file (optional, max 1MB)
- `additionalNotes` (string): User notes (optional)

**Response:**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Incident reported successfully.",
  "data": {
    "_id": "...",
    "type": "Flood",
    "location": {...},
    "photo": {...},
    "additionalNotes": "...",
    "status": "Pending",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

## Advantages of This Approach

✅ **No External Dependencies**: No Cloudinary or other cloud storage needed
✅ **Simplified Setup**: Everything stored in MongoDB Atlas
✅ **Data Integrity**: Photo and incident data kept together
✅ **Cost Effective**: No additional storage costs

## Considerations

⚠️ **File Size Limit**: MongoDB documents limited to 16MB
⚠️ **Performance**: Base64 increases data size by ~33%
⚠️ **Frontend**: May need to convert Base64 back to images for display

## Next Steps

If you need to display the photos in the admin dashboard or public map:

1. **Convert Base64 to Image URL**:
```javascript
const imageUrl = `data:${photo.contentType};base64,${photo.data}`;
```

2. **Display in React**:
```jsx
<img src={imageUrl} alt="Incident photo" />
```

## MongoDB Atlas Verification

To verify the data is stored correctly:
1. Login to MongoDB Atlas
2. Navigate to your database: `aegis`
3. Check the `incidents` collection
4. You should see documents with the `photo` and `additionalNotes` fields populated
