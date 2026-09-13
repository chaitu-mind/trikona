"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { capabilities } from "@/lib/content";

/* No backend. The form composes the enquiry and hands it to WhatsApp or the
   visitor's mail app, which works on any static host and cannot break. */
export default function EnquiryForm() {
  const [status, setStatus] = useState(
    "Your details open in WhatsApp or your mail app. Nothing is stored on this page."
  );

  function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const via = ((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement)?.value ?? "whatsapp";

    const name = String(d.get("name") ?? "").trim();
    const phone = String(d.get("phone") ?? "").trim();
    if (!name || !phone) {
      setStatus("Please add your name and a phone number so we can call you back.");
      return;
    }

    const body = [
      `Enquiry for ${site.name}`, "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Location: ${d.get("loc") || "not stated"}`,
      `Work: ${d.get("work")}`,
      `Plot / built-up area: ${d.get("size") || "not stated"}`,
      `Budget: ${d.get("budget") || "not stated"}`, "",
      String(d.get("msg") ?? ""),
    ].join("\n").trim();

    const url = via === "email"
      ? `mailto:${site.email}?subject=${encodeURIComponent(`Enquiry — ${d.get("work")}`)}&body=${encodeURIComponent(body)}`
      : `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(body)}`;

    window.open(url, "_blank", "noopener");
    setStatus(via === "email"
      ? "Your mail app should now be open with the enquiry filled in."
      : "WhatsApp should now be open with the enquiry filled in.");
  }

  return (
    <form className="form" onSubmit={send} noValidate>
      <div className="form__row">
        <div className="field">
          <label htmlFor="f-name">Your name</label>
          <input id="f-name" name="name" type="text" autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="f-phone">Phone</label>
          <input id="f-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required />
        </div>
      </div>
      <div className="form__row">
        <div className="field">
          <label htmlFor="f-work">Work required</label>
          <select id="f-work" name="work" defaultValue={capabilities[0].title}>
            {capabilities.map((c) => <option key={c.slug}>{c.title}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-loc">Plot location</label>
          <input id="f-loc" name="loc" type="text" placeholder="Area, district" />
        </div>
      </div>
      <div className="form__row">
        <div className="field">
          <label htmlFor="f-size">Plot or built-up area</label>
          <input id="f-size" name="size" type="text" placeholder="e.g. 200 sq.yd / 2,400 sq.ft" />
        </div>
        <div className="field">
          <label htmlFor="f-budget">Budget range</label>
          <input id="f-budget" name="budget" type="text" placeholder="e.g. ₹40–50 lakh" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="f-msg">Anything else</label>
        <textarea id="f-msg" name="msg"
          placeholder="Number of floors, timeline, Vaastu requirements, approvals already in hand…" />
      </div>
      <div className="form__actions">
        <button className="btn" type="submit" name="via" value="whatsapp">Send on WhatsApp</button>
        <button className="btn btn--ghost" type="submit" name="via" value="email">Send by email</button>
      </div>
      <p className="form__hint" role="status">{status}</p>
    </form>
  );
}
