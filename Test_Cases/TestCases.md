# Web Application Test Cases

## Test Case Overview
This document covers test scenarios for the following modules:
- **Landing Page**
- **Login Page**
- **Authenticated Pages (Home, Users, Albums, Photos)**
- **Security & Edge Cases**
- **Compatibility & Responsiveness**

---

## Test Cases

### **1. Landing Page**

| Test Case ID | Test Scenario                     | Steps                                                                 | Expected Result                                                                 | Type       |
|--------------|-----------------------------------|-----------------------------------------------------------------------|---------------------------------------------------------------------------------|------------|
| TC-01.1      | Verify Landing Page Elements      | 1. Open URL.<br>2. Check for logo, "Login" button, hero section, footer. | All elements are visible and functional.                                        | Positive   |
| TC-01.2      | Navigate to Login Page            | 1. Click "Login" button.                                             | Redirected to Login Page.                                                       | Critical   |
| TC-01.3      | Unauthenticated Access to Auth Pages | 1. Directly navigate to `/home`, `/user`, `/album`, `/photo`.        | Redirected to Login Page.                                                       | Negative   |

---

### **2. Login Page**

| Test Case ID | Test Scenario                     | Steps                                                                 | Expected Result                                                                 | Type       |
|--------------|-----------------------------------|-----------------------------------------------------------------------|---------------------------------------------------------------------------------|------------|
| TC-02.1      | Valid Login                       | 1. Enter valid credentials.<br>2. Click "Submit."                    | Redirected to Home Page; session cookie set.                                    | Positive   |
| TC-02.2      | Invalid Login                     | 1. Enter invalid credentials.<br>2. Click "Submit."                  | Error: "Invalid credentials."                                                   | Negative   |
| TC-02.3      | Empty Form Submission             | 1. Leave fields blank.<br>2. Click "Submit."                         | Error: "Username and password are required."                                    | Negative   |
---

### **3. Home Page (Authenticated)**

| Test Case ID | Test Scenario                     | Steps                                                                 | Expected Result                                                                 | Type       |
|--------------|-----------------------------------|-----------------------------------------------------------------------|---------------------------------------------------------------------------------|------------|
| TC-03.1      | Verify Home Page Elements         | 1. After login, check for welcome message, navigation links, logout. | All elements visible.                                                           | Critical   |
| TC-03.2      | Session Persistence               | 1. Refresh the page.                                                 | User remains logged in.                                                         | Critical   |

---

### **4. User Page**

| Test Case ID | Test Scenario                     | Steps                                                                 | Expected Result                                                                 | Type       |
|--------------|-----------------------------------|-----------------------------------------------------------------------|---------------------------------------------------------------------------------|------------|
| TC-04.1      | View Profile                      | 1. Navigate to User Page.                                            | User details (name, email, profile picture) displayed.                          | Positive   |
| TC-04.2      | Edit Profile                      | 1. Click "Edit Profile."<br>2. Update fields.<br>3. Save.             | Changes reflected after reload.                                                 | Positive   |
| TC-04.3      | Invalid Profile Update            | 1. Enter invalid email (e.g., `user@invalid`).<br>2. Save.           | Error: "Invalid email format."                                                  | Negative   |

---

### **5. Album Page**

| Test Case ID | Test Scenario                     | Steps                                                                 | Expected Result                                                                 | Type       |
|--------------|-----------------------------------|-----------------------------------------------------------------------|---------------------------------------------------------------------------------|------------|
| TC-05.1      | Fetch Albums                      | 1. Navigate to Album Page.                                           | Albums load with titles, thumbnails, and metadata.                              | Critical   |
| TC-05.2      | Search Albums (Valid Term)        | 1. Enter "Vacation 2023" in search bar.<br>2. Click "Search."         | Relevant albums displayed.                                                      | Positive   |
| TC-05.3      | Search Albums (Invalid Term)      | 1. Enter "XYZ123."                                                   | "No results found."                                                             | Negative   |
| TC-05.4      | Search Edge Cases                 | 1. Test partial matches, case sensitivity, special characters.       | Results match application logic (e.g., partial/case-insensitive search supported). | Edge Case |

---

### **6. Photo Page**

| Test Case ID | Test Scenario                     | Steps                                                                 | Expected Result                                                                 | Type       |
|--------------|-----------------------------------|-----------------------------------------------------------------------|---------------------------------------------------------------------------------|------------|
| TC-06.1      | Fetch Photos                      | 1. Select album.<br>2. Navigate to Photo Page.                        | Photos load with captions, dates, and resolution.                                | Critical   |
| TC-06.2      | Search Photos (Valid Term)        | 1. Enter "Beach Sunset" in search bar.<br>2. Click "Search."          | Matching photos displayed.                                                      | Positive   |
| TC-06.3      | Search Photos (Invalid Term)      | 1. Enter "PurpleElephant."                                           | "No photos found."                                                              | Negative   |
| TC-06.4      | Advanced Search Filters           | 1. Filter by date range or tags (e.g., "Nature").                     | Only matching photos shown.                                                     | Critical   |
| TC-06.5      | Invalid File Upload               | 1. Upload a PDF file.                                                | Error: "Only JPG/PNG allowed."                                                  | Negative   |

---

### **7. Security & Edge Cases**

| Test Case ID | Test Scenario                     | Steps                                                                 | Expected Result                                                                 | Type       |
|--------------|-----------------------------------|-----------------------------------------------------------------------|---------------------------------------------------------------------------------|------------|
| TC-07.1      | SQL Injection in Search           | 1. Enter `' OR 1=1 --` in search bars.                               | Input sanitized; no unexpected results.                                         | Security   |
| TC-07.2      | XSS Attempt                       | 1. Enter `<script>alert('test')</script>` in input fields.           | Script not executed.                                                            | Security   |
| TC-07.3      | Performance with Large Datasets   | 1. Search "a" in an album with 10,000 photos.                        | Results load within 5 seconds.                                                  | Edge Case  |

---

### **8. Compatibility & Responsiveness**

| Test Case ID | Test Scenario                     | Steps                                                                 | Expected Result                                                                 | Type         |
|--------------|-----------------------------------|-----------------------------------------------------------------------|---------------------------------------------------------------------------------|--------------|
| TC-08.1      | Mobile Responsiveness             | 1. Access on mobile devices.                                         | UI adapts without overflow.                                                     | Compatibility|
| TC-08.2      | Cross-Browser Testing             | 1. Test on Chrome, Firefox, Safari.                                  | Consistent functionality and styling.                                           | Compatibility|

---

## **Test Coverage Summary**
| **Category**       | **Coverage**                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| **Critical Path**   | Login → Home → Album/Photo navigation → Search → Logout.                    |
| **Positive Scenarios** | Valid login, profile edit, album/photo search, file upload.                |
| **Negative Scenarios** | Invalid login, empty inputs, invalid searches, security attacks.           |
| **Edge Cases**      | Special characters, large datasets, session timeout.                       |
| **Security**        | SQLi, XSS, input sanitization.                                             |