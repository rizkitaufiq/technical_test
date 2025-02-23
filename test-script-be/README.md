#Description

This is a RESTful API for an presence system built using Node.js and PostgreSQL. The system allows users to log in, record presence (check-in and check-out), and supervisors to approve presence records.

#Features

- User authentication with JWT

- Presence recording with type (IN/OUT) restriction per day

- Supervisor approval of presence records

- Secure password storage using bcrypt

- Role-based access control


#Installation

- Clone the repository:

git clone <repository-url>

- Navigate to the project directory:

cd project-root

- Install dependencies:

npm install

- Set up environment variables:

create .env

Update .env with your database credentials and JWT secret.

- Run database migrations and seeders:

npm run migrate
npm run seedUsers.js

- Start the server:

node app.js


#API Endpoints

- Authentication

POST /api/login - User login (returns JWT token)

- Presence

POST /api/presence - Record attendance (Requires token)

GET /api/presence/get - View user attendance records

- Supervisor Approval

POST /attendance/approve - Approve attendance (Supervisor only)


#Technologies Used

- Node.js

- PostgreSQL

- JSON Web Token (JWT)

- bcrypt for password hashing