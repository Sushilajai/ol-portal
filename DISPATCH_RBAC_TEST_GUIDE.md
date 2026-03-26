# DISPATCH MODULE - RBAC TEST GUIDE

**Quick Reference for Testing Role-Based Access Control**

---

## TEST CREDENTIALS

### DispatchClerk (Operational Access)
- **Email:** dispatch@ol.gov.in
- **Password:** dispatch123
- **Expected View:** DispatchClerkView (Modal-based operational interface)

### SuperAdmin (Audit Access)
- **Email:** superadmin@ol.gov.in
- **Password:** super123
- **Expected View:** SuperAdminDispatchView (Read-only audit dashboard)

### ExecutiveViewer (Audit Access)
- **Email:** executive@ol.gov.in
- **Password:** exec123
- **Expected View:** SuperAdminDispatchView (Read-only audit dashboard)

### OfficerViewer (Denied Access)
- **Email:** officer@ol.gov.in
- **Password:** officer123
- **Expected View:** Access Denied message

### AccountsAdmin (Denied Access)
- **Email:** accounts@ol.gov.in
- **Password:** accounts123
- **Expected View:** Access Denied message

### TD_Admin (Denied Access)
- **Email:** td@ol.gov.in
- **Password:** td123
- **Expected View:** Access Denied message

---

## DISPATCH CLERK TEST CASES

### Test 1: Login and View Clerk Interface
1. Login with dispatch@ol.gov.in / dispatch123
2. Navigate to /dispatch
3. **Expected:** DispatchClerkView renders with:
   - Purple gradient header with Truck icon
   - 3 metric cards (Total, Pending, Delivered)
   - Compact search & filter row
   - View toggle (All Records | Pending Updates)
   - "+ New Dispatch" button (blue)
   - Data table with dispatch records

### Test 2: Create Dispatch Record
1. Click "+ New Dispatch" button
2. **Expected:** Modal opens with:
   - Title: "Create Dispatch"
   - Close button (X)
   - 7 form fields
3. Fill in form:
   - Recipient Name: "John Doe"
   - Company Name: Select from autocomplete
   - Document Category: Select "Sec 1"
   - **Expected:** UID auto-generates (e.g., "2526 / 0001 / 01")
   - Address: "123 Main St, City"
   - AWB: "AWB123456"
   - Delivery Note Required: Check
4. Click "Create"
5. **Expected:**
   - Modal closes
   - Success toast appears: "✓ Operation completed successfully"
   - New record appears in table
   - Metrics update

### Test 3: View All Records
1. Click "All Records" toggle
2. **Expected:**
   - Table shows all dispatch records
   - Columns: UID, Company, Recipient, Category, Dispatch Date, AWB, Status
   - Status filter dropdown in header
   - No action column

### Test 4: View Pending Updates
1. Click "Pending Updates" toggle
2. **Expected:**
   - Table shows only "In Transit" records with deliveryNoteRequired = true
   - Additional "Actions" column visible
   - Each row has: Status dropdown, Date picker, Save button

### Test 5: Update Delivery Status
1. In "Pending Updates" view
2. Select status from dropdown: "Delivered"
3. Pick delivery date from date picker
4. Click "Save"
5. **Expected:**
   - Success toast appears
   - Record updates in real-time
   - Record removed from Pending Updates view
   - Delivery Confirmation metric increases

### Test 6: Search and Filter
1. Type in search box: "ABC" (company name)
2. **Expected:** Table filters to show only matching records
3. Select date filter: "2026-03-20"
4. **Expected:** Table filters to show records from that date onwards
5. Select status filter: "Pending"
6. **Expected:** Table filters to show only Pending records

### Test 7: Verify No SuperAdmin Features
1. Look for advanced filter bar
2. **Expected:** NOT visible
3. Look for read-only audit table
4. **Expected:** NOT visible
5. Look for "+ New Dispatch" button
6. **Expected:** VISIBLE (clerk can create)

---

## SUPER ADMIN TEST CASES

### Test 1: Login and View Audit Dashboard
1. Login with superadmin@ol.gov.in / super123
2. Navigate to /dispatch
3. **Expected:** SuperAdminDispatchView renders with:
   - Dark gradient header (slate-900 to slate-800)
   - Title: "Dispatch Audit Dashboard"
   - Advanced Filter Bar with 5 filters
   - Master Data Table (read-only)
   - Results counter

### Test 2: Advanced Filter Bar
1. **Expected:** 5 filter inputs visible:
   - UID / Company search (with search icon)
   - DOD From (date picker)
   - DOD To (date picker)
   - AWB Number search
   - Status dropdown (All, Pending, In Transit, Delivered)

### Test 3: Global Search (UID / Company)
1. Type in search box: "ABC"
2. **Expected:** Table filters to show only matching UID or Company names
3. Clear search
4. **Expected:** Table shows all records again

### Test 4: Date Range Filtering
1. Select DOD From: "2026-03-15"
2. **Expected:** Table shows records from that date onwards
3. Select DOD To: "2026-03-25"
4. **Expected:** Table shows records between those dates
5. Clear both dates
6. **Expected:** Table shows all records

### Test 5: AWB Search
1. Type in AWB search: "AWB123"
2. **Expected:** Table filters to show only matching AWB numbers
3. Clear search
4. **Expected:** Table shows all records

### Test 6: Status Filter
1. Select Status: "Delivered"
2. **Expected:** Table shows only Delivered records
3. Select Status: "Pending"
4. **Expected:** Table shows only Pending records
5. Select Status: "All"
6. **Expected:** Table shows all records

### Test 7: Results Counter
1. Apply filters
2. **Expected:** Counter shows: "Showing X of Y records"
3. Change filters
4. **Expected:** Counter updates in real-time

### Test 8: Master Data Table
1. **Expected:** 8 columns visible:
   - UID
   - Dispatch Date
   - Company Name
   - Recipient
   - Category
   - AWB
   - Status (color-coded badges)
   - Delivery Date
2. **Expected:** No action column
3. **Expected:** No "+ New Dispatch" button
4. **Expected:** Table is read-only (no inline editing)

### Test 9: Verify No Clerk Features
1. Look for "+ New Dispatch" button
2. **Expected:** NOT visible
3. Look for action column
4. **Expected:** NOT visible
5. Look for view toggle
6. **Expected:** NOT visible
7. Look for metric cards
8. **Expected:** NOT visible

---

## EXECUTIVE VIEWER TEST CASES

### Test 1: Login and Verify Same as SuperAdmin
1. Login with executive@ol.gov.in / exec123
2. Navigate to /dispatch
3. **Expected:** SuperAdminDispatchView renders (identical to SuperAdmin)
4. Verify all SuperAdmin features work

---

## DENIED ACCESS TEST CASES

### Test 1: OfficerViewer Access Denied
1. Login with officer@ol.gov.in / officer123
2. Navigate to /dispatch
3. **Expected:** Access Denied message displays:
   - Title: "Access Denied"
   - Message: "Your role does not have access to the Dispatch module."

### Test 2: AccountsAdmin Access Denied
1. Login with accounts@ol.gov.in / accounts123
2. Navigate to /dispatch
3. **Expected:** Access Denied message displays

### Test 3: TD_Admin Access Denied
1. Login with td@ol.gov.in / td123
2. Navigate to /dispatch
3. **Expected:** Access Denied message displays

---

## CROSS-ROLE TESTING

### Test 1: Switch Between Roles
1. Login as DispatchClerk
2. Verify DispatchClerkView renders
3. Logout
4. Login as SuperAdmin
5. Verify SuperAdminDispatchView renders
6. Logout
7. Login as ExecutiveViewer
8. Verify SuperAdminDispatchView renders
9. Logout
10. Login as OfficerViewer
11. Verify Access Denied message

### Test 2: Verify Data Consistency
1. Login as DispatchClerk
2. Create a new dispatch record
3. Logout
4. Login as SuperAdmin
5. Verify new record appears in audit table
6. Verify all details match

### Test 3: Verify No Data Modification by Auditors
1. Login as SuperAdmin
2. Try to click on table rows
3. **Expected:** No action column, no inline editing
4. Try to find "+ New Dispatch" button
5. **Expected:** Button not visible
6. Verify read-only interface

---

## PERFORMANCE TESTING

### Test 1: Page Load Time
1. Login as DispatchClerk
2. Navigate to /dispatch
3. **Expected:** Page loads in < 2 seconds
4. Logout
5. Login as SuperAdmin
6. Navigate to /dispatch
7. **Expected:** Page loads in < 2 seconds

### Test 2: Filter Performance
1. Login as SuperAdmin
2. Apply multiple filters simultaneously
3. **Expected:** Table updates in real-time (< 500ms)
4. Clear filters
5. **Expected:** Table updates immediately

### Test 3: Modal Performance
1. Login as DispatchClerk
2. Click "+ New Dispatch" button
3. **Expected:** Modal opens in < 500ms
4. Fill form and submit
5. **Expected:** Record created and modal closes in < 1 second

---

## BROWSER COMPATIBILITY TESTING

Test on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

**Expected:** All features work consistently across browsers

---

## RESPONSIVE DESIGN TESTING

### Desktop (≥1024px)
- ✅ All controls visible in single row
- ✅ Full table width
- ✅ Modal centered

### Tablet (768px - 1023px)
- ✅ Search row wraps to 2 lines
- ✅ Table scrolls horizontally
- ✅ Modal responsive width

### Mobile (<768px)
- ✅ Search row stacks vertically
- ✅ Table scrolls horizontally
- ✅ Modal full-width with padding
- ✅ Compact button sizes

---

## ACCESSIBILITY TESTING

- ✅ Keyboard navigation works
- ✅ Tab order is logical
- ✅ Focus indicators visible
- ✅ Color contrast sufficient
- ✅ Form labels present
- ✅ Error messages clear

---

## FINAL VERIFICATION CHECKLIST

### DispatchClerk
- ✅ Can create dispatch records
- ✅ Can view all records
- ✅ Can update delivery status
- ✅ Can search and filter
- ✅ Can toggle views
- ✅ Cannot access audit features

### SuperAdmin
- ✅ Can view all records
- ✅ Can use advanced filters
- ✅ Can search by UID/Company
- ✅ Can filter by date range
- ✅ Can filter by AWB
- ✅ Can filter by status
- ✅ Cannot create records
- ✅ Cannot modify records

### ExecutiveViewer
- ✅ Same as SuperAdmin

### Other Roles
- ✅ Access Denied message displays

### General
- ✅ No TypeScript errors
- ✅ No console errors
- ✅ No console warnings
- ✅ All tests passing
- ✅ Performance acceptable
- ✅ Responsive design works

---

**Test Status:** Ready for QA  
**Last Updated:** March 21, 2026  
**Version:** 1.0

