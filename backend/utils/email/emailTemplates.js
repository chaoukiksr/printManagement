export const emailVerificationTemplate = (username, otp) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Email Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                background-color: #4CAF50;
                color: white;
                padding: 20px;
                text-align: center;
                border-radius: 5px 5px 0 0;
            }
            .content {
                padding: 20px;
                background-color: #f9f9f9;
                border-radius: 0 0 5px 5px;
            }
            .otp {
                font-size: 24px;
                font-weight: bold;
                color: #4CAF50;
                text-align: center;
                padding: 10px;
                margin: 20px 0;
                background-color: #e8f5e9;
                border-radius: 5px;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 12px;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Email Verification</h1>
            </div>
            <div class="content">
                <p>Hello ${username},</p>
                <p>Thank you for registering with Print Management System. To complete your registration, please use the following OTP to verify your email address:</p>
                
                <div class="otp">${otp}</div>
                
                <p>This OTP will expire in 10 minutes.</p>
                <p>If you didn't request this verification, please ignore this email.</p>
                
                <p>Best regards,<br>Print Management Team</p>
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
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                background-color: #2196F3;
                color: white;
                padding: 20px;
                text-align: center;
                border-radius: 5px 5px 0 0;
            }
            .content {
                padding: 20px;
                background-color: #f9f9f9;
                border-radius: 0 0 5px 5px;
            }
            .button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #2196F3;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                margin: 20px 0;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 12px;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Department Invitation</h1>
            </div>
            <div class="content">
                <p>You have been invited to join the Print Management System as a department chef for:</p>
                <h2>${departmentName}</h2>
                
                <p>To accept this invitation and set up your account, please click the button below:</p>
                
                <div style="text-align: center;">
                    <a href="${invitationLink}" class="button">Accept Invitation</a>
                </div>
                
                <p>This invitation link will expire in 24 hours.</p>
                <p>If you did not expect this invitation, please ignore this email.</p>
                
                <p>Best regards,<br>Print Management Team</p>
            </div>
            <div class="footer">
                <p>This is an automated message, please do not reply to this email.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};
