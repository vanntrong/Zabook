import nodemailer from "nodemailer";

export function mailTransport() {
  return nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });
}

export function generateEmailTemplate(code) {
  return `<!DOCTYPE html>
  <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
      </head>
      <style>
          body {
          font-family: sans-serif;
          background: #fff;
          }
          .email--background {
          background: #eee;
          padding: 10px;
          text-align: center;
          }
          .email--container, .pre-header {
          max-width: 500px;
          background: #fff;
          margin: 0 auto;
          overflow: hidden;
          border-radius: 5px;
          }
          .email--inner-container {
          padding: 0 5% 40px;
          }
          .pre-header {
          background: #eee;
          color: #eee;
          font-size: 5px;
          }
          img {
          max-width: 100%;
          display: block;
          }
          p {
          font-size: 16px;
          line-height: 1.5;
          color: #a2a2a2;
          margin-bottom: 30px;
          }
          .cta {
          display: inline-block;
          padding: 10px 20px;
          color: #fff;
          background: #373629;
          text-decoration: none;
          letter-spacing: 2px;
          text-transform: uppercase;
          border-radius: 5px;
          font-size: 13px;
          }
          .footer-junk {
          padding: 20px;
          font-size: 10px;
          }
          .footer-junk a {
          color: #bbbbbb;
          }
      </style>
      <body>
          <div class="email--background">
              <div class="pre-header">
              </div>
              <div class="email--container">
                  <div class="email--inner-container">
                      <p>Thanks for using my project. I received a request to renew your password. Here is your security code: </p>
                      <p>Please don't share your code to any one!!</p>
                      <p class="cta">${code}</p>
                  </div>
              </div>
          </div>
      </body>
  </html>
  `;
}
