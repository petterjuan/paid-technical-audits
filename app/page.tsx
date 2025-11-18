"use client";

import React, { useEffect } from "react";
import { initObservability, trackEvent } from "../lib/observability";

const calendlyUrl = "https://calendly.com/petter2025us/30min";

export default function Page(): JSX.Element {
  useEffect(() => {
    void initObservability();
    try {
      trackEvent("page_view", { page: "audit_landing" });
    } catch (_) {
      // ignore
    }
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
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <section className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-md">
        <header className="mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-900 text-white rounded-md flex items-center justify-center font-bold">L</div>
            <h1 className="text-2xl font-extrabold">LGCY Labs</h1>
          </div>
          <p className="mt-3 text-gray-600">
            Build reliable AI systems that reduce toil and increase revenue.
            Agentic reliability, production-grade infra, and developer-friendly APIs.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold">90-minute AI & Frontend Audit</h2>
            <p className="mt-2 text-gray-600">
              Fast technical assessment that finds revenue leaks, developer friction,
              and outages you can fix this week. Includes prioritized fixes and a 1-week execution plan.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li>• Architecture health check</li>
              <li>• Developer experience audit and SDK review</li>
              <li>• Reliability and observability quick wins</li>
              <li>• Delivery plan with costs and timeline</li>
            </ul>
          </div>

          <aside className="flex flex-col justify-center gap-4">
            <div className="bg-blue-50 p-4 rounded">
              <div className="text-xs uppercase text-blue-700 font-semibold">Offer</div>
              <div className="mt-1 font-bold text-lg">$3,500 AI Funnel Audit</div>
              <div className="text-sm text-gray-700 mt-2">Recover 15 to 30 percent of lost revenue with a targeted funnel and infra audit.</div>
            </div>

            <button
              onClick={handleBookClick}
              className="block w-full text-center bg-blue-900 text-white py-3 rounded-md font-semibold"
            >
              Book Audit
            </button>
          </aside>
        </div>

        <footer className="mt-6 text-xs text-gray-500">
          <span>Built by Juan Petter. Reliable AI that moves product to production.</span>
        </footer>
        <div id="book" className="mt-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-sm text-gray-600 mb-2">Or book directly on Calendly:</div>
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
          </div>
        </div>
      </section>
    </main>
  );
}
