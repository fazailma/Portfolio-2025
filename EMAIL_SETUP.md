// SETUP EMAIL INTEGRATION - PILIH SALAH SATU

// ===== OPTION 1: RESEND (Recommended) =====
// 1. Install: npm install resend
// 2. Get API key dari: https://resend.com/dashboard
// 3. Add ke .env.local: RESEND_API_KEY=your_key_here
// 4. Replace /app/api/send-email/route.ts dengan code di bawah:

/*
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'fazaululilma@gmail.com',
      subject: `New Message from ${name}`,
      html: `
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email,
    })

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
*/

// ===== OPTION 2: EMAILJS (Client-side, no backend needed) =====
// 1. Install: npm install @emailjs/browser
// 2. Sign up di: https://www.emailjs.com/
// 3. Get: Service ID, Template ID, Public Key
// 4. Update contact-section.tsx dengan EmailJS

// ===== OPTION 3: Gmail + Nodemailer =====
// 1. Install: npm install nodemailer
// 2. Setup Gmail App Password
// 3. Add ke .env.local credentials

// Untuk now, form sudah functional dengan mock response
// Pilih salah satu option di atas untuk production
