import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { role, fullName, email, ...otherData } = data;

    // 1. Initialize Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 2. Build the dynamic data table for the Internal Admin Email
    let customRows = "";
    for (const [key, value] of Object.entries(otherData)) {
      customRows += `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 11px; text-transform: uppercase;">${key.replace(/([A-Z])/g, ' $1')}</td>
          <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; font-size: 12px; font-weight: bold;">${value}</td>
        </tr>`;
    }

    // --- MAIL A: INTERNAL LOG (Sent to aviore.careers@gmail.com) ---
    const adminMailOptions = {
      from: `"AVIORÈ" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `[LOG] ${role?.toUpperCase()}_APPLICATION: ${fullName?.toUpperCase()}`,
      html: `
        <div style="font-family: 'Helvetica', sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 40px;">
          <h2 style="letter-spacing: -1px; text-transform: uppercase; font-style: italic; border-bottom: 2px solid #000; padding-bottom: 10px;">Internal_Manifest_Entry</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr><td style="padding: 12px; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 11px;">SECTOR</td><td style="padding: 12px; border-bottom: 1px solid #f0f0f0; font-size: 12px; font-weight: bold; color: blue;">${role}</td></tr>
            <tr><td style="padding: 12px; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 11px;">NAME</td><td style="padding: 12px; border-bottom: 1px solid #f0f0f0; font-size: 12px; font-weight: bold;">${fullName}</td></tr>
            <tr><td style="padding: 12px; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 11px;">EMAIL</td><td style="padding: 12px; border-bottom: 1px solid #f0f0f0; font-size: 12px; font-weight: bold;">${email}</td></tr>
            ${customRows}
          </table>
          <p style="font-size: 9px; color: #ccc; margin-top: 40px; text-transform: uppercase; letter-spacing: 2px;">Automated_Archive_Entry // ${new Date().toISOString()}</p>
        </div>
      `,
    };

    // --- MAIL B: AUTOMATED RECEIPT (Sent to the Applicant) ---
    const applicantMailOptions = {
      from: `"AVIORÈ" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `RECEIPT: Application Manifest Received`,
      html: `
        <div style="font-family: 'Helvetica', sans-serif; max-width: 600px; margin: auto; padding: 50px; background-color: #f9f9f9; border: 1px solid #ddd;">
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="font-size: 24px; font-style: italic; text-transform: uppercase; letter-spacing: 5px; margin: 0;">AVIORÈ</h1>
            <p style="font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: 3px; margin-top: 5px;">Design & Manufacturing Archive</p>
          </div>
          
          <div style="background-color: #fff; padding: 30px; border: 1px solid #eee;">
            <p style="font-size: 13px; line-height: 1.6; color: #333;">
              Hello <b>${fullName}</b>,<br/><br/>
              This email confirms that your <b>${role}</b> manifest has been successfully transmitted to our External Relations department. 
              <br/><br/>
              Our team reviews partnerships and career applications on a rolling basis. If your profile aligns with our current production cycle or creative direction, a representative will reach out to you via this email channel or WhatsApp.
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 11px; color: #777; text-transform: uppercase; letter-spacing: 1px;">
              <b>Status:</b> Pending Review<br/>
              <b>Sector:</b> ${role}<br/>
              <b>Reference:</b> AVR-${Math.floor(Math.random() * 1000000)}
            </div>
          </div>

          <div style="text-align: center; margin-top: 40px; font-size: 9px; color: #bbb; text-transform: uppercase; letter-spacing: 2px;">
            Lagos, Nigeria // Global Logistics Hub
          </div>
        </div>
      `,
    };

    // 3. Execute both transmissions
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(applicantMailOptions)
    ]);

    return NextResponse.json({ success: true });

  } catch (err: any) {
     console.error("TRANSMISSION_ERROR:",err.message);
     "server error"
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}