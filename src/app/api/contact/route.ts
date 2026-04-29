import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, brand, service, budget, message } = body;

    // Validation
    if (!name || !brand || !service || !budget || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (
      typeof name !== "string" ||
      typeof brand !== "string" ||
      typeof service !== "string" ||
      typeof budget !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid field types" },
        { status: 400 }
      );
    }

    // Rate limiting check (simple in-memory, resets on deploy)
    // For production, use Redis or similar

    // TODO: Connect Resend for email delivery
    // 1. Install: npm install resend
    // 2. Add RESEND_API_KEY to Hostinger environment variables
    // 3. Uncomment the code below:
    /*
    import { Resend } from "resend";
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: "Nepovoxel <hello@nepovoxel.com>",
      to: "hello@nepovoxel.com",
      subject: `New Project Inquiry from ${name} — ${brand}`,
      html: `
        <h2>New Project Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Brand:</strong> ${brand}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });
    */

    // For now, log to console and return success
    console.log("Contact form submission:", {
      name,
      brand,
      service,
      budget,
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: "Message received" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
