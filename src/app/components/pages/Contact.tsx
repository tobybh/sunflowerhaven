import { useState } from "react";
import { Mail, MapPin, Clock, AlertCircle, Facebook, CheckCircle2, Loader2 } from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqeozlqe";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      const payload = await res.json().catch(() => null);
      const message =
        payload?.errors?.map((err: { message: string }) => err.message).join(" ") ??
        "Something went wrong sending your message. Please try again or email us directly.";
      setErrorMessage(message);
      setStatus("error");
    } catch {
      setErrorMessage(
        "We couldn't reach the server. Check your connection and try again, or email us directly.",
      );
      setStatus("error");
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-green-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl mb-6">Contact Us</h1>
          <p className="text-xl text-green-100">
            We're here to help. Reach out for support, information, or to get involved.
          </p>
        </div>
      </section>

      {/* Emergency Notice */}
      <section className="bg-red-50 border-l-4 border-red-600 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg mb-2">In Immediate Danger?</h3>
              <p className="text-gray-700 mb-3">
                If you or someone you know is in immediate danger, please call 911 or the
                National Domestic Violence Hotline.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:911"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition-colors"
                >
                  Call 911
                </a>
                <a
                  href="tel:18007997233"
                  className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded transition-colors"
                >
                  National Hotline: 1-800-799-7233
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Contact Details */}
            <div>
              <h2 className="text-2xl mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-green-800" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:SunflowerHavenIndiana@gmail.com" className="text-green-700 hover:underline">
                      SunflowerHavenIndiana@gmail.com
                    </a>
                    <p className="text-sm text-gray-600 mt-1">
                      General inquiries and information
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <Facebook className="w-6 h-6 text-yellow-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Facebook</h3>
                    <a
                      href="https://www.facebook.com/profile.php?id=61590802640301"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 hover:underline"
                    >
                      Follow us on Facebook
                    </a>
                    <p className="text-sm text-gray-600 mt-1">
                      Stay updated on our work and events
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-green-800" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-gray-700">
                      Chesterton, IN 46304<br />
                      United States
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      *Residential location is confidential for safety
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mt-8">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-yellow-900 mb-1">Privacy Note</p>
                    <p className="text-yellow-800">
                      For the safety of our residents, our housing location is confidential.
                      If you need emergency housing, please email us or call the National Hotline at 1-800-799-7233.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl mb-6">Send Us a Message</h2>

              {status === "success" ? (
                <div className="rounded-2xl border border-[#cfe1d1] bg-[#e8efe9] p-6 flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#4a6a52] shrink-0 mt-0.5" />
                  <div>
                    <div
                      className="text-lg text-[#2c3a30]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Thanks — we received your message.
                    </div>
                    <p className="text-sm text-[#4a6a52] mt-1">
                      Someone from Sunflower Haven will reply within 1–2 business days.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="text-xs uppercase tracking-wider text-[#4a6a52] hover:text-[#2c3a30] mt-3 underline"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                  <div>
                    <label htmlFor="contact-name" className="block text-sm mb-2">Name</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm mb-2">Email</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm mb-2">Phone (optional)</label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="block text-sm mb-2">Subject</label>
                    <select
                      id="contact-subject"
                      name="subject"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                      defaultValue="General Inquiry"
                    >
                      <option>General Inquiry</option>
                      <option>Donation Questions</option>
                      <option>Mailing Address Request</option>
                      <option>Partnership/Collaboration</option>
                      <option>Media Request</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm mb-2">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 h-32 resize-none"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  {/* Honeypot — bots fill hidden fields, humans don't */}
                  <input
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ display: "none" }}
                  />

                  {status === "error" && errorMessage && (
                    <div className="flex items-start gap-2 text-sm text-[#8a2929] bg-[#fbe8e8] border border-[#f0c5c5] rounded-lg p-3">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full bg-green-700 hover:bg-green-800 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                  <p className="text-xs text-gray-600">
                    We typically respond within 1–2 business days.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Additional Resources */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl mb-6">How You Can Help</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Donations</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Questions about making a donation? We're here to help.
                </p>
                <a href="mailto:SunflowerHavenIndiana@gmail.com" className="text-green-700 hover:underline text-sm">
                  Contact us about giving
                </a>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Spread Awareness</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Help us reach more people by sharing our mission on social media.
                </p>
                <a
                  href="https://www.facebook.com/profile.php?id=61590802640301"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 hover:underline text-sm"
                >
                  Follow us on Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
