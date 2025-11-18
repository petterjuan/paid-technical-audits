"use client";

import React, { useEffect, useState } from "react";
import { initObservability, trackEvent } from "../../lib/observability";

const calendlyUrl = "https://calendly.com/petter2025us/30min";

export default function BookingClient(): JSX.Element {
  const [greeting, setGreeting] = useState<string | null>(null);

  useEffect(() => {
    void initObservability();

    // Fetch lightweight personalization from the edge endpoint.
    void (async () => {
      try {
        const res = await fetch('/api/personalize');
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.greeting) setGreeting(data.greeting);
      } catch (_) {
        // ignore
      }
    })();
  }, []);

  function handleBookClick() {
    try {
      trackEvent("book_cta_click", { url: calendlyUrl });
    } catch (_) {
      // ignore
    }
    window.open(calendlyUrl, "_blank", "noopener");
  }

  return (
    <aside className="flex flex-col justify-center gap-4">
      <div className="bg-blue-50 p-4 rounded">
        <div className="text-xs uppercase text-blue-700 font-semibold">Offer</div>
        <div className="mt-1 font-bold text-lg">$3,500 AI Funnel Audit</div>
        <div className="text-sm text-gray-700 mt-2">Recover 15 to 30 percent of lost revenue with a targeted funnel and infra audit.</div>
      </div>

      {greeting ? <div className="text-sm font-medium text-gray-800">{greeting} Ready to book?</div> : null}

      <button
        onClick={handleBookClick}
        className="block w-full text-center bg-blue-900 text-white py-3 rounded-md font-semibold"
      >
        Book Audit
      </button>

      <div className="mt-6 text-sm text-gray-600">Or book directly on Calendly:</div>
      <div className="w-full h-[700px] rounded overflow-hidden border">
        <iframe
          src="https://calendly.com/petter2025us/30min?embed_domain=paid-technical-audits&embed_type=Inline"
          title="Book a 30-minute audit"
          width="100%"
          height="700"
          frameBorder="0"
          loading="lazy"
        />
      </div>
    </aside>
  );
}
