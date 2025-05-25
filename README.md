# Print Management System

A comprehensive web-based print management system designed for educational institutions to manage and track print requests between departments, teachers, and printing services.

![Print Management System Overview](/frontend/public/assets/overview.png)

## Features

### Authentication & Authorization
- Multi-role authentication (Admin, Department, Teacher, Printer)
- Email verification system with OTP
- Secure session management
- Password reset functionality
- Invitation-based registration for departments and printers

### Print Request Management
- Create and manage print requests
- File upload support
- Status tracking (Pending, Approved, Refused, Completed)
- Workflow management between departments, teachers, and printers
- Cost calculation and tracking
- Request history and statistics

### Department Features
- Manage department members
- Track department print requests
- View department statistics
- Approve/reject print requests
- Cost management

### Teacher Features
- Submit print requests
- Track request status
- View request history
- Upload and manage files
- View personal statistics

### Printer Features
- View assigned print requests
- Update request status
- Manage printing queue
- Track completed requests
- View printer statistics

### Admin Features
- User management
- Department management
- System configuration
- Global statistics
- Cost configuration
- Invitation management

## Tech Stack

### Frontend
- Next.js 14
- Redux Toolkit for state management
- Tailwind CSS for styling
- React Hot Toast for notifications
- Axios for API requests
- Custom UI components

### Backend
- Bun runtime
- Express.js framework
- MongoDB with Mongoose
- Passport.js for authentication
- Express Session for session management
- Multer for file uploads
- Nodemailer for email services

## Getting Started

### Prerequisites
- Bun (latest version)
- MongoDB
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/abdelali-01/printManagement.git
cd print-management
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
bun install

# Install frontend dependencies
cd ../frontend
bun install
```

3. Set up environment variables:

Backend (.env):
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_uri
SESSION_SECRET=your_session_secret
CLIENT_URL=http://localhost:3000
EMAIL=your_email
EMAIL_PASS=your_email_password
```

Frontend (.env):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
```

4. Start the development servers:

```bash
# Start backend server
cd backend
bun run dev

# Start frontend server
cd ../frontend
bun run dev
```

## Project Structure

```
print-management/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── strategies/
│   ├── uploads/
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── store/
│   │   └── utils/
│   └── public/
└── README.md
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - User login
- POST /api/auth/logout - User logout
- POST /api/auth/verify-otp - Verify email OTP
- POST /api/auth/resend-otp - Resend OTP
- GET /api/auth/check - Check authentication status

### Print Requests
- GET /api/print - Get print requests
- POST /api/print - Create print request
- PUT /api/print/:id - Update print request
- DELETE /api/print/:id - Delete print request

### Departments
- GET /api/department - Get departments
- POST /api/department - Create department
- PUT /api/department/:id - Update department
- DELETE /api/department/:id - Delete department

### Statistics
- GET /api/statistics - Get system statistics


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email aliaribi47@gmail.com or create an issue in the repository. 