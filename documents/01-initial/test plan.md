
Android internal distribution build  2.15.5 (1)

continue stage 2 tesing @STAGE_2_MANUAL_TESTING_SCENARIOS.md 
My Suggested Test Plan
Phase 1: Critical (30 min)
1. E3 - Game Reopens ⭐⭐⭐ (THE FIX)
2. E1 - Game Closes
3. E4 - Request Never Closes     +++++++++++++++++++
 4. G2 - Player Rejects Consent
Phase 2: Sanity Checks (15 min)
5. C1 - Approve Player (no consent)
6. D1 - Calendar + Approve (consent logic)
Done! ✅
////
 Testing Phase 1: GameEdit Checkbox Colors (CRITICAL BUG FIX)
Test 1.1: Region Selection   ++++++++++++
Steps:
Navigate to Dashboard
Click "New Game" or edit existing game
Go to "Location" tab
Expand "Center" region
Click region checkbox (not individual clubs)
Expected:
✅ Region checkbox turns GREEN
✅ All clubs in region are checked (GREEN)
✅ Log: Region selected, all locations in region added
Test 1.2: Partial Deselection (THE BUG FIX)
Steps:
From Test 1.1, with all clubs selected (GREEN)
Deselect ONE club (e.g., "Dekel")
Check region checkbox color
Expected:
✅ Region checkbox turns BLUE (indeterminate) ← THIS WAS BROKEN BEFORE
✅ NOT green anymore
✅ Minus icon (−) shown in checkbox
✅ Log: Location deselected
Test 1.3: Full Deselection
Steps:
Continue from Test 1.2
Deselect all remaining clubs in region
Expected:
✅ Region checkbox turns WHITE (empty)
✅ No checkmark or minus icon
✅ All clubs unchecked
Test 1.4: Individual Club Selection
Steps:
Start with all clubs deselected
Select individual clubs one by one (e.g., TAU, then Kfar Maccabia)
Check region checkbox after each selection
Expected:
✅ After 1st club: Region checkbox BLUE (some selected)
✅ After 2nd club: Region checkbox BLUE (some selected)
✅ After all clubs: Region checkbox GREEN (all selected)
Testing Phase 2: Advanced Filters Checkbox Colors
Test 2.1: Same as Phase 1
Repeat all tests from Phase 1 in Advanced Filters:
Dashboard → "More Filters" button
Switch to "Location" tab
Run Tests 1.1-1.4
Expected:
✅ Same behavior as GameEdit
✅ Consistent checkbox colors
Test 2.2: Map View Selection
Steps:
In Advanced Filters → Location tab
Toggle to Map view (map icon)
Click various club pins
Switch back to List view
Expected:
✅ Checkbox states match map selections
✅ Region checkboxes show correct colors (GREEN/BLUE/WHITE)
✅ Selections persist between views
Testing Phase 3: Filter Persistence (IDs vs Names)
Test 3.1: Create Filter and Check Logs
Steps:
Advanced Filters → Location tab
Select clubs: "Dekel", "TAU", "Kfar Maccabia"
Click "Apply"
Check logs
Expected Logs:
LOG [INFO] LocationFilter: Club toggled  club: "Dekel"          ← NAME (not ID)  checked: true  LOG [INFO] 🔍 Filtering games:  locations: "3 clubs"   ← COUNT (not IDs)
✅ Logs show NAMES, not IDs like "abc-123-def"
Test 3.2: Save and Reload Filter
Steps:
Apply filter from Test 3.1
Force close app (swipe away)
Reopen app
Check Dashboard active filters
Expected:
✅ "Locations 3" chip shown
✅ Games filtered correctly
✅ Log: Loaded saved filter from storage
Test 3.3: Developer Options - View Saved Filter
Steps:
Navigate to Profile
Scroll down
Click "Developer Options" button
Read "Saved Filter" JSON
Expected:
{  "location": {    "region": [],    "clubs": [      "Dekel (abc12345)",    ← NAME + partial ID      "TAU (def67890)",      "Kfar Maccabia (ghi11121)"    ]  }}
✅ Club names shown (not raw IDs)
Testing Phase 4: Migration (OLD Data → NEW Format)
⚠️ CRITICAL: Test Backward Compatibility
Test 4.1: Simulate Old Filter (Manual)
Steps:
Go to Dev Options
Clear saved filter
Use AsyncStorage debugger (Reactotron/Flipper) to manually inject old format:
{  "location": {    "region": [],    "club": ["Dekel", "TAU", "Kfar Maccabia"]  ← NAMES (old format)  }}
Restart app
Open Dashboard
Expected:
✅ Log: Migrated filter from names to IDs
✅ Games still filtered correctly
✅ Clubs still selected in Advanced Filters
Test 4.2: Edge Case - Mixed Format
Inject:
{  "location": {    "club": ["Dekel", "abc-123-def-456"]  ← Mix of NAME and ID  }}
Expected:
✅ Migration detects first item is name (no dash)
✅ Converts all names to IDs
✅ Leaves IDs unchanged
✅ No errors
Test 4.3: Edge Case - Unknown Club Names
Inject:
{  "location": {    "club": ["NonExistentClub", "DeletedClub"]  }}
Expected:
✅ Log: Migrated filter from names to IDs with count mismatch
✅ Unknown clubs ignored (filtered out)
✅ No crash
✅ Empty filter if all clubs unknown
Testing Phase 5: GameEdit Save/Load
Test 5.1: Create New Game
Steps:
Dashboard → "New Game"
Location tab → Select "Center" region (all clubs)
Fill other tabs (calendar, players)
Click "Create"
Expected:
✅ Game created successfully
✅ Database stores club IDs (check Supabase dashboard)
✅ Game appears on Dashboard with correct location
Test 5.2: Edit Existing Game
Steps:
Click on game from Test 5.1
Edit → Location tab
Verify checkboxes show correct state
Deselect one club
Save changes
Expected:
✅ Checkboxes load correctly (GREEN → BLUE after deselect)
✅ Changes saved
✅ "1 Pending Change" banner updates correctly
Testing Phase 6: Edge Cases & Stress Tests
Test 6.1: No Locations Available
Steps:
Advanced Filters → Set current location to ocean/desert
Set proximity to 1 km
Check Location tab
Expected:
✅ "No Clubs Found" message
✅ No crashes
✅ Can change location
Test 6.2: Select All Clubs Individually
Steps:
GameEdit → Location tab
Manually select all 20+ clubs one by one
Check performance
Expected:
✅ No lag
✅ Each selection logs correctly
✅ Region checkboxes update correctly
Test 6.3: Rapid Toggle
Steps:
Quickly tap region checkbox 10 times (toggle on/off)
Expected:
✅ No crashes
✅ Final state is correct (matches checkbox color)
✅ No race conditions
Testing Phase 7: Regression Testing
Test 7.1: Game Filtering Still Works
Steps:
Dashboard
Apply location filter (3 clubs)
Apply rating filter (2.5-3.5)
Apply date filter (next 7 days)
Expected:
✅ All filters work together
✅ Games list updates correctly
✅ "Show active filters" displays correct counts

Test 7.1.1: filter saved and presented
Goto filters and set Ratings (e.g., "3 - 4.3")
click apply 
Go to Account → Developer Options
Click "View Complete Saved Filter"
Now displays:
📍 Location (clubs, regions, distance, address)
⭐ Ratings ( 3 - 4.3)
📅 Dates (start/end)
🎾 Game Types

Test 7.1.2:  saved filter restored
Reload app
Goto filters 
Validate that Ratings   3 - 4.3

Test 7.2: Onboarding Flow
Steps:
Logout
Login with new account (or existing incomplete profile)
Complete profile
Set current location
Go to Advanced Filters
Expected:
✅ Location required message shows
✅ Can set location
✅ Filter saves correctly
✅ Dashboard shows games
Test 7.3: Push Notifications
Steps:
Have another user invite you to game
Receive notification
Tap notification
Expected:
✅ Opens correct game
✅ Location info displays correctly
Testing Phase 8: Cross-Platform Consistency
Test 8.1: Android vs iOS
Run all Phase 1-2 tests on BOTH platforms
Expected:
✅ Same checkbox colors
✅ Same behavior
✅ No platform-specific bugs
Test 8.2: Different Screen Sizes
Test on:
Small phone (iPhone SE)
Large phone (iPhone 15 Pro Max)
Tablet (if applicable)
Expected:
✅ UI scales correctly
✅ No text cutoff
✅ Buttons accessible
Testing Phase 9: Performance & Memory
Test 9.1: Memory Leaks
Steps:
Open/close Advanced Filters 20 times
Toggle between tabs 50 times
Check memory usage (dev tools)
Expected:
✅ Memory stays stable
✅ No memory spikes
Test 9.2: Offline Behavior
Steps:
Turn off WiFi/data
Try to use filters
Turn back on
Expected:
✅ Cached data works
✅ No crashes
✅ Graceful error messages
Sign-Off Criteria
✅ PASS if:
All checkbox colors consistent (GREEN/BLUE/WHITE)
No crashes in any test
Logs show club names (not IDs)
Migration works for old filters
Saved filters persist correctly
No performance regression
❌ FAIL if:
Checkbox colors still inconsistent
Any crash occurs
Data loss during migration
Filter doesn't persist
IDs shown in logs instead of names
Execution Strategy
Recommended Order:
Phase 1 (30 min) - Critical bug fix validation
Phase 3 (15 min) - Verify logging changes
Phase 4 (20 min) - Migration testing
Phase 2 (20 min) - Advanced filters
Phase 5 (15 min) - GameEdit save/load
Phase 7 (20 min) - Regression
Phases 6, 8, 9 (30 min) - Edge cases
Total: ~2.5 hours for comprehensive testing
Bug Reporting Template
If you find issues:
## Bug Report**Phase:** [e.g., Phase 1.2]**Platform:** [Android/iOS]**Steps to Reproduce:**1. ...2. ...**Expected:** ...**Actual:** ...**Logs:**
[paste relevant logs]
**Screenshots:**[attach if relevant]
Quick Smoke Test (15 minutes)
If time is limited, run this minimal test:
✅ GameEdit → Select region → Deselect 1 club → Verify checkbox turns BLUE
✅ Advanced Filters → Same test
✅ Apply filter → Force close app → Reopen → Verify filter persisted
✅ Dev Options → View saved filter → Verify shows names
✅ Check logs → Verify show names (not IDs)
If all 5 pass → Ship it ✅
Ready to test! Let me know which phase you'd like to start with or if you need any clarifications.



/////////// 
 

Test Case 1: No Duplicate Logs     TESTED OK
Goal: Verify logs appear only once, not 5-10 times
Steps:
Open app, login
Navigate to Games list
Open Game #11
Watch console logs
Navigate to Game #18
Watch console logs
Navigate to Game #7
Watch console logs
Expected:
✅ "Game loaded successfully" appears 1x per game (not 5-10x)
✅ "GameEdit: No saved proximity filter" appears 1x per game (not 9x)
✅ "useLocations: Found cached locations" appears 1x per game (not 10x)
Why It Works:
Only ONE GameEdit screen mounted at a time (router.replace unmounts previous)
Only ONE unified useEffect (not 3 competing effects)

Test Case 2: Screen Unmounting   TESTED OK
Goal: Verify old GameEdit screens are unmounted
Steps:
Open Game #11
Note the game data in console
Navigate to Game #18
Check console - should NOT see Game #11 logs anymore
Navigate to Game #7
Check console - should NOT see Game #11 or #18 logs
Expected:
✅ Only the CURRENT game logs appear
✅ No background game screens logging
Why It Works:
router.replace() unmounts previous GameEdit screen

Test Case 3: Real-Time Player Updates    TESTED OK
Goal: Verify player changes from other users are detected
Steps:
User A opens Game #11
User B joins Game #11 from another device/browser
User A should see player count update automatically
User A edits date (don't Apply yet)
User C joins Game #11 from another device
User A presses Apply
Should see alert: "Players joined: UserC"
Expected:
✅ Player list updates in real-time (without Apply)
✅ External changes detected before Apply
✅ User warned with player names
Why It Works:
Unified useEffect tracks player changes from GameDataManager
handleApply compares expected vs actual player state

Test Case 4: Form Fields Not Overwritten
Goal: Verify user's edits aren't lost when players change
Steps:
Open Game #11
Change date from Jan 2 → Jan 5 (don't Apply)
From another device, have someone join the game
Back to first device, verify:
Date still shows Jan 5 (not reverted)
Player list updated to show new player
Expected:
✅ Date field still shows Jan 5 (user's edit preserved)
✅ Player list shows new player (updated from GameDataManager)
Why It Works:
useEffect only updates game reference, not form fields
Form fields (date, location, etc.) are independent state

Test Case 5: External Change Detection - Add Player
Goal: Test conflict detection when someone joins
Steps:
User A opens Game #11 (3 players)
User A stages: Approve Bob
User B joins Game #11 (now 4 players)
User A presses Apply
Should see alert: "Players joined: UserB"
Expected:
✅ Alert shows specific player name (UserB)
✅ Options: Cancel | Refresh & Review | Apply Anyway
✅ If "Refresh & Review": Game updates, Bob still needs approval
✅ If "Apply Anyway": Bob approved, UserB stays pending

Test Case 6: External Change Detection - Remove Player
Goal: Test conflict detection when someone leaves
Steps:
User A opens Game #11 (4 players: Alice, Bob, Charlie, David)
User A stages: Approve Bob
David leaves the game from another device
User A presses Apply
Should see alert: "Players left: David"
Expected:
✅ Alert shows specific player name (David)
✅ If "Apply Anyway": Bob approved, David already gone

Test Case 7: No External Changes
Goal: Verify Apply works normally when no conflicts
Steps:
Open Game #11
Stage: Approve Bob
Wait 5 seconds (no other changes)
Press Apply
Should proceed without alert
Expected:
✅ No alert shown
✅ Bob approved immediately
✅ Navigate back to games list
Why It Works:
External change detection finds no differences
Proceeds directly to apply logic

Test Case 8: Multiple Screen Navigation      TESTED OK
Goal: Verify memory management with multiple navigations
Steps:
Open Game #11    
Open Game #18 (should unmount #11)
Open Game #7 (should unmount #18)
Open Game #12 (should unmount #7)
Check console logs
Expected:
✅ Only Game #12 logs appear
✅ No logs from #11, #18, #7
✅ Memory usage stable (not growing)

Test Case 9: Background/Foreground
Goal: Verify screen stays mounted when app backgrounds
Steps:
Open Game #11
Press home button (app goes to background)
Wait 10 seconds
Return to app (app comes to foreground)
Verify Game #11 still visible
Expected:
✅ Game #11 still mounted (not unmounted)
✅ Data refreshes when returning
✅ Form edits preserved (if any were made)
Why It Works:
router.replace() only unmounts on NAVIGATION, not background

Test Case 10: Baseline Storage Message
Goal: Verify new log message is clear
Steps:
Open any game
Watch console logs
Look for baseline storage message
Expected:
✅ Log says: "Stored baseline for change detection (Apply button)"
✅ Message appears only once per game load
Quick Smoke Test Checklist
After implementation, run through this quickly:
[ ] Open 3 different games in sequence → No duplicate logs
[ ] Edit date in game, have someone join → Date preserved, player added
[ ] Stage approval, have someone join, press Apply → Alert shown
[ ] Stage approval, no external changes, press Apply → No alert, works
[ ] Check console for log message: "Stored baseline for change detection"
Ready to p




///

2. How to test
Manual device tests (most important)
These require a real device / Expo Go / dev build because deep links don't work in simulators without extra setup:
Scenario	How to trigger	Expected result after fix
2.1 Expired OTP link (the bug)	  +++
	Send yourself a forgot-password email, wait for it to expire (>1 hr), then tap the link	Lands on sign-in screen with no crash
2.2 Valid forgot-password link	 +++
	Send yourself a reset email, tap it immediately	Lands on reset-password screen (existing behaviour, must not regress)
2.3 Valid signup confirmation link	???
	Register a new account, tap the confirmation email	Logs in and runs the normal onboarding flow (must not regress)
2.4 access_denied with double-encoding
	Use a URL tool or adb/iOS simulator to fire: padelup://%2523error=access_denied%26error_code=otp_expired
	Lands on sign-in, no crash
	To manually fire a deep link on device without an email client:
2.5  manually fire a deep link on device without an email client
	# Fires a fake deep link into the Android emulator/device
	adb shell am start -W -a android.intent.action.VIEW -d "padelup://..."
	Watch the app — before the fix you get "Unmatched Route", after the fix you should land on the sign-in screen.




also i want to be sure that any other link for supabse will not break something 
here is tyhe list of mails 
1) Confirm sign up - Ask users to confirm their email address after signing up
2) Invite user - Invite users who don't yet have an account to sign up
3) Magic link - Allow users to sign in via a one-time link sent to their email
4) Change email address - Ask users to verify their new email address after changing it
5) Reset password - Allow users to reset their password if they forget it
6) Reauthentication - Ask users to re-authenticate before performing a sensitive action

 
///////////
# Manual Test Plan — §1.3 Onboarding Refactor

## Prerequisites

- Local Supabase running (`MyScripts/Supabase/supabase-local-start.bat`)
- Expo dev server running
- Test email account available (e.g. `testuser@example.com`)
- After each test: **delete the test user** from `auth.users` and `players` tables to reset state

---

## §1.3.1 — Profile Step Eliminated

### TC-1.3.1-A: Email sign-up — no profile screen shown  +++++++++passed+++++++
	
| **Precondition** |
	User does not exist |
| **Steps** | 
1. Open app → tap **Sign Up** <br>
2. Enter email `test1@example.com`, password, confirm → tap **Sign Up** <br>
3. Check email → tap confirmation link |
| **Expected** | App opens directly on the **location picker screen** — no profile screen (name/phone fields) ever appears |
| **Verify in DB** | `players` row exists with `name = 'test1'` (first 7 chars before @), `phone = ''`, `rating = 2.5` |

### TC-1.3.1-B: Google sign-up — no profile screen shown +++++++++passed+++++++

| **Precondition** | Google account not previously signed up on Padel Up |
| **Steps** | 
1. Open app → tap **Sign Up** → tap **Continue with Google** <br>
2. Complete Google OAuth |
| **Expected** | 
App opens directly on the **location picker screen** — no profile screen |
| **Verify in DB** | 
`players` row exists with `name` = Google display name, `phone = ''`, `rating = 2.5` |

### TC-1.3.1-C: Default name truncated to 7 chars   +++++++++passed+++++++


| **Precondition** | User does not exist |
| **Steps** | Sign up with email `verylongemail@example.com` |
| **Expected** | `players.name = 'verylo'` (exactly 7 chars before @) |



## §1.3.2 — Location Step Behaviour

### TC-1.3.2-A: Default proximity is 30 km   +++++++++passed+++++++

| **Precondition** | New user, just past TC-1.3.1 — location picker is open |
| **Expected** | Proximity slider/value shows **30 km** without any user interaction |

### TC-1.3.2-B: Map centered on GPS (when available)  +++++++++passed+++++++

| **Precondition** | Device/emulator has GPS or mock location enabled |
| **Expected** | Map pin is near the device's current location, not Tel Aviv |

### TC-1.3.2-C: Map falls back to Tel Aviv when GPS unavailable +++++++++passed+++++++

| **Precondition** | GPS permission denied or emulator with no mock location |
| **Expected** | Map centered on Tel Aviv (32.0853, 34.7818) |

### TC-1.3.2-D: Descriptive text visible   +++++++++passed+++++++

| **Steps** | Observe the location picker screen during onboarding |
| **Expected** | Instructional text visible explaining: set location, set proximity, press "Use Location" — app will find clubs |

### TC-1.3.2-E: "Use Location" with no clubs found — popup shown +++++++++passed+++++++

| **Steps** | 
1. Move map to a remote area (ocean / uninhabited region) <br>
2. Set proximity to 5 km <br>
3. Tap **Use Location** |
| **Expected** |
 Alert popup: **"No Clubs Found"** with explanation to try a different area or increase distance <br>Modal stays open — user can adjust and try again |
| **NOT expected** |
 Button silently grayed out and unresponsive |

### TC-1.3.2-F: "Use Location" with clubs found — accepted  +++++++++passed+++++++

|---|---|
| **Steps** |
1. Set map to Tel Aviv area, 30 km proximity <br>
2. Confirm club count is shown (e.g. "Found 5 locations") <br>
3. Tap **Use Location** |
| **Expected** | Modal closes immediately |

---

## §1.3.3 — Filter Step Eliminated

### TC-1.3.3-A: Goes directly to Games — no filter screen +++++++++passed+++++++

| **Precondition** | 
TC-1.3.2-F just completed |
| **Expected** | 
App navigates straight to **Games screen** — the global filter / club selection screen is **never shown** |

### TC-1.3.3-B: All discovered clubs auto-selected in filter +++++++++passed+++++++

| **Precondition** | 
After TC-1.3.3-A |
| **Steps** |
 Open **Filter** → go to **Location tab** |
| **Expected** | 
All clubs within the selected radius are **checked/selected** — user did not select them manually |

### TC-1.3.3-C: Onboarding flags cleared +++++++++passed+++++++

| **Precondition** | 
After TC-1.3.3-A |
| **Steps** |
 Navigate around the app (games load, filter works, tab bar active) |
| **Expected** | 
No configuration-in-progress overlay. Games load normally. `isConfigurationInProgress = false`, `isCurrentLocationSet = true` |

### TC-1.3.3-D: Filter persisted across restart +++++++++passed+++++++

| **Steps** | 
1. Complete onboarding (TC-1.3.3-A) <br>
2. Kill and reopen the app <br>
3. Sign in (skip onboarding) |  - not executed
| **Expected** | 
Games screen loads immediately with the saved location filter — location picker does **not** open again |

---

## §1.3 Regression — Existing User (Sign-In)

### TC-REG-A: Returning user skips all onboarding ++++++passed+++++

| **Precondition** | User has previously completed onboarding (has `players` row + saved filter) |
| **Steps** | Sign out → sign back in |
| **Expected** | Goes straight to Games screen. No profile screen, no location picker |

### TC-REG-B: Returning user with no saved filter re-triggers location step only ++++++passed+++++

| **Precondition** | 
User has `players` row but **no saved filter** in storage (clear AsyncStorage for the user) |
| **Steps** |
 Sign in |
| **Expected** |
 Location picker opens (§1.3.2 flow).
 After "Use Location" → Games screen.
 Profile screen never shown |

### TC-REG-C: Google sign-in with no account — blocked ++++++passed+++++

| **Precondition** | 
Email has never been signed up on Padel Up |
| **Steps** | 
Sign-in screen → tap **Sign in with Google** → complete Google OAuth |
| **Expected** | 
	Alert: **"No Account Found"** with instruction to use Sign Up screen. 
	App stays on sign-in screen.
	No onboarding triggered 
	no new  records in players and auth.users |


## §1.3 Resumption — Interrupted Onboarding

### TC-RES-A: Logged out during location picker — resumes at location step on next login ++++++passed+++++

| **Precondition** | Fresh account (no saved filter) |
| **Steps** | 
1. Sign up → profile auto-created, location picker opens <br>
2. Tap **Logout** inside the location picker <br>
3. Sign back in with the same credentials |
| **Expected** | 
Location picker opens again — user resumes at the location step. Profile screen **not** shown (players row already exists). 
Games screen **not** shown (no filter yet) |
| **Verify in DB** |
 `players` row still exists from first login |

### TC-RES-B: App killed during onboarding — resumes at location step ++++++passed+++++

| **Precondition** | Fresh account — location picker is open |
| **Steps** | 
1. Sign up → location picker opens <br>
2. Force-kill the app without tapping anything <br>
3. Reopen the app |
| **Expected** | 
App re-authenticates the existing session → location picker opens automatically. No profile screen |

### TC-RES-C: Multiple interrupted attempts — no duplicate rows ++++++passed+++++

| **Precondition** | TC-RES-A done once already |
| **Steps** | Repeat TC-RES-A a second time (log out from location picker again, sign back in) |
| **Expected** | Same result — location picker opens. No duplicate `players` rows created |
| **Verify in DB** | Exactly **one** `players` row for this `user_id` |


## §1.3 Resumption — Filter Deleted from Storage

### TC-RES-D: Filter cleared from AsyncStorage — location step re-opens on next login ++++++passed+++++

| **Precondition** | 
User has **completed** onboarding (players row + saved filter) |
| **Steps** | 
1. Sign in normally — reaches Games screen <br>
2. Clear the filter from AsyncStorage (via dev menu, adb shell, or temporary "Clear filter" debug button) <br>
3. Sign out → sign back in |
| **Expected** | 
Location picker opens (no saved proximity found).
 After "Use Location" → Games screen loads with clubs auto-selected. 
Profile screen **not** shown |
| **Verify** |
 Filter is saved again after completing the location step |

### TC-RES-E: Filter cleared but players row intact — name and rating preserved ++++++passed+++++

| **Precondition** | TC-RES-D completed |
| **Steps** | After landing on Games screen, open **Profile** |
| **Expected** | Name and rating from original sign-up are unchanged — only the location filter was re-created |

### TC-RES-F: Partial filter (proximity present, clubs empty) — does not re-open location picker ++++++passed+++++

| **Precondition** | TC-RES-E completed
| **Steps** |
1. sign-in 
2. remove `location.club` array from AsyncStorage but keep `proximity` 
  "C:\work\workspace\padel-matching-app1\MyScripts\Adnroid-emulator\clear-filter-clubs.bat"
   The script reads the saved filter from AsyncStorage, zeros out `location.club` and `location.region`, and writes them back while keeping `proximity` intact. Confirm output shows "Clubs after: 0  (proximity kept: true)"
 3.  sign back in |
| **Expected** | 
App loads Games screen directly (proximity exists → `isCurrentLocationSet = true`). Location picker does **not** re-open |
| **Note** |
Validates that the resumption check is based on `savedFilter.proximity` presence, not club count |

