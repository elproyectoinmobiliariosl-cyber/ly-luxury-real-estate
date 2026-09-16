// Root "/" route. Static export mode (see next.config.ts) means Next.js
// Proxy/Middleware never runs, so the locale redirect in proxy.ts and the
// public/_redirects rule are not guaranteed to be honored by every static
// host. This page guarantees a real index.html exists at the export root
// (Netlify flagged its absence) and redirects visitors to the default
// locale via an instant client-side redirect, with a meta-refresh and a
// visible link as fallbacks for no-JS / slow connections.
export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/en" />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace("/en");`,
        }}
      />
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#15130f",
          color: "#faf7f0",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <p
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          <a href="/en" style={{ color: "#c7a361" }}>
            Continue to LY Luxury Real Estate →
          </a>
        </p>
      </main>
    </>
  );
}
