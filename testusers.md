🔑 1. Admin Login

Selected Role: Admin
Email: admin@medimate.com
Password: Admin@123456
Dashboard URL: /admin



🩺 2. Doctor Login

Selected Role: Doctor
Email: dr.smith@medimate.com (or dr.johnson@medimate.com)
Password: Doctor@123456
Dashboard URL: /doctor



👤 3. Patient Login

Selected Role: Patient
Email: john.doe@gmail.com (or emily.white@gmail.com)
Password: Patient@123456
Dashboard URL: /patient
(Note: New patients can also self-register at /register or be created via Admin Dashboard)



🚫 4. Staff (Blocked / Non-Loginable)

Email: nurse.clara@medimate.com
Password: Staff@123456
Result: Blocked — backend returns HTTP 403 Forbidden ("Staff members do not have dashboard access and cannot log in"), and the Staff option is excluded on the /login screen.