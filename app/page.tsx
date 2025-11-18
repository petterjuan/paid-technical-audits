import BookingClient from "./components/BookingClient";

// Use a short ISR window so changes (pricing, messaging) appear quickly
// while still benefiting from CDN caching. Set to 300s (5 minutes).
export const revalidate = 300;

export default function Page(): JSX.Element {
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

          <BookingClient />
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
