# Testing Photo Upload & Additional Notes Feature

## Prerequisites
- MongoDB Atlas connection string in `.env` file
- Backend and Frontend running

## Step-by-Step Testing

### 1. Start Backend Server
```bash
cd backend
node server.js
```

**Expected Output:**
```
🚀 Server running on port 5000
✅ MongoDB Connected Successfully
Socket.IO server initialized
```

### 2. Start Frontend (ReportIncidents)
```bash
cd frontend/ReportIncidents
npm run dev
```

**Expected Output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

### 3. Test the Feature

#### Step 1: Select Disaster Type
1. Open browser: `http://localhost:5173`
2. Click on any disaster type (e.g., "Flood")
3. Click "Continue to Upload Photos"

#### Step 2: Upload Photo
1. Drag and drop an image OR click "Browse files"
2. Select an image (max 1MB)
3. Verify the image appears in the preview
4. Click "Continue to Location"

#### Step 3: Add Notes and Submit
1. Wait for location to be captured (green notification)
2. Type notes in "Additional Notes" field (e.g., "Water level rising near Main St.")
3. Click "Submit Report"

**Expected Result:**
- ✅ Success toast: "Incident reported successfully!"
- ✅ Form resets to Step 1
- ✅ Console shows no errors

### 4. Verify in MongoDB Atlas

1. Login to [MongoDB Atlas](https://cloud.mongodb.com)
2. Navigate to: **Databases → aegis → incidents collection**
3. Click "Browse Collections"
4. Find the latest document

**Expected Document Structure:**
```json
{
  "_id": ObjectId("..."),
  "type": "flood",
  "location": {
    "type": "Point",
    "coordinates": [-122.4194, 37.7749]
  },
  "photo": {
    "data": "iVBORw0KGgoAAAANSUhEUgAA...",  // Long Base64 string
    "contentType": "image/jpeg",
    "filename": "my-photo.jpg"
  },
  "additionalNotes": "Water level rising near Main St.",
  "status": "Pending",
  "createdAt": ISODate("2025-10-25T..."),
  "updatedAt": ISODate("2025-10-25T...")
}
```

### 5. Test Without Photo

Repeat steps but skip photo upload:
1. Select disaster type
2. Skip upload (click "Continue to Location")
3. Add notes
4. Submit

**Expected in MongoDB:**
```json
{
  "type": "flood",
  "photo": {
    "data": null,
    "contentType": null,
    "filename": null
  },
  "additionalNotes": "Test without photo"
}
```

### 6. Test Without Notes

Submit with photo but no notes:

**Expected in MongoDB:**
```json
{
  "type": "flood",
  "photo": {
    "data": "...",
    "contentType": "image/jpeg",
    "filename": "test.jpg"
  },
  "additionalNotes": ""
}
```

## Common Issues & Solutions

### Issue: Backend not starting
**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Kill process on port 5000
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue).OwningProcess -ErrorAction SilentlyContinue | Stop-Process -Force
```

### Issue: MongoDB connection error
**Error:** `MongooseServerSelectionError`

**Solution:**
1. Check `.env` file has correct `MONGODB_URI`
2. Verify MongoDB Atlas allows your IP address
3. Check network connection

### Issue: Photo too large
**Error:** "Some files exceed 1MB limit"

**Solution:**
- Frontend validates max 1MB per file
- Resize/compress image before uploading
- Use JPG instead of PNG for smaller size

### Issue: Location not captured
**Error:** "Unable to get location"

**Solution:**
1. Allow location permissions in browser
2. Check if browser supports geolocation
3. Default location will be used: San Francisco (-122.4194, 37.7749)

## API Testing with Postman/Thunder Client

### POST /api/incidents

**URL:** `http://localhost:5000/api/incidents`

**Method:** POST

**Body Type:** form-data

**Fields:**
| Key | Value | Type |
|-----|-------|------|
| type | flood | text |
| location | {"type":"Point","coordinates":[-122.4194,37.7749]} | text |
| photo | [select file] | file |
| additionalNotes | Test from Postman | text |

**Expected Response:**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Incident reported successfully.",
  "data": {
    "_id": "...",
    "type": "flood",
    "location": {
      "type": "Point",
      "coordinates": [-122.4194, 37.7749]
    },
    "photo": {
      "data": "...",
      "contentType": "image/jpeg",
      "filename": "test.jpg"
    },
    "additionalNotes": "Test from Postman",
    "status": "Pending",
    "createdAt": "2025-10-25T...",
    "updatedAt": "2025-10-25T..."
  }
}
```

## Verify Socket.IO Event

If admin dashboard is running, it should receive real-time notification:

**Event:** `new-incident`
**Payload:** The new incident object

## Success Criteria

✅ Photo uploaded and stored as Base64 in MongoDB  
✅ Additional notes saved to MongoDB  
✅ Location captured and stored as GeoJSON Point  
✅ Disaster type saved correctly  
✅ Status defaults to "Pending"  
✅ Timestamps (createdAt, updatedAt) auto-generated  
✅ Socket.IO emits event to Admin room  
✅ Frontend shows success notification  
✅ Form resets after submission  
✅ Temporary files cleaned up on server  

## Next Steps

After confirming data is stored in MongoDB:
1. Update Admin Dashboard to display photos
2. Update Public Map to show incident photos
3. Add photo gallery/carousel for multiple photos
4. Implement photo optimization/compression
