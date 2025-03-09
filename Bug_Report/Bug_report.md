# Bug Report: Login Fails with Valid Credentials – Page Refreshes Without Successful Authentication  

## Environment  
- **Browser:** Google Chrome 94.0.4606.81 (Windows 10)  
- **Application Version:** 2.3.1  
- **Test Environment:** Staging (https://staging.exampleapp.com)  
- **Device:** Desktop (Windows 10, 64-bit)  

---

## Steps to Reproduce  
1. Navigate to the application login page (`/login`).  
2. Enter valid credentials:  
   - **Email:** `testuser@example.com`  
   - **Password:** `SecurePass123!`  
3. Click the **Login** button.  
4. Observe the page behavior.  

## Expected Result  
- User is authenticated and redirected to the dashboard (`/dashboard`).  
- A valid session cookie is set.  

## Actual Result  
- Login page **refreshes** without redirecting.  
- User remains on `/login` (not logged in).  
- **No error message** is displayed.  
- Network response for `/api/login` returns HTTP **200 OK** but no `Set-Cookie` header.  

---

## Additional Notes  
- **Frequency:** Consistent (10/10 attempts).  
- **Server Logs:** Login marked "successful," but no session token generated.  
- **Impact:** Critical (blocks all user access).  
- **Workaround:** None identified.  
- **Key Observations:**  
  - Affects multiple valid accounts.  
  - Invalid credentials correctly show an error.  
  - **Network Analysis:** `/api/login` returns `{ "success": true }` without authentication cookies.  
  - **Console Errors:** None detected.  

---

| **Severity** | **Priority** |  
|--------------|---------------|  
| High         | High          |  

---

## Attachments  
1. `login-refresh-issue.png` (before/after submission screenshots).  
2. `network_logs.har` (login request/response logs).  
3. `server_logs.txt` (excerpt showing successful auth without session creation).  

---

## Notes/Questions for the Team  
1. Was there a recent deployment affecting session management?  
2. Could user status checks (e.g., "active" flag) block cookie generation?  
3. Are cookie policies (e.g., `SameSite`, `Secure`) misconfigured?  

**Reporter:** Raymond Korir 
**Date Reported:** 09-03-2025

---

## Follow-Up Actions  
- Tagged for **Backend Team** and **Frontend Team**.  
- Linked to related issue: [JIRA-1234].  