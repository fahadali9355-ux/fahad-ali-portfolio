import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    // Initialize Resend with API key from environment variable
    const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');
    
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Update with a verified domain in production if available
      to: [process.env.RESEND_TO_EMAIL as string || 'fahadali9355@gmail.com'], // Send to yourself
      subject: `New Portfolio Message from ${name} | fahadali.dev`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
