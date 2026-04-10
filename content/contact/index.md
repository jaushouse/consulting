---
title: "Get In Touch"
subtitle: "We'd love to hear about your business and what's not working."
description: "Book a free discovery call or send us a message. We'll get back to you within one business day."
layout: "single"
---

## Book a Discovery Call

The fastest way to get started. It's a free, no-pressure 30-minute conversation — we'll ask about your business, your tools, and where things are slowing you down. If we can help, we'll tell you how. If not, we'll say that too.

<a href="https://cal.com/jaushouse/discovery" class="btn btn-primary" target="_blank" rel="noopener">Book a Call</a>

<!-- Replace the button above with Cal.com inline embed once set up:
<div id="cal-embed" style="min-height:600px;"></div>
<script type="text/javascript">
(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
Cal("init", {origin:"https://cal.com"});
Cal("inline", {elementOrSelector:"#cal-embed", calLink:"jaushouse/discovery"});
Cal("ui", {theme:"dark",styles:{branding:{brandColor:"#3ddc84"}}});
</script>
-->

## Send Us a Message

Not ready for a call? No problem. Tell us a little about your business and what you're dealing with — we'll get back to you within one business day.

<form class="contact-form" action="/api/contact" method="POST">
  <div class="form-row">
    <div class="form-field">
      <label for="name">Your Name</label>
      <input type="text" id="name" name="name" required>
    </div>
    <div class="form-field">
      <label for="business">Business Name</label>
      <input type="text" id="business" name="business">
    </div>
  </div>
  <label for="email">Email</label>
  <input type="email" id="email" name="email" required>
  <!-- Honeypot — hidden from real users, bots will fill it in -->
  <div style="position:absolute;left:-9999px" aria-hidden="true">
    <label for="website">Website</label>
    <input type="text" id="website" name="website" tabindex="-1" autocomplete="off">
  </div>
  <label for="message">What's slowing your business down?</label>
  <textarea id="message" name="message" required></textarea>
  {{ with .Site.Params.turnstileSiteKey }}
  <div class="cf-turnstile" data-sitekey="{{ . }}" data-theme="dark"></div>
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
  {{ end }}
  <button type="submit" class="btn btn-primary">Send Message</button>
</form>
