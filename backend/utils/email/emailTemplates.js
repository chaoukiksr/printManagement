export const emailVerificationTemplate = (username, otp) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Email Verification</title>
        <style>
            body {
                font-family: 'Cairo', Arial, sans-serif;
                line-height: 1.6;
                color: #3f5d6d;
                margin: 0;
                padding: 0;
                background-color: #c4eeec;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 0;
                background-color: #edfaf9;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #3f5d6d;
                color: #edfaf9;
                padding: 30px 20px;
                text-align: center;
                border-radius: 20px 20px 0 0;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: 600;
            }
            .content {
                padding: 30px;
                background-color: #edfaf9;
            }
            .otp-container {
                background-color: #E1F7F5;
                border-radius: 12px;
                padding: 20px;
                margin: 25px 0;
                text-align: center;
            }
            .otp {
                font-size: 32px;
                font-weight: bold;
                color: #3f5d6d;
                letter-spacing: 4px;
                margin: 10px 0;
            }
            .message {
                color: #3f5d6d;
                font-size: 16px;
                margin-bottom: 20px;
            }
            .footer {
                text-align: center;
                padding: 20px;
                background-color: #E1F7F5;
                color: #9faeb6;
                font-size: 14px;
                border-top: 1px solid #cfd7db;
            }
            .highlight {
                color: #3f5d6d;
                font-weight: 600;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Email Verification</h1>
            </div>
            <div class="content">
                <p class="message">Hello <span class="highlight">${username}</span>,</p>
                <p class="message">Thank you for registering with Print Management System. To complete your registration, please use the following verification code:</p>
                
                <div class="otp-container">
                    <div class="otp">${otp}</div>
                    <p class="message">This code will expire in 10 minutes.</p>
                </div>
                
                <p class="message">If you didn't request this verification, please ignore this email.</p>
                
                <p class="message">Best regards,<br>Print Management Team</p>
            </div>
            <div class="footer">
                <p>This is an automated message, please do not reply to this email.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

export const departmentInvitationTemplate = (departmentName, invitationLink) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Department Invitation</title>
        <style>
            body {
                font-family: 'Cairo', Arial, sans-serif;
                line-height: 1.6;
                color: #3f5d6d;
                margin: 0;
                padding: 0;
                background-color: #c4eeec;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 0;
                background-color: #edfaf9;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #3f5d6d;
                color: #edfaf9;
                padding: 30px 20px;
                text-align: center;
                border-radius: 20px 20px 0 0;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: 600;
            }
            .content {
                padding: 30px;
                background-color: #edfaf9;
            }
            .department-name {
                background-color: #E1F7F5;
                border-radius: 12px;
                padding: 20px;
                margin: 25px 0;
                text-align: center;
                font-size: 20px;
                font-weight: 600;
                color: #3f5d6d;
            }
            .button-container {
                text-align: center;
                margin: 30px 0;
            }
            .button {
                display: inline-block;
                padding: 14px 28px;
                background-color: #3f5d6d;
                color: #edfaf9;
                text-decoration: none;
                border-radius: 12px;
                font-weight: 500;
                font-size: 16px;
                transition: all 0.2s ease-in-out;
            }
            .button:hover {
                background-color: #2c4251;
                transform: translateY(-1px);
            }
            .message {
                color: #3f5d6d;
                font-size: 16px;
                margin-bottom: 20px;
            }
            .footer {
                text-align: center;
                padding: 20px;
                background-color: #E1F7F5;
                color: #9faeb6;
                font-size: 14px;
                border-top: 1px solid #cfd7db;
            }
            .highlight {
                color: #3f5d6d;
                font-weight: 600;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Department Invitation</h1>
            </div>
            <div class="content">
                <p class="message">You have been invited to join the Print Management System as a department chef for:</p>
                
                <div class="department-name">${departmentName}</div>
                
                <p class="message">To accept this invitation and set up your account, please click the button below:</p>
                
                <div class="button-container">
                    <a href="${invitationLink}" class="button">Accept Invitation</a>
                </div>
                
                <p class="message">This invitation link will expire in 24 hours.</p>
                <p class="message">If you did not expect this invitation, please ignore this email.</p>
                
                <p class="message">Best regards,<br>Print Management Team</p>
            </div>
            <div class="footer">
                <p>This is an automated message, please do not reply to this email.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

export const createInvitationTemplate = (role, entityName, invitationLink) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>${role.charAt(0).toUpperCase() + role.slice(1)} Invitation</title>
        <style>
            body {
                font-family: 'Cairo', Arial, sans-serif;
                line-height: 1.6;
                color: #3f5d6d;
                margin: 0;
                padding: 0;
                background-color: #c4eeec;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 0;
                background-color: #edfaf9;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #3f5d6d;
                color: #edfaf9;
                padding: 30px 20px;
                text-align: center;
                border-radius: 20px 20px 0 0;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: 600;
            }
            .content {
                padding: 30px;
                background-color: #edfaf9;
            }
            .entity-name {
                background-color: #E1F7F5;
                border-radius: 12px;
                padding: 20px;
                margin: 25px 0;
                text-align: center;
                font-size: 20px;
                font-weight: 600;
                color: #3f5d6d;
            }
            .button-container {
                text-align: center;
                margin: 30px 0;
            }
            .button {
                display: inline-block;
                padding: 14px 28px;
                background-color: #3f5d6d;
                color: #edfaf9;
                text-decoration: none;
                border-radius: 12px;
                font-weight: 500;
                font-size: 16px;
                transition: all 0.2s ease-in-out;
            }
            .button:hover {
                background-color: #2c4251;
                transform: translateY(-1px);
            }
            .message {
                color: #3f5d6d;
                font-size: 16px;
                margin-bottom: 20px;
            }
            .footer {
                text-align: center;
                padding: 20px;
                background-color: #E1F7F5;
                color: #9faeb6;
                font-size: 14px;
                border-top: 1px solid #cfd7db;
            }
            .highlight {
                color: #3f5d6d;
                font-weight: 600;
            }
            .role-badge {
                display: inline-block;
                padding: 8px 16px;
                background-color: #E1F7F5;
                color: #3f5d6d;
                border-radius: 8px;
                font-weight: 500;
                margin: 10px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>${role.charAt(0).toUpperCase() + role.slice(1)} Invitation</h1>
            </div>
            <div class="content">
                <p class="message">You have been invited to join the Print Management System as a:</p>
                
                <div class="role-badge">${role.charAt(0).toUpperCase() + role.slice(1)}</div>
                
                <p class="message">at:</p>
                
                <div class="entity-name">${entityName}</div>
                
                <p class="message">To accept this invitation and set up your account, please click the button below:</p>
                
                <div class="button-container">
                    <a href="${invitationLink}" class="button">Accept Invitation</a>
                </div>
                
                <p class="message">This invitation link will expire in 24 hours.</p>
                <p class="message">If you did not expect this invitation, please ignore this email.</p>
                
                <p class="message">Best regards,<br>Print Management Team</p>
            </div>
            <div class="footer">
                <p>This is an automated message, please do not reply to this email.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

export const printRequestUpdateTemplate = (username, requestDetails, queuePosition = null) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Print Request Update</title>
        <style>
            body {
                font-family: 'Cairo', Arial, sans-serif;
                line-height: 1.6;
                color: #3f5d6d;
                margin: 0;
                padding: 0;
                background-color: #c4eeec;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 0;
                background-color: #edfaf9;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #3f5d6d;
                color: #edfaf9;
                padding: 30px 20px;
                text-align: center;
                border-radius: 20px 20px 0 0;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: 600;
            }
            .content {
                padding: 30px;
                background-color: #edfaf9;
            }
            .request-details {
                background-color: #E1F7F5;
                border-radius: 12px;
                padding: 20px;
                margin: 25px 0;
            }
            .status-badge {
                display: inline-block;
                padding: 8px 16px;
                background-color: #3f5d6d;
                color: #edfaf9;
                border-radius: 8px;
                font-weight: 500;
                margin: 10px 0;
            }
            .queue-info {
                background-color: #E1F7F5;
                border-radius: 12px;
                padding: 20px;
                margin: 25px 0;
                text-align: center;
            }
            .message {
                color: #3f5d6d;
                font-size: 16px;
                margin-bottom: 20px;
            }
            .footer {
                text-align: center;
                padding: 20px;
                background-color: #E1F7F5;
                color: #9faeb6;
                font-size: 14px;
                border-top: 1px solid #cfd7db;
            }
            .highlight {
                color: #3f5d6d;
                font-weight: 600;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Print Request Update</h1>
            </div>
            <div class="content">
                <p class="message">Hello <span class="highlight">${username}</span>,</p>
                <p class="message">Your print request has been updated:</p>
                
                <div class="request-details">
                    <p><strong>Request Type:</strong> ${requestDetails.type}</p>
                    <p><strong>Quantity:</strong> ${requestDetails.quantity}</p>
                    <p><strong>Description:</strong> ${requestDetails.description || 'N/A'}</p>
                    <p><strong>New Status:</strong> <span class="status-badge">${requestDetails.status === "wf_teacher" ? "Waiting for You " : requestDetails.status === "wf_printer" ? "Waiting for Printer" : requestDetails.status}</span></p>
                </div>

                ${queuePosition ? `
                <div class="queue-info">
                    <p class="message">Queue Information:</p>
                    <p class="message">There are <span class="highlight">${queuePosition.wfPrinter}</span> requests with "Waiting for Printer" status</p>
                    <p class="message">and <span class="highlight">${queuePosition.wfTeacher}</span> requests with "Waiting for Teacher" status</p>
                    <p class="message">ahead of your request for today.</p>
                </div>
                ` : ''}
                
                <p class="message">Best regards,<br>Print Management Team</p>
            </div>
            <div class="footer">
                <p>This is an automated message, please do not reply to this email.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

export const passwordResetTemplate = (username, resetUrl) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Password Reset</title>
        <style>
            body {
                font-family: 'Cairo', Arial, sans-serif;
                line-height: 1.6;
                color: #3f5d6d;
                margin: 0;
                padding: 0;
                background-color: #c4eeec;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 0;
                background-color: #edfaf9;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #3f5d6d;
                color: #edfaf9;
                padding: 30px 20px;
                text-align: center;
                border-radius: 20px 20px 0 0;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: 600;
            }
            .content {
                padding: 30px;
                background-color: #edfaf9;
            }
            .button-container {
                text-align: center;
                margin: 30px 0;
            }
            .button {
                display: inline-block;
                padding: 14px 28px;
                background-color: #3f5d6d;
                color: #edfaf9;
                text-decoration: none;
                border-radius: 12px;
                font-weight: 500;
                font-size: 16px;
                transition: all 0.2s ease-in-out;
            }
            .button:hover {
                background-color: #2c4251;
                transform: translateY(-1px);
            }
            .message {
                color: #3f5d6d;
                font-size: 16px;
                margin-bottom: 20px;
            }
            .footer {
                text-align: center;
                padding: 20px;
                background-color: #E1F7F5;
                color: #9faeb6;
                font-size: 14px;
                border-top: 1px solid #cfd7db;
            }
            .highlight {
                color: #3f5d6d;
                font-weight: 600;
            }
            .warning {
                background-color: #E1F7F5;
                border-radius: 12px;
                padding: 20px;
                margin: 25px 0;
                text-align: center;
                font-size: 14px;
                color: #9a0422;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Password Reset</h1>
            </div>
            <div class="content">
                <p class="message">Hello <span class="highlight">${username}</span>,</p>
                <p class="message">We received a request to reset your password for your Print Management System account. Click the button below to reset your password:</p>
                
                <div class="button-container">
                    <a href="${resetUrl}" class="button">Reset Password</a>
                </div>
                
                <div class="warning">
                    This link will expire in 10 minutes. If you did not request a password reset, please ignore this email or contact support if you have concerns.
                </div>
                
                <p class="message">If the button above doesn't work, you can also copy and paste this link into your browser:</p>
                <p class="message" style="word-break: break-all;">${resetUrl}</p>
                
                <p class="message">Best regards,<br>Print Management Team</p>
            </div>
            <div class="footer">
                <p>This is an automated message, please do not reply to this email.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};
