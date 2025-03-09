# Comprehensive API Test Suite

## **Test Coverage**
- **Endpoints**: `/albums`, `/photos`, `/users`
- **Test Types**: Positive, Negative, Security, Edge Cases

---

## **1. Albums API** (`/albums`)

### **1.1 Positive Scenarios**
| Test Case ID | Description                              | Steps                                                                 | Expected Result                                                                 |
|--------------|------------------------------------------|-----------------------------------------------------------------------|---------------------------------------------------------------------------------|
| ALB-TC01     | Fetch All Albums                         | 1. Send `GET /albums`.                                               | - Status code: **200 OK** <br>- Returns **100 albums**.                         |
| ALB-TC02     | Validate Album Structure                 | 1. Check a sample album.                                             | Contains `userId`, `id`, `title`.                                               |
| ALB-TC03     | Validate Album Sequence                  | 1. Check albums 1-10.                                                | `userId` increments by 1 every 10 albums (e.g., Album 1-10 → `userId=1`).       |
| ALB-TC04     | Validate Specific Album Data             | 1. Check album with `id=1`.                                           | - `title: "quidem molestiae enim"` <br>- `userId=1`.                            |
| ALB-TC05     | Search Albums (Valid Term)               | 1. Send `GET /albums?title=quidem`.                                  | Returns albums with matching titles.                                            |

### **1.2 Negative & Edge Cases**
| Test Case ID | Description                              | Steps                                                                 | Expected Result                                                                 |
|--------------|------------------------------------------|-----------------------------------------------------------------------|---------------------------------------------------------------------------------|
| ALB-TC06     | Search Albums (Invalid Term)             | 1. Send `GET /albums?title=InvalidAlbum123`.                          | Empty array returned.                                                           |
| ALB-TC07     | Invalid Pagination                       | 1. Send `GET /albums?_page=0&_limit=0`.                               | Status code **400** or empty array.                                             |
| ALB-TC08     | SQL Injection in Search                  | 1. Send `GET /albums?title=' OR 1=1 --`.                              | Input sanitized; no unexpected results.                                         |
| ALB-TC09     | XSS Attempt in Search                    | 1. Send `GET /albums?title=<script>alert('test')</script>`.           | Script not executed.                                                            |

---

## **2. Photos API** (`/photos`)

### **2.1 Positive Scenarios**
| Test Case ID | Description                              | Steps                                                                 | Expected Result                                                                 |
|--------------|------------------------------------------|-----------------------------------------------------------------------|---------------------------------------------------------------------------------|
| PHO-TC01     | Fetch All Photos                         | 1. Send `GET /photos`.                                               | - Status code: **200 OK** <br>- At least **12 photos** returned.                |
| PHO-TC02     | Validate Photo Structure                 | 1. Check a sample photo.                                             | Contains `albumId`, `id`, `title`, `url`, `thumbnailUrl`.                       |
| PHO-TC03     | Filter by AlbumID                        | 1. Send `GET /photos?albumId=1`.                                     | All photos have `albumId=1`.                                                    |
| PHO-TC04     | Validate URL Formats                     | 1. Check `url` and `thumbnailUrl`.                                   | URLs start with `https://via.placeholder.com/600/` and `/150/`.                 |
| PHO-TC05     | Pagination Support                       | 1. Send `GET /photos?_page=1&_limit=5`.                              | Returns exactly **5 photos**.                                                   |

### **2.2 Negative & Edge Cases**
| Test Case ID | Description                              | Steps                                                                 | Expected Result                                                                 |
|--------------|------------------------------------------|-----------------------------------------------------------------------|---------------------------------------------------------------------------------|
| PHO-TC06     | Invalid AlbumID Filter                   | 1. Send `GET /photos?albumId=9999`.                                  | Empty array returned.                                                           |
| PHO-TC07     | Invalid File Upload                      | 1. Attempt to upload a non-image file (e.g., PDF).                   | Error: "Only JPG/PNG allowed."                                                  |
| PHO-TC08     | XSS Attempt in Photo Metadata            | 1. Inject `<script>alert('test')</script>` into `title` field.        | Input sanitized; script not executed.                                           |
| PHO-TC09     | Performance with Large Datasets          | 1. Search `GET /photos?q=a` in an album with 10,000 photos.          | Results load within **5 seconds**.                                              |

---

## **3. Users API** (`/users`)

### **3.1 Positive Scenarios**
| Test Case ID | Description                              | Steps                                                                 | Expected Result                                                                 |
|--------------|------------------------------------------|-----------------------------------------------------------------------|---------------------------------------------------------------------------------|
| USR-TC01     | Fetch All Users                          | 1. Send `GET /users`.                                                | - Status code: **200 OK** <br>- Returns **10 users**.                           |
| USR-TC02     | Validate User Structure                  | 1. Check a sample user.                                              | Contains `id`, `name`, `username`, `email`, `address`, `company`.               |
| USR-TC03     | Validate First User Details              | 1. Check user with `id=1`.                                            | - `name: "Leanne Graham"` <br>- `email: "Sincere@april.biz"`.                   |
| USR-TC04     | Validate Nested Address Data             | 1. Check `address` of user `id=1`.                                   | - `street: "Kulas Light"` <br>- `suite: "Apt. 556"`.                            |
| USR-TC05     | Validate Nested Company Data             | 1. Check `company` of user `id=1`.                                   | - `name: "Romaguera-Crona"` <br>- `catchPhrase` exists.                         |

### **3.2 Negative & Edge Cases**
| Test Case ID | Description                              | Steps                                                                 | Expected Result                                                                 |
|--------------|------------------------------------------|-----------------------------------------------------------------------|---------------------------------------------------------------------------------|
| USR-TC06     | Invalid Endpoint                         | 1. Send `GET /user`.                                                 | Status code: **404 Not Found**.                                                 |
| USR-TC07     | Invalid HTTP Method                      | 1. Send `POST /users`.                                               | Status code: **404 Not Found** or **405 Method Not Allowed**.                   |
| USR-TC08     | Non-Existent User Filter                 | 1. Send `GET /users?id=999`.                                         | Empty array returned.                                                           |
| USR-TC09     | SQL Injection in Email Field             | 1. Send `GET /users?email=' OR 1=1 --`.                              | Input sanitized; no unexpected results.                                         |

---

## **4. Common Scenarios**
| Test Case ID | Description                              | Steps                                                                 | Expected Result                                                                 |
|--------------|------------------------------------------|-----------------------------------------------------------------------|---------------------------------------------------------------------------------|
| COM-TC01     | Validate JSON Schema                     | 1. Check response structure for all endpoints.                        | Matches expected schema (e.g., `id` is integer, `title` is string).             |
| COM-TC02     | Cross-Browser Compatibility              | 1. Test endpoints on Chrome, Firefox, Safari.                        | Consistent responses across browsers.                                           |
| COM-TC03     | Mobile Responsiveness                    | 1. Access API via mobile devices.                                    | JSON response renders correctly (no UI dependency).                             |

---
