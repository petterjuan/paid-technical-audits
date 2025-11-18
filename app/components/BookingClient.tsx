"use client";

import React, { useEffect, useState, useRef } from "react";
import { initObservability, trackEvent } from "../../lib/observability";

const calendlyBase = "https://calendly.com/petter2025us/30min";

type Intake = {
  projectName?: string;
  contact?: string;
  github?: string;
  metric?: string;
};

export default function BookingClient(): JSX.Element {
  const [greeting, setGreeting] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [intake, setIntake] = useState<Intake>({});
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const iframeTimeout = useRef<number | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    void initObservability();

    // Prefill from localStorage
    try {
      const raw = localStorage.getItem('audit_intake');
      if (raw) setIntake(JSON.parse(raw));
    } catch (_) {}

    // personalization
    void (async () => {
      try {
        const res = await fetch('/api/personalize');
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.greeting) setGreeting(data.greeting);
      } catch (_) {}
    })();
  }, []);

  useEffect(() => {
    if (showForm && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [showForm]);

  function openCalendlyWithPrefill(intakeData: Intake) {
    const params = new URLSearchParams();
    if (intakeData.contact) params.set('email', intakeData.contact);
    if (intakeData.projectName) params.set('name', intakeData.projectName);
    if (intakeData.github) params.set('a1', intakeData.github);
    if (intakeData.metric) params.set('a2', intakeData.metric);

    const url = `${calendlyBase}?${params.toString()}`;

    try {
      trackEvent('book_cta_click', { url, intake: { ...intakeData } });
    } catch (_) {}

    try {
      localStorage.setItem('audit_intake', JSON.stringify(intakeData));
    } catch (_) {}

    void fetch('/api/intake', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...intakeData, source: 'landing' }),
    }).catch(() => {});

    window.open(url, '_blank', 'noopener');
  }

  function handleOpenForm() {
    setShowForm(true);
  }

  function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    openCalendlyWithPrefill(intake);
    setShowForm(false);
  }

  function handleIframeLoad() {
    setIframeLoaded(true);
    if (iframeTimeout.current) window.clearTimeout(iframeTimeout.current);
  }

  function startIframeTimeout() {
    setIframeLoaded(false);
    setIframeError(false);
    if (iframeTimeout.current) window.clearTimeout(iframeTimeout.current);
    iframeTimeout.current = window.setTimeout(() => {
      if (!iframeLoaded) setIframeError(true);
    }, 5000);
  }

  return (
    <aside className="flex flex-col justify-center gap-4">
      <div className="bg-blue-50 p-4 rounded">
        <div className="text-xs uppercase text-blue-700 font-semibold">Offer</div>
        <div className="mt-1 font-bold text-lg">$3,500 AI Funnel Audit</div>
        <div className="text-sm text-gray-700 mt-2">Recover 15 to 30 percent of lost revenue with a targeted funnel and infra audit.</div>
      </div>

      <button
        onClick={handleOpenForm}
        className="block w-full text-center bg-blue-900 text-white py-3 rounded-md font-semibold"
        aria-haspopup="dialog"
      >
        Book Audit
      </button>

      {greeting ? <div className="text-sm font-medium text-gray-800">{greeting} Ready to book?</div> : null}

      <div className="mt-6 text-sm text-gray-600">Or view booking options:</div>
      <div className="w-full h-[700px] rounded overflow-hidden border relative">
        {!iframeLoaded && !iframeError && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70">Loading booking widget…</div>
        )}
        {iframeError && (
          <div className="p-4 text-sm text-red-600">
            The booking widget failed to load — you can <a className="underline" href={calendlyBase} target="_blank" rel="noopener noreferrer">open Calendly in a new tab</a> or <a className="underline" href="mailto:hello@petter.example">email us</a> to schedule.
          </div>
        )}

        <iframe
          src={`${calendlyBase}?embed_domain=paid-technical-audits&embed_type=Inline`}
          title="Book a 30-minute audit"
          width="100%"
          height="700"
          frameBorder="0"
          loading="lazy"
          onLoad={() => handleIframeLoad()}
          onError={() => setIframeError(true)}
          ref={(el) => {
            if (el) startIframeTimeout();
          }}
        />
      </div>

      {showForm && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowForm(false)} />
          <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-md bg-white rounded p-6 shadow-lg">
            <h3 className="text-lg font-semibold">Quick intake</h3>
            <p className="text-sm text-gray-600">Fill a few details to prefill your booking and help us prepare.</p>

            <label className="block mt-4 text-sm">
              <span className="text-gray-700">Project name</span>
              <input
                ref={firstInputRef}
                className="mt-1 block w-full border rounded px-3 py-2"
                value={intake.projectName ?? ''}
                onChange={(e) => setIntake((s) => ({ ...s, projectName: e.target.value }))}
                aria-label="Project name"
              />
            </label>

            <label className="block mt-3 text-sm">
              <span className="text-gray-700">Contact email</span>
              <input
                className="mt-1 block w-full border rounded px-3 py-2"
                value={intake.contact ?? ''}
                onChange={(e) => setIntake((s) => ({ ...s, contact: e.target.value }))}
                aria-label="Contact email"
                type="email"
              />
            </label>

            <label className="block mt-3 text-sm">
              <span className="text-gray-700">GitHub repo (optional)</span>
              <input
                className="mt-1 block w-full border rounded px-3 py-2"
                value={intake.github ?? ''}
                onChange={(e) => setIntake((s) => ({ ...s, github: e.target.value }))}
                aria-label="GitHub repository"
              />
            </label>

            <label className="block mt-3 text-sm">
              <span className="text-gray-700">Business metric to protect</span>
              <input
                className="mt-1 block w-full border rounded px-3 py-2"
                value={intake.metric ?? ''}
                onChange={(e) => setIntake((s) => ({ ...s, metric: e.target.value }))}
                aria-label="Business metric to protect"
              />
            </label>

            <div className="mt-4 flex gap-3">
              <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded">Continue to Calendly</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded border">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </aside>
  );
}
