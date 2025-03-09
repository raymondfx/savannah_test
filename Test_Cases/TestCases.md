# Comprehensive Test Cases for Web Application

## **1. Landing Page**
### **1.1 Verify Landing Page Elements**
- **Description:** Ensure all elements are present on the landing page.
- **Steps:**
  1. Open the website URL.
  2. Check for:
     - Logo
     - "Login" button
     - "Home" link (if applicable)
     - Hero section with introductory content
     - Footer (copyright, contact info)
- **Expected Result:** All elements are visible and functional.

### **1.2 Navigation to Login Page**
- **Steps:**
  1. Click the "Login" button.
- **Expected Result:** Redirected to the Login Page.

### **1.3 Unauthenticated Access to Authenticated Pages**
- **Steps:**
  1. Directly navigate to `/home`, `/user`, `/album`, or `/photo`.
- **Expected Result:** Redirected to the Login Page.

---

## **2. Login Page**
### **2.1 Valid Login**
- **Precondition:** Valid credentials.
- **Steps:**
  1. Enter valid username/password.
  2. Click "Submit."
- **Expected Result:** Redirected to Home Page with session cookie set.

### **2.2 Invalid Login**
- **Precondition:** Invalid credentials.
- **Steps:**
  1. Enter invalid username/password.
  2. Click "Submit."
- **Expected Result:** Error: "Invalid credentials."

### **2.3 Empty Form Submission**
- **Steps:**
  1. Leave fields blank.
  2. Click "Submit."
- **Expected Result:** Error: "Username and password are required."

### **2.4 Forgot Password Functionality**
- **Steps:**
  1. Click "Forgot Password."
  2. Enter valid email.
  3. Submit.
- **Expected Result:** Confirmation email sent (mocked).

---

## **3. Authenticated Home Page**
### **3.1 Verify Home Page Elements**
- **Precondition:** User is logged in.
- **Steps:**
  1. Check for:
     - Welcome message with username.
     - Navigation links (User, Album, Photo).
     - "Logout" button.
- **Expected Result:** All elements are visible.

### **3.2 Session Persistence**
- **Steps:**
  1. Refresh the page.
- **Expected Result:** User remains logged in.

---

## **4. User Page**
### **4.1 Profile Display**
- **Steps:**
  1. Navigate to User Page.
- **Expected Result:** Displays user details (name, email, profile picture).

### **4.2 Edit Profile**
- **Steps:**
  1. Click "Edit Profile."
  2. Update fields (e.g., name).
  3. Save.
- **Expected Result:** Changes reflected after reload.

### **4.3 Invalid Profile Update**
- **Steps:**
  1. Enter invalid email (e.g., `user@invalid`).
  2. Click "Save."
- **Expected Result:** Error: "Invalid email format."

---

## **5. Album Page**
### **5.1 Fetch Albums**
- **Steps:**
  1. Navigate to Album Page.
- **Expected Result:** 
  - Albums load with titles, thumbnails, and creation dates.
  - Pagination works (if applicable).

### **5.2 Search Albums**
- **Positive Scenario: Valid Search Term**
  - **Steps:**
    1. Enter "Vacation 2023" in the search bar.
    2. Click "Search."
  - **Expected Result:** Relevant albums displayed.

- **Negative Scenario: Invalid Search Term**
  - **Steps:**
    1. Enter "XYZ123".
  - **Expected Result:** "No results found."

### **5.3 Search Edge Cases**
- **Steps:**
  1. Test partial matches ("vac" for "Vacation").
  2. Test case sensitivity ("VACATION" vs "vacation").
  3. Enter special characters (`!@#`).
- **Expected Result:**
  - Partial/case-insensitive matches return results (if supported).
  - Special characters handled safely.

---

## **6. Photo Page**
### **6.1 Fetch Photos**
- **Precondition:** Select an album.
- **Steps:**
  1. Navigate to Photo Page.
- **Expected Result:** 
  - Photos load with captions, upload dates, and resolution.
  - Pagination/sorting works (if enabled).

### **6.2 Search Photos**
- **Positive Scenario: Valid Search Term**
  - **Steps:**
    1. Enter "Beach Sunset" in the search bar.
    2. Click "Search."
  - **Expected Result:** Matching photos displayed.

- **Negative Scenario: Invalid Search Term**
  - **Steps:**
    1. Enter "PurpleElephant."
  - **Expected Result:** "No photos found."

### **6.3 Advanced Search Filters**
- **Steps:**
  1. Filter by date range (Jan 2023 – Dec 2023).
  2. Filter by tag ("Nature").
- **Expected Result:** Only matching photos shown.

### **6.4 Invalid File Upload**
- **Steps:**
  1. Upload a PDF file.
- **Expected Result:** Error: "Only JPG/PNG allowed."

---

## **7. Security & Edge Cases**
### **7.1 SQL Injection in Search**
- **Steps:**
  1. Enter `' OR 1=1 --` in search bars.
- **Expected Result:** Input sanitized; no unexpected results.

### **7.2 XSS Attempt**
- **Steps:**
  1. Enter `<script>alert('test')</script>` in input fields.
- **Expected Result:** Script not executed.

### **7.3 Performance with Large Datasets**
- **Steps:**
  1. Search "a" in an album with 10,000 photos.
- **Expected Result:** Results load within 5 seconds.

---

## **8. Compatibility & Responsiveness**
### **8.1 Mobile Responsiveness**
- **Steps:**
  1. Access pages on mobile devices.
- **Expected Result:** UI adapts without overflow.

### **8.2 Cross-Browser Testing**
- **Steps:**
  1. Test on Chrome, Firefox, Safari.
- **Expected Result:** Consistent functionality and styling.

---

## **Critical User Journey**
1. **Login** → **Home Page** → **Album Page** → Search "Family Trips" → Open album → Search photos "Mountain" → **Logout**.
2. Validate seamless navigation and functionality at each step.

---

## **Test Coverage Summary**
- **Positive Scenarios:** Login, profile edit, fetching/searching albums/photos, valid searches.
- **Negative Scenarios:** Invalid logins, empty inputs, invalid searches, security attacks.
- **Edge Cases:** Special characters, large datasets, session timeout.