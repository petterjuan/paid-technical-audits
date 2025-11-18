export const metadata = {
  title: 'Paid Technical Audits',
  description: '90-minute AI Reliability Audit — landing page',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        {children}
      </body>
    </html>
  );
}
