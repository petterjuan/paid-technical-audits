export default function Head() {
  return (
    <>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="description" content="90-minute AI & Frontend Audit — fast technical assessment to recover lost revenue and improve reliability." />
      {/* Preconnects for fonts and third-party booking host */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://calendly.com" />
      <link rel="preconnect" href="https://assets.calendly.com" />
      {/* Consider adding font preload if hosting custom fonts */}
    </>
  );
}
