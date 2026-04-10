export async function onRequestPost(context) {
  const { request, env } = context;

  const origin = request.headers.get("Origin") || "";
  const headers = {
    "Access-Control-Allow-Origin": origin,
    "Content-Type": "application/json",
  };

  try {
    const formData = await request.formData();
    const name = formData.get("name")?.trim();
    const business = formData.get("business")?.trim();
    const email = formData.get("email")?.trim();
    const message = formData.get("message")?.trim();

    // Honeypot — reject if the hidden field was filled in
    const honeypot = formData.get("website")?.trim();
    if (honeypot) {
      // Return success to avoid tipping off the bot
      return Response.redirect(new URL("/contact/thanks/", request.url), 303);
    }

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required." }),
        { status: 400, headers }
      );
    }

    // Turnstile verification (skip if secret key is not configured)
    if (env.TURNSTILE_SECRET_KEY) {
      const token = formData.get("cf-turnstile-response") || "";
      const ip = request.headers.get("CF-Connecting-IP") || "";

      const turnstileRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            secret: env.TURNSTILE_SECRET_KEY,
            response: token,
            remoteip: ip,
          }),
        }
      );
      const turnstileData = await turnstileRes.json();

      if (!turnstileData.success) {
        return new Response(
          JSON.stringify({ error: "Bot verification failed. Please try again." }),
          { status: 403, headers }
        );
      }
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "JausHouse Contact <noreply@mail.jaushouse.com>",
        to: ["brandon@jaushouse.com"],
        reply_to: email,
        subject: `New inquiry from ${name}${business ? ` (${business})` : ""}`,
        text: [
          `Name: ${name}`,
          business ? `Business: ${business}` : null,
          `Email: ${email}`,
          "",
          message,
        ]
          .filter(Boolean)
          .join("\n"),
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return new Response(
        JSON.stringify({ error: "Failed to send message. Please try again." }),
        { status: 500, headers }
      );
    }

    return Response.redirect(new URL("/contact/thanks/", request.url), 303);
  } catch (err) {
    console.error("Contact form error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500, headers }
    );
  }
}
