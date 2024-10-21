export const userLoginEmailHTML = (
  email: string,
  password: string,
  company: string,
  link: string
): string => {
  const emailTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to LCVentures</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
        }
        h1 {
          color: #333;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          margin-bottom: 10px;
        }
        strong {
          font-weight: bold;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          text-decoration: none;
          border-radius: 4px;
          transition: background-color 0.3s ease;
        }
        .button:hover {
          background-color: #0056b3;
        }
      </style>
    </head>
    <body>
      <h1>Welcome to LCVentures</h1>
      <p>Your account under the company ${company} has been created. Use credentials below to login.</p>
      <ul>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Password:</strong> ${password}</li>
      </ul>
      <p>Please use the provided credentials to log in to your account. We recommend changing your password after logging in for the first time.</p>
      <a href="${link}" target="_blank" class="button" style="color: #fff;" >Login Now</a>
      <p>If you have any questions or need assistance, feel free to contact our support team.</p>
      <p>Thank you!</p>
    </body>
    </html>
  `;

  return emailTemplate;
};
