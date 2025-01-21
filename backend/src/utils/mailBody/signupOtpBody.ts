export function signupBody(otp: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Signup OTP</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
        }
        .header h1 {
            margin: 0;
            color: #333333;
        }
        .content {
            padding: 20px 0;
            text-align: center;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #333333;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            font-size: 12px;
            color: #999999;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>TalkToPdf</h1>
        </div>
        <div class="content">
            <p>Please use the following OTP to complete your registration:</p>
            <div class="otp">${otp}</div>
            <p>This OTP is valid for 10 minutes.</p>
        </div>
        <div class="footer">
            <p>If you did not request this email, please ignore it.</p>
        </div>
    </div>
</body>
</html>
    `;
}
