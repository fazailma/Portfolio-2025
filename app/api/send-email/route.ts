import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Validasi input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validasi API key
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Send email menggunakan Resend
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'fazaululilma@gmail.com',
      replyTo: email,
      subject: `New Message from ${name} - Portfolio Contact Form`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #000 0%, #333 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">📧 New Message Received</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <table style="width: 100%; margin-bottom: 20px;">
              <tr>
                <td style="color: #666; font-weight: bold; padding: 10px 0; border-bottom: 1px solid #ddd; width: 120px;">From:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #ddd;">${name}</td>
              </tr>
              <tr>
                <td style="color: #666; font-weight: bold; padding: 10px 0; border-bottom: 1px solid #ddd;">Email:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #ddd;">
                  <a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a>
                </td>
              </tr>
            </table>
            
            <div style="background: white; padding: 20px; border-radius: 5px; border-left: 4px solid #000;">
              <p style="color: #666; font-weight: bold; margin: 0 0 10px 0;">Message:</p>
              <p style="color: #333; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
            <p>This email was sent from your portfolio contact form</p>
          </div>
        </div>
      `,
    })

    if (data.error) {
      console.error('Resend error:', data.error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully! I will get back to you soon.' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
