// brevo-http-test.js

import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const API_KEY = process.env.BREVO_API_KEY
const fromEmail = process.env.FROM_EMAIL
const toEmail = process.env.TO_EMAIL

if (!API_KEY || !fromEmail || !toEmail) {
  console.error("❌ Missing BREVO_API_KEY, FROM_EMAIL, or TO_EMAIL in .env")
  process.exit(1)
}

console.log("Using API Key:", API_KEY?.slice(0, 10) + "...")
console.log("From:", fromEmail)
console.log("To:", toEmail)

const sendEmail = async () => {
  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: { email: fromEmail },
        to: [{ email: toEmail }],
        subject: '✅ Test Email from Brevo HTTP API',
        htmlContent: '<p>This is a <strong>test email</strong> sent using Brevo HTTP API.</p>'
      },
      {
        headers: {
          'api-key': API_KEY,
          'Content-Type': 'application/json',
          'accept': 'application/json'
        }
      }
    )

    console.log("✅ Email sent successfully!")
    console.log("Brevo Message ID:", response.data.messageId)
  } catch (error) {
    console.error("❌ Failed to send email.")
    if (error.response) {
      console.error("Status:", error.response.status)
      console.error("Data:", error.response.data)
    } else {
      console.error(error)
    }
  }
}

sendEmail()