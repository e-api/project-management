import dotenv from 'dotenv'
import {
  TransactionalEmailsApi,
  SendSmtpEmail,
} from '@getbrevo/brevo'

dotenv.config()

const apiKey = process.env.BREVO_API_KEY
const fromEmail = process.env.FROM_EMAIL
const fromName = process.env.FROM_NAME || "TaskHub"

if (!apiKey || !fromEmail) {
  console.error("❌ Missing BREVO_API_KEY or FROM_EMAIL in .env")
  process.exit(1)
}

// Initialize API
const emailAPI = new TransactionalEmailsApi()
emailAPI.authentications.apiKey.apiKey = apiKey

// Exportable email function
export const sendEmail = async (to, subject, html) => {
  const message = new SendSmtpEmail()

  message.subject = subject
  message.htmlContent = html
  message.sender = { name: fromName, email: fromEmail }
  message.to = [{ email: to }]

  try {
    const response = await emailAPI.sendTransacEmail(message)
    console.log("✅ Email sent successfully:", response.body?.messageId || response.body)
    return true
  } catch (error) {
    console.error("❌ Failed to send email.")
    if (error.body) {
      console.error("Error Response:", error.body)
    } else {
      console.error(error)
    }
    return false
  }
}


// import sgMail from '@sendgrid/mail'
// import dotenv from 'dotenv'

// dotenv.config()

// // debug
// console.log("SENDGRID_API_KEY:", process.env.SENDGRID_API_KEY)

// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// const fromEmail = process.env.FROM_EMAIL

// export const sendEmail = async (to, subject, html) => {
//     const msg = {
//         to,
//         // from: `TaskHub <${fromEmail}>`,
//         from: fromEmail,
//         subject,
//         html
//     }
//     try {
//         console.log("Sending FROM:", fromEmail)
//         await sgMail.send(msg)
//         console.log("EMAIL SENT SUCCESSFULLY")
//         return true
//     } catch (error) {
//         console.error("ERROR SENDING EMAIL:", error)
//         return false
//     }
// }