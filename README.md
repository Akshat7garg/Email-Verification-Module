# 📧 Email Verification Module

A Node.js module to verify email addresses using:

- Syntax validation  
- DNS MX record lookup  
- SMTP verification  
- Typo detection (Did You Mean feature)

---

## 🚀 Setup

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/Email-Verification-Module.git
cd Email-Verification-Module
```

2. Install dependencies:

```bash
npm install
```

---

## 🧪 Run Tests

To run all test cases:

```bash
npm test
```

---

## 📬 Test a Specific Email

1. Open ```index.js```
2. Add or modify:

```javascript
import { verifyEmail } from "./src/core/verifyEmail.js";

const result = await verifyEmail("your-email@example.com");

console.log(result);
```

3. Run:

```bash
node index.js
```

---

## 📤 Sample Output

```json
{
  "email": "test@gmail.com",
  "result": "unknown",
  "resultcode": 2,
  "subresult": "smtp_timeout",
  "domain": "gmail.com",
  "mxRecords": [
    "gmail-smtp-in.l.google.com",
    "alt1.gmail-smtp-in.l.google.com",
    "alt2.gmail-smtp-in.l.google.com"
  ],
  "executiontime": 10.2,
  "didyoumean": null,
  "error": null,
  "timestamp": "2026-03-26T12:00:00.000Z"
}
```

---

## ⚠️ Notes

- SMTP verification may return ```"unknown"``` due to:
  - Provider restrictions (Gmail, Outlook)
  - Network/firewall limitations
- This is expected behavior in real-world systems.

---

## 📁 Project Structure

```bash
src/
├── core/
├── services/
├── utils/
└── config/

tests/
```

---

## 👨‍💻 Author

Akshat Garg
