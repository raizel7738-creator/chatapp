# Testing Checklist

Use this checklist to verify all features are working correctly.

## Pre-Testing Setup

- [ ] MongoDB is running
- [ ] Backend server is running on port 5000
- [ ] Frontend dev server is running on port 5173
- [ ] No console errors in terminal
- [ ] Browser is open to http://localhost:5173

## Authentication Tests

### Registration
- [ ] Navigate to registration page
- [ ] Try registering without filling fields (should show validation)
- [ ] Try password less than 6 characters (should show error)
- [ ] Try mismatched passwords (should show error)
- [ ] Register with valid data (name, email, password)
- [ ] Should auto-login and redirect to chat page
- [ ] Avatar should be generated automatically
- [ ] Try registering same email again (should show error)

### Login
- [ ] Logout from current session
- [ ] Navigate to login page
- [ ] Try logging in with wrong email (should show error)
- [ ] Try logging in with wrong password (should show error)
- [ ] Login with correct credentials
- [ ] Should redirect to chat page
- [ ] User info should display in navbar

### Protected Routes
- [ ] Logout
- [ ] Try accessing /chat directly (should redirect to login)
- [ ] Login again
- [ ] Should be able to access /chat

### Logout
- [ ] Click logout button
- [ ] Should redirect to login page
- [ ] Should clear user data
- [ ] Trying to access /chat should redirect to login

## Chat Features Tests

### User Search
- [ ] Click "Search Users" button
- [ ] Modal should open
- [ ] Try searching without entering text (should show prompt)
- [ ] Search for a non-existent user (should show "No users found")
- [ ] Search for existing user by name
- [ ] Search for existing user by email
- [ ] Results should display with avatar and email
- [ ] Click on a user
- [ ] Should create/open chat and close modal

### Chat List
- [ ] Chat list should show all conversations
- [ ] Each chat should show user/group name
- [ ] Each chat should show avatar
- [ ] Latest message should be displayed (if any)
- [ ] Long messages should be truncated
- [ ] Clicking a chat should select it
- [ ] Selected chat should be highlighted
- [ ] Empty state should show if no chats

### Messaging
- [ ] Select a chat
- [ ] Chat header should show other user's name
- [ ] Message history should load
- [ ] Type a message in input field
- [ ] Click Send button
- [ ] Message should appear immediately
- [ ] Message should show your avatar
- [ ] Message should be blue (sent message)
- [ ] Message should show timestamp
- [ ] Try sending empty message (should not send)
- [ ] Send multiple messages
- [ ] Should auto-scroll to bottom

## Real-Time Features Tests

### Two-User Setup
- [ ] Keep first user logged in (Browser 1)
- [ ] Open incognito/private window (Browser 2)
- [ ] Register/login as second user
- [ ] In Browser 1, search for second user
- [ ] Start a chat

### Real-Time Messaging
- [ ] Send message from Browser 1
- [ ] Message should appear in Browser 2 instantly
- [ ] Send message from Browser 2
- [ ] Message should appear in Browser 1 instantly
- [ ] Messages should show correct sender
- [ ] Received messages should be white/gray
- [ ] Sent messages should be blue
- [ ] Timestamps should be correct

### Typing Indicators
- [ ] In Browser 1, start typing
- [ ] Browser 2 should show typing indicator (animated dots)
- [ ] Stop typing in Browser 1
- [ ] Typing indicator should disappear in Browser 2 after 3 seconds
- [ ] Repeat from Browser 2 to Browser 1

### Online/Offline Status
- [ ] Both users should be online
- [ ] Close Browser 2 or logout
- [ ] Browser 1 should detect user went offline
- [ ] Login again in Browser 2
- [ ] Browser 1 should detect user came online

### Latest Message Update
- [ ] Send a message in a chat
- [ ] Go back to chat list
- [ ] Latest message should be updated
- [ ] Chat should move to top of list

## UI/UX Tests

### Responsive Design
- [ ] Resize browser window to mobile size
- [ ] Layout should adapt
- [ ] Chat list should be accessible
- [ ] Messages should be readable
- [ ] Input should be usable
- [ ] Buttons should be clickable

### Navigation
- [ ] Click between different chats
- [ ] Each chat should load correctly
- [ ] Message history should be separate
- [ ] No messages should mix between chats

### Loading States
- [ ] Refresh page while logged in
- [ ] Should show loading state briefly
- [ ] Should restore user session
- [ ] Open a chat
- [ ] Should show "Loading messages..." briefly

### Empty States
- [ ] Create a new user with no chats
- [ ] Should show "No conversations yet" message
- [ ] Open a chat with no messages
- [ ] Should show "No messages yet" message
- [ ] Search for non-existent user
- [ ] Should show "No users found"

### Error Handling
- [ ] Stop backend server
- [ ] Try sending a message (should fail gracefully)
- [ ] Try searching users (should fail gracefully)
- [ ] Restart backend server
- [ ] Everything should work again

## Group Chat Tests (Optional)

### Create Group
- [ ] Use API or add UI to create group
- [ ] POST to /api/chats/group
- [ ] Body: { users: "[\"userId1\", \"userId2\"]", name: "Test Group" }
- [ ] Group should appear in chat list
- [ ] Group should have custom name
- [ ] Group should show all members

### Group Messaging
- [ ] Send message in group
- [ ] All members should receive message
- [ ] Messages should show sender name
- [ ] Typing indicator should work

## Performance Tests

### Message Loading
- [ ] Send 50+ messages in a chat
- [ ] Reload page
- [ ] Messages should load quickly
- [ ] Should auto-scroll to bottom
- [ ] No lag in UI

### Multiple Chats
- [ ] Create 10+ chats
- [ ] Switch between them
- [ ] Each should load correctly
- [ ] No memory leaks
- [ ] Smooth transitions

### Socket Performance
- [ ] Send messages rapidly
- [ ] All should be delivered
- [ ] No messages lost
- [ ] Correct order maintained

## Security Tests

### Authentication
- [ ] Try accessing API without token (should fail)
- [ ] Try accessing with invalid token (should fail)
- [ ] Token should expire after 30 days
- [ ] Password should be hashed in database

### Authorization
- [ ] Try accessing other user's chats (should fail)
- [ ] Try sending messages to chats you're not in (should fail)
- [ ] Try viewing messages from chats you're not in (should fail)

## Browser Compatibility

Test in multiple browsers:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if on Mac)
- [ ] Mobile browsers

## Database Tests

### Data Persistence
- [ ] Send messages
- [ ] Stop and restart backend
- [ ] Messages should still be there
- [ ] Chats should still exist
- [ ] User data should be intact

### Data Integrity
- [ ] Check MongoDB for user documents
- [ ] Passwords should be hashed
- [ ] Check chat documents
- [ ] Users array should be populated
- [ ] Check message documents
- [ ] Sender and chat refs should be correct

## Edge Cases

### Network Issues
- [ ] Disconnect internet
- [ ] Try sending message
- [ ] Reconnect internet
- [ ] Should reconnect automatically

### Long Messages
- [ ] Send a very long message (1000+ characters)
- [ ] Should display correctly
- [ ] Should not break layout

### Special Characters
- [ ] Send message with emojis: 😀 🎉 ❤️
- [ ] Send message with special chars: @#$%^&*()
- [ ] Send message with HTML: <script>alert('test')</script>
- [ ] All should display safely

### Rapid Actions
- [ ] Click send button rapidly
- [ ] Should not send duplicate messages
- [ ] Switch chats rapidly
- [ ] Should not cause errors

### Multiple Tabs
- [ ] Open app in two tabs with same user
- [ ] Send message from one tab
- [ ] Should appear in both tabs

## Final Verification

- [ ] No console errors in browser
- [ ] No errors in backend terminal
- [ ] No errors in frontend terminal
- [ ] All features working as expected
- [ ] UI is responsive and smooth
- [ ] Real-time features working
- [ ] Data persisting correctly

## Test Results

Date: _______________
Tester: _______________

Total Tests: _____
Passed: _____
Failed: _____

Issues Found:
1. _______________________________________________
2. _______________________________________________
3. _______________________________________________

Notes:
_________________________________________________
_________________________________________________
_________________________________________________

## Success Criteria

✅ All authentication flows work
✅ Messages send and receive in real-time
✅ Typing indicators work
✅ User search works
✅ Chat list updates correctly
✅ UI is responsive
✅ No critical errors
✅ Data persists across restarts

If all criteria are met, the application is ready to use! 🎉
