# OL-PORTAL - OFFICIAL LIQUIDATOR PORTAL
## Complete Flow Architecture & Functional Requirements Document

---

## 1. PROJECT OVERVIEW

### 1.1 System Purpose
The Official Liquidator Portal (OL-PORTAL) is a comprehensive document management and case tracking system designed for the Official Liquidator's office at the High Court, Bombay. The system manages companies under liquidation, document workflows, amalgamation cases, and establishment records.

### 1.2 Technology Stack
- **Frontend Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 8.0.0-beta
- **Routing**: React Router DOM 7.13.1
- **Styling**: Tailwind CSS 4.2.1 with PostCSS
- **Icons**: Lucide React 0.575.0
- **State Management**: React Context API
- **Authentication**: Local Storage based session management
- **Node Version**: 20.19+ or 22.12+

### 1.3 Deployment Configuration
- **Base Path**: `/ol-portal/`
- **Deployment Target**: GitHub Pages (gh-pages)
- **Build Output**: `dist/` directory

---

## 2. AUTHENTICATION & AUTHORIZATION SYSTEM

### 2.1 User Roles

The system supports two distinct user roles:

**Role 1: Admin**
- Email: `admin@senseware.net`
- Password: `admin123`
- Access Level: Full system access
- Dashboard Route: `/admin/dashboard`
- Features: Sidebar navigation, all CRUD operations, full reporting access

**Role 2: Officer**
- Email: `vinodvalmiki@mca.gov.in`
- Password: `vinod@1234`
- Access Level: Operational access
- Dashboard Route: `/officer/dashboard`
- Features: Header navigation only, document management, limited administrative functions

### 2.2 Authentication Flow

**Login Process:**
1. User lands on Login page (`/` route)
2. User enters email and password credentials
3. System validates credentials against hardcoded user database
4. On successful authentication:
   - User object created with `{ email, role }`
   - User data stored in `localStorage` with key `"user"`
   - User redirected to role-specific dashboard
   - AuthContext updates with user state
5. On failed authentication:
   - Error message displayed inline (no popup)
   - User remains on login page

**Session Management:**
- Session persisted in browser `localStorage`
- Session restored on page refresh from localStorage
- No expiration time implemented (manual logout required)

**Logout Process:**

1. User clicks logout button in header dropdown
2. User state cleared from AuthContext
3. localStorage cleared (key `"user"` removed)
4. User redirected to login page (`/`)

### 2.3 Route Protection

**Protected Route Implementation:**
- All application routes (except login) wrapped in `ProtectedRoute` component
- Protection checks:
  1. User authentication status (user object exists)
  2. User role authorization (role matches allowed roles)
- Unauthorized access redirects to login page (`/`)
- Allowed roles for protected routes: `["admin", "officer"]`

### 2.4 Authorization Rules

**Admin Role Permissions:**
- Access to sidebar navigation
- Full CRUD operations on all entities
- Access to all pages and features
- Dashboard statistics view
- Company management
- Document management
- Amalgamation case management
- Establishment records management
- Full reporting suite

**Officer Role Permissions:**
- Header navigation only (no sidebar)
- Document upload and management
- View dashboard statistics
- Access to operational pages
- Limited administrative functions
- Reporting access

---

## 3. APPLICATION ARCHITECTURE

### 3.1 Component Hierarchy


```
App (Root)
├── AuthProvider (Context Wrapper)
│   └── Routes
│       ├── Login (Public Route - /)
│       └── ProtectedRoute (Authenticated Routes)
│           └── MainLayout
│               ├── Header (Always visible)
│               ├── Sidebar (Admin only)
│               └── Outlet (Page Content)
│                   ├── Dashboard (/admin/dashboard)
│                   ├── OfficerDashboard (/officer/dashboard)
│                   ├── AddCompany (/company)
│                   ├── Document (/document)
│                   ├── Amalgamation (/amalgamation)
│                   ├── Establishment (/establishment)
│                   └── ReportingPage (/ReportingPage)
│                       ├── DailyReport
│                       ├── DailyAmalReport
│                       ├── DailyEstablishReport
│                       └── HindiDocReport
```

### 3.2 Routing Structure

**Public Routes:**
- `/` → Login Page

**Protected Routes (Admin & Officer):**
- `/admin/dashboard` → Admin Dashboard (Admin only)
- `/officer/dashboard` → Officer Dashboard (Officer only)
- `/company` → Company Management
- `/document` → Document Management
- `/amalgamation` → Amalgamation Cases
- `/establishment` → Establishment Records
- `/ReportingPage` → Reports Dashboard

**Fallback Route:**
- `*` → Redirects to `/` (Login)

### 3.3 Layout System

**MainLayout Component:**

- Fixed header at top
- Conditional sidebar (Admin only)
- Main content area with scroll
- Responsive design (mobile-first)

**Header Component:**
- Logo display (OL.jpg)
- Horizontal navigation menu with gradient buttons:
  - Dashboard (Blue gradient)
  - Doc Inward (Orange gradient)
  - Amalgamation (Teal gradient)
  - Establishment (Purple gradient)
  - Reports (Green gradient)
- Search bar
- Notification bell with badge count
- User profile dropdown with:
  - User initials avatar
  - Profile option
  - Logout option

**Sidebar Component (Admin Only):**
- Vertical navigation with icons
- Active state highlighting (gradient background)
- Navigation items:
  - Dashboard
  - Companies
  - Documents
  - Amalgamation
  - Establishment
  - Employees (placeholder)
  - ReportingPage
- Footer with copyright: "©Senseware Info Media Pvt Ltd."

---

## 4. FUNCTIONAL MODULES

### 4.1 DASHBOARD MODULE

**Purpose:** Display key metrics and recent activity for liquidation management

**Admin Dashboard (`/admin/dashboard`):**


**Statistics Cards (4 cards in grid):**

1. **Total Companies Under Liquidation**
   - Value: 248
   - Trend: Up 12% from last month
   - Icon: Building2 (Blue gradient)
   - Trend indicator: Green arrow up

2. **Total Documents Uploaded**
   - Value: 1,547
   - Trend: Up 18% from last week
   - Icon: FileText (Purple gradient)
   - Trend indicator: Green arrow up

3. **Pending Document Upload**
   - Value: 23
   - Trend: 3 new today
   - Icon: Clock (Orange gradient)
   - Trend indicator: Red arrow down

4. **Total Amalgamation Cases**
   - Value: 12
   - Trend: 2 processed this week
   - Icon: GitMerge (Emerald gradient)
   - Trend indicator: Neutral (gray)

**Recent Activity Section:**
- Display recent system activities
- Sample activities:
  - Document UID-3421 uploaded by Officer A
  - Case 2021/45 marked Completed by Officer B
  - Added 3 new companies by Officer C

**Officer Dashboard (`/officer/dashboard`):**
- Identical to Admin Dashboard
- Same statistics and recent activity
- No sidebar navigation (header only)

**UI Components:**
- StatCard: Reusable card with icon, value, subtitle, trend
- RecentActivity: Activity feed component
- Responsive grid layout (1 col mobile, 2 col tablet, 4 col desktop)

---

### 4.2 COMPANY MANAGEMENT MODULE (`/company`)

**Purpose:** Manage companies under liquidation with CRUD operations


**Layout:** Two-column layout (40% form / 60% table on desktop)

**Left Section - Add Company Form:**

**Form Fields:**
1. **Company Name** (Text Input)
   - Required field
   - Free text entry

2. **Company Petition No** (Text Input)
   - Required field
   - Format: CP-YYYY/NN (e.g., CP-2024/01)

3. **Select Liquidation Section** (Dropdown)
   - Options:
     - Section 34
     - Section 45
   - Required field

4. **Date of Winding Up** (Date Picker)
   - Required field
   - Date format: DD-MM-YYYY

**Form Actions:**
- Submit Button (Green) - Saves company data

**Right Section - Company List Table:**

**Table Columns:**
1. Company Name
2. Petition No
3. Section
4. Winding Date
5. Edit (Icon button - Pencil)
6. Delete (Icon button - Trash)

**Table Features:**
- Hover effect on rows
- Responsive overflow scroll
- Icon-based actions
- Sample data displayed

**Functional Requirements:**
- Create new company records
- View all companies in table
- Edit existing company details
- Delete company records
- Form validation on submit
- Data persistence (not implemented - UI only)

---

### 4.3 DOCUMENT MANAGEMENT MODULE (`/document`)

**Purpose:** Upload, manage, and track documents for liquidation cases


**Layout:** Two-column layout (60% form / 40% table on desktop)

**Left Section - Document Submission Form:**

**Form Fields (2-column grid):**

1. **Company Name** (Text Input)
   - Required field

2. **Company Petition No** (Text Input)
   - Required field

3. **Select Branch Officer** (Dropdown)
   - Required field
   - Options: Select Option (placeholder)

4. **Date of Winding Up** (Date Picker)
   - Required field

5. **Main Folder** (Dropdown)
   - Required field
   - Categorization level 1

6. **Sub Folder** (Dropdown)
   - Required field
   - Categorization level 2

7. **Upload Document** (File Upload - Full width)
   - Required field (marked with red asterisk)
   - UID Display: Shows unique document ID (e.g., 0132-0101-2627-0001)
   - Drag-and-drop zone with dashed border
   - Click to upload functionality
   - Upload icon displayed
   - Shows selected filename after selection

8. **Multiple File Upload** (File Upload - Full width)
   - Optional field
   - Supports multiple files (max 5)
   - Same UI as single upload
   - Batch upload capability

9. **File Physical Location** (Text Input)
   - Physical storage location reference

10. **Document Flags** (Checkboxes)
    - Important (checkbox)
    - Hindi (checkbox)

**Form Actions (3 buttons):**

- Submit (Blue) - Save document record
- Print (Gray) - Print document details
- Receipt (Green) - Generate receipt

**Right Section - Uploaded Documents Table:**

**Table Columns:**
1. UID (Unique Document ID)
2. Company Name
3. View (Icon button - FileCheck)
4. Edit (Icon button - Pencil)
5. Delete (Icon button - Trash)

**Sample Data:**
- UID: DOC-001
- Company: A.H.Baily Associates Pvt. Ltd.

**Functional Requirements:**
- Single file upload with preview
- Multiple file upload (batch processing)
- Auto-generate unique document ID (UID)
- Document categorization (Main/Sub folders)
- Flag documents as Important or Hindi
- Track physical file location
- View uploaded documents
- Edit document metadata
- Delete documents
- Print document details
- Generate receipts
- File type validation
- File size limits

**Technical Implementation:**
- useRef hook for file input reference
- useState for filename tracking
- Hidden file input with custom UI
- Click handler triggers file dialog
- onChange handler captures selected files

---

### 4.4 AMALGAMATION MODULE (`/amalgamation`)

**Purpose:** Manage company amalgamation cases and related documentation


**Layout:** Two-column layout (60% form / 40% table on desktop)

**Left Section - Amalgamation Details Form:**

**Form Fields (2-column grid):**

1. **Transferer Companies** (Text Input)
   - Companies being merged/transferred
   - Required field

2. **Transferee Company** (Text Input)
   - Receiving/surviving company
   - Required field

3. **Advocate / CA Name** (Text Input)
   - Legal representative handling case
   - Required field

4. **Company Scheme Petition No** (Text Input)
   - Scheme petition reference number
   - Required field

5. **Company Summons for Direction No** (Text Input)
   - Court summons reference
   - Required field

6. **Amal No** (Text Input)
   - Amalgamation case number
   - Required field

7. **Upload Document** (File Upload - Full width)
   - Required field (marked with red asterisk)
   - UID Display: Shows unique document ID
   - Drag-and-drop zone
   - Single file upload

8. **Multiple File Upload** (File Upload - Full width)
   - Optional field
   - Supports multiple files (max 5)
   - Batch document upload

9. **File Physical Location** (Text Input)
   - Physical storage reference

10. **Is Hindi** (Checkbox)
    - Flag for Hindi language documents

**Form Actions (2 buttons):**
- Submit (Green) - Save amalgamation record
- Print (Gray) - Print case details

**Right Section - Amalgamation List Table:**


**Table Columns:**
1. Transferer (Company being transferred)
2. Transferee (Receiving company)
3. Petition No
4. Edit (Icon button - Pencil)
5. Delete (Icon button - Trash)

**Sample Data:**
- Transferer: ABC Pvt Ltd
- Transferee: XYZ Pvt Ltd
- Petition No: CP-2024/09

**Functional Requirements:**
- Track transferer and transferee companies
- Record legal representative details
- Store petition and summons numbers
- Upload amalgamation documents
- Support multiple document uploads
- Track physical file locations
- Flag Hindi language documents
- View all amalgamation cases
- Edit case details
- Delete cases
- Print case information
- Generate unique case IDs

**Business Logic:**
- One or more transferer companies merge into one transferee
- Legal documentation required (petition, summons)
- Court approval process tracking
- Document version control

---

### 4.5 ESTABLISHMENT MODULE (`/establishment`)

**Purpose:** Manage establishment-related documents and records

**Layout:** Two-column layout (60% form / 40% table on desktop)

**Left Section - Establishment Details Form:**

**Form Fields:**

1. **Name** (Text Input)
   - Establishment or document name
   - Required field

2. **Document Type** (Dropdown)
   - Type categorization
   - Options: Select Option (placeholder)
   - Required field


3. **Upload Document** (File Upload - Full width)
   - Required field (marked with red asterisk)
   - UID Display: Shows unique document ID
   - Drag-and-drop zone
   - Single file upload

4. **Multiple File Upload** (File Upload - Full width)
   - Optional field
   - Supports multiple files (max 5)
   - Batch upload capability

5. **File Physical Location** (Text Input)
   - Physical storage reference

6. **Is Hindi** (Checkbox)
   - Flag for Hindi language documents

**Form Actions (2 buttons):**
- Submit (Green) - Save establishment record
- Print (Gray) - Print record details

**Right Section - Establishment List Table:**

**Table Columns:**
1. Name
2. Document Type
3. Edit (Icon button - Pencil)
4. Delete (Icon button - Trash)

**Sample Data:**
- Name: Company Policy
- Document Type: Notification

**Functional Requirements:**
- Create establishment records
- Categorize by document type
- Upload supporting documents
- Multiple file support
- Track physical locations
- Flag Hindi documents
- View all records
- Edit records
- Delete records
- Print functionality

**Use Cases:**
- Office notifications
- Policy documents
- Administrative records
- Establishment orders
- Internal communications

---

### 4.6 REPORTING MODULE (`/ReportingPage`)

**Purpose:** Generate and view various reports for liquidation management


**Layout:** Card-based navigation with dynamic content area

**Report Type Selection Cards (4 cards in grid):**

1. **Daily Report**
   - Icon: FileText
   - Color: Blue gradient (from-blue-500 to-indigo-600)
   - Purpose: Daily activity summary
   - Status: Placeholder content

2. **Daily Amal Report**
   - Icon: BarChart3
   - Color: Green gradient (from-green-500 to-emerald-600)
   - Purpose: Daily amalgamation activity
   - Status: Placeholder content

3. **Daily Establish Report**
   - Icon: Building2
   - Color: Purple gradient (from-purple-500 to-violet-600)
   - Purpose: Daily establishment activity
   - Status: Placeholder content

4. **Hindi Doc Report**
   - Icon: Languages
   - Color: Orange-Red gradient (from-orange-500 to-red-500)
   - Purpose: Hindi language documents report
   - Status: Placeholder content

**UI Behavior:**
- Card selection changes active state
- Active card scales up (scale-105)
- Active card has full opacity (100%)
- Inactive cards have 80% opacity
- Hover effect on all cards
- Shadow effects on hover and active states
- Smooth transitions (300ms duration)

**Dynamic Content Area:**
- White background with rounded corners
- Shadow effect
- Displays selected report content
- Smooth transition between reports

**Report Components (Placeholders):**
- DailyReport: "📊 Daily Report Content Here"
- DailyAmalReport: "📈 Daily Amal Report Content Here"
- DailyEstablishReport: "🏢 Daily Establish Report Content Here"
- HindiDocReport: "📄 Hindi Document Report Content Here"


**Functional Requirements (To Be Implemented):**
- Generate daily activity reports
- Filter by date range
- Export reports (PDF, Excel)
- Print reports
- Email reports
- Schedule automated reports
- Report templates
- Data visualization (charts, graphs)
- Summary statistics
- Detailed transaction logs

**Report Data Sources:**
- Document uploads
- Company registrations
- Amalgamation cases
- Establishment records
- User activities
- System logs

---

## 5. DATA MODELS & STRUCTURES

### 5.1 User Model

```typescript
interface User {
  email: string;
  role: "admin" | "officer";
}
```

**Storage:** localStorage with key `"user"`

### 5.2 Company Model (Conceptual)

```typescript
interface Company {
  id: string;
  companyName: string;
  petitionNo: string;
  liquidationSection: "Section 34" | "Section 45";
  windingUpDate: Date;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}
```

### 5.3 Document Model (Conceptual)

```typescript
interface Document {
  uid: string; // Unique Document ID
  companyName: string;
  petitionNo: string;
  branchOfficer: string;
  windingUpDate: Date;
  mainFolder: string;
  subFolder: string;
  fileName: string;
  fileUrl: string;
  physicalLocation: string;
  isImportant: boolean;
  isHindi: boolean;
  uploadedAt: Date;
  uploadedBy: string;
}
```


### 5.4 Amalgamation Model (Conceptual)

```typescript
interface Amalgamation {
  id: string;
  amalNo: string;
  transfererCompanies: string[];
  transfereeCompany: string;
  advocateName: string;
  schemePetitionNo: string;
  summonsNo: string;
  documents: string[];
  physicalLocation: string;
  isHindi: boolean;
  createdAt: Date;
  updatedBy: string;
}
```

### 5.5 Establishment Model (Conceptual)

```typescript
interface Establishment {
  id: string;
  name: string;
  documentType: string;
  documents: string[];
  physicalLocation: string;
  isHindi: boolean;
  createdAt: Date;
  updatedBy: string;
}
```

---

## 6. UI/UX DESIGN SPECIFICATIONS

### 6.1 Color Palette

**Primary Colors:**
- Blue: `#0F2D5C`, `#1E3A8A`, `#3B82F6`
- Green: `#047857`, `#10B981`, `#22C55E`
- Orange: `#B45309`, `#EA580C`, `#F97316`
- Purple: `#3730A3`, `#4338CA`, `#8B5CF6`
- Teal: `#0F766E`, `#0E7490`, `#14B8A6`

**Neutral Colors:**
- Slate: `#F8FAFC`, `#F1F5F9`, `#E2E8F0`, `#CBD5E1`, `#64748B`
- Gray: `#F9FAFB`, `#F3F4F6`, `#E5E7EB`, `#9CA3AF`
- White: `#FFFFFF`
- Black: `#000000`

**Status Colors:**
- Success: `#10B981` (Green)
- Error: `#EF4444` (Red)
- Warning: `#F59E0B` (Amber)
- Info: `#3B82F6` (Blue)

### 6.2 Typography


**Font Family:**
- Primary: `system-ui, Avenir, Helvetica, Arial, sans-serif`

**Font Sizes:**
- xs: 0.75rem (12px)
- sm: 0.875rem (14px)
- base: 1rem (16px)
- lg: 1.125rem (18px)
- xl: 1.25rem (20px)
- 2xl: 1.5rem (24px)
- 3xl: 1.875rem (30px)

**Font Weights:**
- Normal: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### 6.3 Spacing System

**Padding/Margin Scale:**
- 1: 0.25rem (4px)
- 2: 0.5rem (8px)
- 3: 0.75rem (12px)
- 4: 1rem (16px)
- 5: 1.25rem (20px)
- 6: 1.5rem (24px)
- 8: 2rem (32px)

### 6.4 Component Styling

**Buttons:**
- Border radius: 8px (rounded-lg) or full (rounded-full)
- Padding: 0.6em 1.2em
- Transition: 0.25s
- Hover effects: Color darkening, shadow
- Focus: Ring outline

**Input Fields:**
- Border: 1px solid slate-300
- Border radius: 6px (rounded-md)
- Padding: 0.375rem 0.5rem
- Focus: Ring-1 ring-blue-200
- Font size: 12px (text-xs)

**Cards:**
- Background: White
- Border: 1px solid slate-100/200
- Border radius: 12px (rounded-xl)
- Shadow: sm or md
- Padding: 1rem to 1.5rem
- Hover: Shadow increase

**Tables:**
- Header: slate-100 background
- Row hover: slate-50 background
- Border: slate-200
- Font size: 12px (text-xs)
- Cell padding: 0.5rem

### 6.5 Responsive Breakpoints


- Mobile: < 640px (sm)
- Tablet: 640px - 1024px (md, lg)
- Desktop: > 1024px (xl, 2xl)

**Layout Adaptations:**
- Mobile: Single column, stacked layout
- Tablet: 2-column grid
- Desktop: Multi-column grid (up to 4 columns)

### 6.6 Icons

**Icon Library:** Lucide React

**Commonly Used Icons:**
- Building2: Companies
- FileText: Documents
- Clock: Pending items
- GitMerge: Amalgamation
- LayoutDashboard: Dashboard
- Search: Search functionality
- Bell: Notifications
- User: User profile
- LogOut: Logout
- Pencil: Edit action
- Trash2: Delete action
- UploadCloud: File upload
- FileCheck: View document
- ChevronDown: Dropdown indicator

**Icon Sizes:**
- Small: 14px
- Medium: 18px
- Large: 22px
- Extra Large: 36px

---

## 7. STATE MANAGEMENT

### 7.1 Context API Implementation

**AuthContext:**
- Purpose: Global authentication state
- Provider: Wraps entire application
- State: `user` (User | null)
- Methods:
  - `login(email, password)` → Returns error string or null
  - `logout()` → Clears session and redirects

**Context Usage:**
```typescript
const { user, login, logout } = useAuth();
```

### 7.2 Local State Management

**Component-Level State (useState):**
- Form inputs
- File upload state
- Dropdown open/close
- Active tab/report selection
- Error messages
- Loading states

**Example Patterns:**

```typescript
const [email, setEmail] = useState<string>("");
const [fileName, setFileName] = useState<string | null>(null);
const [open, setOpen] = useState(false);
const [activeReport, setActiveReport] = useState<ReportType>("daily");
```

### 7.3 Ref Management (useRef)

**File Input References:**
```typescript
const fileInputRef = useRef<HTMLInputElement | null>(null);
```

**Usage:**
- Hidden file inputs
- Programmatic file dialog trigger
- Direct DOM manipulation

---

## 8. NAVIGATION FLOW

### 8.1 User Journey - Admin

```
Login Page (/)
    ↓ [Successful Login]
Admin Dashboard (/admin/dashboard)
    ↓
[Sidebar Navigation]
    ├→ Dashboard
    ├→ Companies (/company)
    │   ├→ Add Company
    │   ├→ Edit Company
    │   └→ Delete Company
    ├→ Documents (/document)
    │   ├→ Upload Document
    │   ├→ View Documents
    │   ├→ Edit Document
    │   └→ Delete Document
    ├→ Amalgamation (/amalgamation)
    │   ├→ Add Case
    │   ├→ Edit Case
    │   └→ Delete Case
    ├→ Establishment (/establishment)
    │   ├→ Add Record
    │   ├→ Edit Record
    │   └→ Delete Record
    └→ Reports (/ReportingPage)
        ├→ Daily Report
        ├→ Daily Amal Report
        ├→ Daily Establish Report
        └→ Hindi Doc Report
    ↓ [Logout]
Login Page (/)
```

### 8.2 User Journey - Officer

```
Login Page (/)
    ↓ [Successful Login]
Officer Dashboard (/officer/dashboard)
    ↓
[Header Navigation Only]
    ├→ Dashboard
    ├→ Doc Inward (/document)
    ├→ Amalgamation (/amalgamation)
    ├→ Establishment (/establishment)
    └→ Reports (/ReportingPage)
    ↓ [Logout]
Login Page (/)
```


---

## 9. TECHNICAL REQUIREMENTS

### 9.1 Browser Compatibility

**Supported Browsers:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Required Features:**
- ES6+ JavaScript support
- CSS Grid and Flexbox
- LocalStorage API
- File API
- Fetch API

### 9.2 Performance Requirements

**Page Load Time:**
- Initial load: < 3 seconds
- Route transitions: < 500ms
- File upload feedback: Immediate

**Bundle Size:**
- Target: < 500KB (gzipped)
- Code splitting by route
- Lazy loading for reports

**Optimization Techniques:**
- Vite HMR (Hot Module Replacement)
- React Compiler enabled
- Tree shaking
- Minification
- Asset optimization

### 9.3 Security Requirements

**Authentication:**
- Client-side validation
- Session management via localStorage
- No sensitive data in localStorage (passwords)
- Automatic logout on session clear

**Authorization:**
- Role-based access control (RBAC)
- Route protection
- Component-level permission checks

**Data Protection:**
- No sensitive data in URLs
- Form validation
- XSS prevention (React default)
- CSRF protection (to be implemented)

**Future Enhancements:**
- JWT token authentication
- Refresh token mechanism
- Session timeout
- Password encryption
- Two-factor authentication
- Audit logging

### 9.4 Accessibility Requirements


**WCAG 2.1 Level AA Compliance (Target):**
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast
- Focus indicators
- Alt text for images
- Semantic HTML
- ARIA labels where needed
- Form labels and error messages

**Implementation Status:**
- Basic semantic HTML: ✓
- Form labels: ✓
- Focus states: ✓
- Color contrast: Partial
- ARIA labels: To be implemented
- Keyboard navigation: To be tested

---

## 10. FILE UPLOAD SPECIFICATIONS

### 10.1 Single File Upload

**Implementation:**
- Hidden file input element
- Custom UI with drag-and-drop zone
- Click to trigger file dialog
- File name display after selection
- Upload icon (UploadCloud)

**Technical Details:**
```typescript
const fileInputRef = useRef<HTMLInputElement | null>(null);
const [fileName, setFileName] = useState<string | null>(null);

const handleClick = () => {
  fileInputRef.current?.click();
};

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files.length > 0) {
    setFileName(e.target.files[0].name);
  }
};
```

### 10.2 Multiple File Upload

**Configuration:**
- `multiple={true}` attribute
- `max={5}` files per upload
- Same UI as single upload
- Batch processing capability

**Validation Requirements (To Be Implemented):**
- File type restrictions (PDF, DOC, DOCX, JPG, PNG)
- File size limit (10MB per file)
- Total batch size limit (50MB)
- Virus scanning
- Duplicate detection

### 10.3 UID Generation

**Format:** `XXXX-XXXX-XXXX-XXXX`
**Example:** `0132-0101-2627-0001`

**Structure (Proposed):**

- Part 1 (4 digits): Year/Branch code
- Part 2 (4 digits): Category code
- Part 3 (4 digits): Sequential number
- Part 4 (4 digits): Checksum/version

---

## 11. FORM VALIDATION REQUIREMENTS

### 11.1 Login Form

**Email Field:**
- Required: Yes
- Format: Valid email format
- Error: "Email and Password are required"
- Error: "Invalid email or password"

**Password Field:**
- Required: Yes
- Min length: 1 character (current)
- Error: "Email and Password are required"
- Error: "Invalid email or password"

### 11.2 Company Form

**All Fields Required:**
- Company Name: Non-empty string
- Petition No: Format validation (CP-YYYY/NN)
- Liquidation Section: Must select option
- Winding Up Date: Valid date

### 11.3 Document Form

**Required Fields:**
- Company Name
- Company Petition No
- Branch Officer
- Winding Up Date
- Main Folder
- Sub Folder
- Upload Document (at least one file)

**Optional Fields:**
- Multiple File Upload
- File Physical Location
- Important checkbox
- Hindi checkbox

### 11.4 Amalgamation Form

**Required Fields:**
- Transferer Companies
- Transferee Company
- Advocate/CA Name
- Scheme Petition No
- Summons No
- Amal No
- Upload Document

**Optional Fields:**
- Multiple File Upload
- File Physical Location
- Is Hindi checkbox

### 11.5 Establishment Form

**Required Fields:**
- Name
- Document Type
- Upload Document

**Optional Fields:**
- Multiple File Upload
- File Physical Location
- Is Hindi checkbox

---

## 12. ERROR HANDLING


### 12.1 Authentication Errors

**Login Failures:**
- Empty credentials: "Email and Password are required"
- Invalid credentials: "Invalid email or password"
- Display: Inline error message (red background, rounded)
- No popup/alert dialogs

### 12.2 Form Validation Errors

**Display Method:**
- Inline field errors
- Red border on invalid fields
- Error text below field
- Form-level error summary

**Common Errors:**
- Required field missing
- Invalid format
- File size exceeded
- File type not allowed
- Network error during submission

### 12.3 Route Protection Errors

**Unauthorized Access:**
- Redirect to login page
- No error message displayed
- Session cleared

**Invalid Route:**
- Redirect to login page (fallback route)

### 12.4 File Upload Errors (To Be Implemented)

**Error Types:**
- File too large
- Invalid file type
- Upload failed (network)
- Virus detected
- Storage quota exceeded

---

## 13. FUTURE ENHANCEMENTS

### 13.1 Backend Integration

**API Requirements:**
- RESTful API or GraphQL
- Authentication endpoints
- CRUD operations for all entities
- File upload/download endpoints
- Report generation endpoints
- Search and filter endpoints

**Database Schema:**
- Users table
- Companies table
- Documents table
- Amalgamations table
- Establishments table
- Audit logs table
- File metadata table

### 13.2 Advanced Features

**Search & Filter:**
- Global search across all modules
- Advanced filters by date, status, type
- Saved search queries
- Export search results

**Notifications:**
- Real-time notifications
- Email notifications
- Push notifications
- Notification preferences

**Audit Trail:**
- User activity logging
- Document version history
- Change tracking
- Compliance reporting


**Document Management:**
- Document preview
- PDF viewer
- Document annotations
- Digital signatures
- OCR for scanned documents
- Full-text search

**Workflow Automation:**
- Approval workflows
- Task assignments
- Deadline reminders
- Status tracking
- Automated notifications

**Analytics & Reporting:**
- Interactive dashboards
- Custom report builder
- Data visualization
- Export to multiple formats
- Scheduled reports
- Comparative analysis

**User Management:**
- User registration
- Role management
- Permission granularity
- User groups
- Activity monitoring

**Integration:**
- Email integration
- Calendar integration
- Court system integration
- Payment gateway
- SMS gateway
- Document scanning devices

### 13.3 Mobile Application

**Features:**
- Native iOS/Android apps
- Offline mode
- Camera integration for document capture
- Push notifications
- Biometric authentication

### 13.4 Localization

**Language Support:**
- Hindi (primary requirement)
- English (current)
- Regional languages
- RTL support
- Date/time localization
- Currency formatting

---

## 14. DEPLOYMENT & DEVOPS

### 14.1 Build Process

**Development:**
```bash
npm run dev
```
- Vite dev server
- Hot module replacement
- Port: 5173
- Base path: /ol-portal/

**Production Build:**
```bash
npm run build
```
- Output: dist/ directory
- Minification enabled
- Tree shaking
- Asset optimization
- Source maps (optional)

**Preview:**
```bash
npm run preview
```
- Preview production build locally

### 14.2 Deployment

**GitHub Pages:**
```bash
npm run deploy
```
- Predeploy: npm run build
- Deploy: gh-pages -d dist
- Branch: gh-pages
- URL: https://[username].github.io/ol-portal/


**Alternative Deployment Options:**
- Vercel
- Netlify
- AWS S3 + CloudFront
- Azure Static Web Apps
- Self-hosted server

### 14.3 Environment Configuration

**Environment Variables (To Be Implemented):**
- API_BASE_URL
- AUTH_TOKEN_KEY
- FILE_UPLOAD_MAX_SIZE
- ALLOWED_FILE_TYPES
- SESSION_TIMEOUT
- ENABLE_ANALYTICS

### 14.4 CI/CD Pipeline (Recommended)

**GitHub Actions Workflow:**
1. Code push to repository
2. Run linting (ESLint)
3. Run type checking (TypeScript)
4. Run tests (if implemented)
5. Build production bundle
6. Deploy to hosting platform
7. Notify team of deployment status

---

## 15. TESTING REQUIREMENTS

### 15.1 Unit Testing (To Be Implemented)

**Test Framework:** Vitest or Jest

**Components to Test:**
- AuthContext login/logout logic
- ProtectedRoute authorization
- Form validation functions
- File upload handlers
- UID generation
- Date formatting utilities

### 15.2 Integration Testing (To Be Implemented)

**Test Scenarios:**
- Login flow end-to-end
- Document upload workflow
- Navigation between pages
- Role-based access control
- Form submission and validation

### 15.3 E2E Testing (To Be Implemented)

**Test Framework:** Playwright or Cypress

**Critical User Journeys:**
- Admin complete workflow
- Officer complete workflow
- Document management flow
- Report generation flow

### 15.4 Manual Testing Checklist

**Authentication:**
- ✓ Login with valid admin credentials
- ✓ Login with valid officer credentials
- ✓ Login with invalid credentials
- ✓ Logout functionality
- ✓ Session persistence on refresh
- ✓ Unauthorized route access

**Navigation:**
- ✓ All sidebar links (admin)
- ✓ All header links (officer)
- ✓ Active state highlighting
- ✓ Breadcrumb navigation
- ✓ Back button behavior

**Forms:**
- ✓ All form fields render correctly
- ✓ Form validation works
- ✓ File upload functionality
- ✓ Submit button behavior
- ✓ Error message display


**Responsive Design:**
- ✓ Mobile view (< 640px)
- ✓ Tablet view (640px - 1024px)
- ✓ Desktop view (> 1024px)
- ✓ Layout adaptations
- ✓ Touch interactions

**Browser Compatibility:**
- ✓ Chrome
- ✓ Firefox
- ✓ Safari
- ✓ Edge

---

## 16. DOCUMENTATION REQUIREMENTS

### 16.1 User Documentation

**User Manual (To Be Created):**
- System overview
- Login instructions
- Module-by-module guides
- Screenshots and tutorials
- FAQ section
- Troubleshooting guide

**Quick Start Guide:**
- First-time login
- Basic operations
- Common tasks
- Keyboard shortcuts

### 16.2 Technical Documentation

**Developer Guide:**
- Setup instructions
- Architecture overview
- Component documentation
- API documentation (when implemented)
- Coding standards
- Git workflow

**Deployment Guide:**
- Environment setup
- Build process
- Deployment steps
- Configuration management
- Rollback procedures

### 16.3 API Documentation (Future)

**Endpoints Documentation:**
- Authentication endpoints
- CRUD endpoints for each module
- File upload endpoints
- Report generation endpoints
- Request/response examples
- Error codes

---

## 17. MAINTENANCE & SUPPORT

### 17.1 Version Control

**Git Strategy:**
- Main branch: Production-ready code
- Develop branch: Integration branch
- Feature branches: Feature development
- Hotfix branches: Critical fixes

**Commit Convention:**
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Testing
- chore: Maintenance

### 17.2 Issue Tracking

**Categories:**
- Bug reports
- Feature requests
- Enhancement suggestions
- Documentation updates
- Performance issues


### 17.3 Update Schedule

**Regular Updates:**
- Security patches: As needed
- Bug fixes: Weekly
- Feature releases: Monthly
- Major versions: Quarterly

### 17.4 Support Channels

**User Support:**
- Help desk email
- In-app help documentation
- Video tutorials
- Training sessions

**Technical Support:**
- Developer documentation
- Code comments
- Architecture diagrams
- Knowledge base

---

## 18. COMPLIANCE & LEGAL

### 18.1 Data Privacy

**Requirements:**
- User consent for data collection
- Data encryption in transit and at rest
- Right to access personal data
- Right to delete personal data
- Data retention policies
- Privacy policy documentation

### 18.2 Court System Compliance

**Legal Requirements:**
- Document authenticity verification
- Audit trail maintenance
- Data integrity assurance
- Secure document storage
- Access control and logging
- Compliance with court procedures

### 18.3 Accessibility Compliance

**Standards:**
- WCAG 2.1 Level AA (target)
- Section 508 compliance
- Keyboard accessibility
- Screen reader compatibility

---

## 19. PERFORMANCE METRICS

### 19.1 Key Performance Indicators (KPIs)

**System Performance:**
- Page load time: < 3 seconds
- Time to interactive: < 5 seconds
- First contentful paint: < 1.5 seconds
- API response time: < 500ms (when implemented)

**User Engagement:**
- Daily active users
- Average session duration
- Pages per session
- Document upload success rate
- Form completion rate

**System Reliability:**
- Uptime: 99.9% target
- Error rate: < 0.1%
- Failed upload rate: < 1%

### 19.2 Monitoring (To Be Implemented)

**Tools:**
- Google Analytics
- Error tracking (Sentry)
- Performance monitoring (Lighthouse)
- User behavior analytics
- Server monitoring

---

## 20. GLOSSARY

**Terms & Definitions:**

- **Amalgamation**: The merger of two or more companies into a single entity
- **Establishment**: Administrative records and documents related to office operations
- **Liquidation**: The process of winding up a company's affairs
- **Official Liquidator**: Court-appointed officer managing company liquidation
- **Petition No**: Court case reference number
- **Transferee**: Company receiving assets in amalgamation
- **Transferer**: Company transferring assets in amalgamation
- **UID**: Unique Identifier for documents
- **Winding Up**: Legal process of closing a company
- **Section 34/45**: Sections of Companies Act governing liquidation

---

## 21. PROJECT METADATA

**Project Name:** OL-PORTAL (Official Liquidator Portal)
**Version:** 0.0.0
**Organization:** Senseware Info Media Pvt Ltd
**Client:** Official Liquidator, High Court Bombay
**Technology:** React + TypeScript + Vite
**License:** Private
**Repository:** GitHub
**Deployment:** GitHub Pages

**Key Stakeholders:**
- Official Liquidator Office
- Court Officers
- Administrative Staff
- Development Team (Senseware)

**Project Status:** Development Phase
**Current Implementation:** Frontend UI (No backend integration)
**Next Phase:** Backend API development and integration

---

## 22. CONCLUSION

This document provides a comprehensive overview of the OL-PORTAL system architecture, functional requirements, and technical specifications. The current implementation focuses on the frontend user interface with placeholder data and hardcoded authentication.

**Current State:**
- ✓ Complete UI/UX implementation
- ✓ Role-based authentication
- ✓ Protected routing
- ✓ Responsive design
- ✓ All major modules (UI only)

**Pending Implementation:**
- Backend API development
- Database integration
- Real CRUD operations
- File storage system
- Report generation logic
- Advanced search and filtering
- User management system
- Audit logging
- Email notifications
- Production deployment

**Recommended Next Steps:**
1. Backend API development (Node.js/Express or similar)
2. Database design and implementation
3. File storage solution (AWS S3 or similar)
4. Authentication system (JWT)
5. Integration testing
6. User acceptance testing
7. Production deployment
8. User training
9. Documentation completion
10. Ongoing maintenance and support

---

**Document Version:** 1.0
**Last Updated:** March 12, 2026
**Prepared By:** Kiro AI Assistant
**Review Status:** Draft

---

END OF DOCUMENT
