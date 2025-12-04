# Testing Location Feature

## Quick Test Guide

### Setup
1. Make sure backend is running on port 5000
2. Make sure LocationPopup is running on port 3001
3. Make sure mapPublic is running on your configured port

### Test 1: Initial Location Permission
1. Navigate to: `http://localhost:3001` (LocationPopup)
2. Click "Allow Location" button
3. Browser should show permission dialog
4. Click "Allow" in browser dialog
5. **Expected Result:**
   - Button shows "Getting Location..." briefly
   - Location is captured
   - Automatically redirects to mapPublic
   - Map centers on your actual location
   - Blue location marker appears on map
   - Toast notification shows your coordinates

### Test 2: Location Permission Denied
1. Navigate to: `http://localhost:3001` (LocationPopup)
2. Click "Allow Location" button
3. Click "Block" in browser permission dialog
4. **Expected Result:**
   - Error alert appears
   - Stays on LocationPopup page
   - Error message explains permission was denied

### Test 3: Location Persistence
1. Complete Test 1 successfully
2. Close browser completely
3. Reopen and navigate directly to mapPublic
4. **Expected Result:**
   - Map loads centered on previously saved location
   - Toast shows "Location loaded" with coordinates
   - Blue location marker appears at saved position

### Test 4: Locate Me Button
1. On mapPublic page
2. Pan the map to a different location
3. Click the "Locate Me" button (top-right, compass icon)
4. **Expected Result:**
   - Toast shows "Locating..."
   - Browser may ask for permission again (if not granted)
   - Map smoothly animates back to your location
   - Toast shows "Location updated" with new coordinates
   - Blue location marker moves to new position

### Test 5: Location Update
1. Enable location services
2. Move to a different physical location (or use browser dev tools to simulate)
3. Click "Locate Me" button
4. **Expected Result:**
   - Map centers on new location
   - Location marker moves
   - New coordinates saved to localStorage

### Test 6: "Not Now" Button
1. Navigate to LocationPopup
2. Click "Not Now" button
3. **Expected Result:**
   - Alert message: "Can't proceed without location access..."
   - Stays on LocationPopup page

### Test 7: Close Button
1. Navigate to LocationPopup
2. Click X button (top-right)
3. **Expected Result:**
   - Same as clicking "Not Now"
   - Alert appears

## Using Browser DevTools

### Chrome DevTools - Simulate Location
1. Open DevTools (F12)
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Type "sensors"
4. Select "Show Sensors"
5. Under Location, select a preset or enter custom coordinates
6. Test location features

### Firefox DevTools - Simulate Location
1. Open DevTools (F12)
2. Click the three-dot menu
3. Settings → Advanced Settings
4. Enable "Geolocation"
5. Enter custom coordinates

## Checking localStorage

### View Stored Location
1. Open DevTools (F12)
2. Go to Application/Storage tab
3. Click "Local Storage" → your domain
4. Look for key: `userLocation`
5. Value should be JSON like:
```json
{
  "lat": 37.7749,
  "lng": -122.4194,
  "timestamp": "2025-10-25T12:00:00.000Z"
}
```

### Clear Stored Location
1. In localStorage view
2. Right-click on `userLocation`
3. Click "Delete"
4. Refresh page to test fresh location request

## Common Issues & Solutions

### Issue: Map doesn't center on location
**Solution:**
- Check browser console for errors
- Verify coordinates in localStorage are valid
- Clear localStorage and try again
- Check if ImmersiveMap is receiving center prop

### Issue: Browser doesn't ask for permission
**Solution:**
- You may have previously denied permission
- Clear site permissions:
  - Chrome: Click lock icon → Site Settings → Location → Reset
  - Firefox: Click lock icon → Clear cookies and site data
- Try in incognito/private mode

### Issue: "Geolocation not supported" error
**Solution:**
- Use modern browser (Chrome, Firefox, Edge, Safari)
- Must use localhost or HTTPS (not file://)
- Update your browser to latest version

### Issue: Location is inaccurate
**Solution:**
- Enable "High Accuracy" in code (already done)
- Ensure GPS is enabled on your device
- Test outdoors for better GPS signal
- On desktop, accuracy depends on IP geolocation

### Issue: Permission denied every time
**Solution:**
- Check browser location settings
- Make sure location services enabled on OS
- Grant browser permission to access location
- Some corporate networks block geolocation

## Expected Behavior Summary

### LocationPopup Page
- ✅ Clean UI with location icon
- ✅ "Allow Location" button requests permission
- ✅ Loading state during location fetch
- ✅ Error handling with helpful messages
- ✅ Stores location in localStorage
- ✅ Redirects to mapPublic on success

### MapPublic Page
- ✅ Loads saved location on mount
- ✅ Centers map on user location
- ✅ Shows blue location marker
- ✅ "Locate Me" button re-requests location
- ✅ Smooth map animations
- ✅ Toast notifications for feedback
- ✅ Fallback to default location if unavailable

## Testing Checklist

- [ ] LocationPopup loads correctly
- [ ] "Allow Location" button works
- [ ] Browser permission dialog appears
- [ ] Location stored in localStorage
- [ ] Redirect to mapPublic works
- [ ] Map centers on user location
- [ ] Blue location marker visible
- [ ] Toast notifications appear
- [ ] "Locate Me" button updates location
- [ ] Location persists after browser restart
- [ ] Error messages display correctly
- [ ] "Not Now" button shows alert
- [ ] Works on mobile devices
- [ ] Works on desktop browsers
- [ ] HTTPS/localhost only requirement

## Performance Checks

- [ ] Location request completes within 10 seconds
- [ ] Map animation is smooth
- [ ] No memory leaks (check DevTools)
- [ ] localStorage updates correctly
- [ ] Multiple location requests don't crash app
- [ ] Works offline (uses cached location)

## Security Checks

- [ ] Only works on HTTPS or localhost
- [ ] Requires explicit user permission
- [ ] Location not sent to backend (currently)
- [ ] localStorage is domain-specific
- [ ] No location data in URL parameters
- [ ] Permission can be revoked by user

## Next Steps After Testing

If all tests pass:
1. ✅ Feature is working correctly
2. Consider adding user location marker styling
3. Consider adding accuracy circle
4. Consider backend integration for location-based features
5. Add analytics to track location usage

If tests fail:
1. Check browser console for errors
2. Verify all code changes were applied
3. Clear browser cache and localStorage
4. Test in different browsers
5. Check network requests in DevTools
