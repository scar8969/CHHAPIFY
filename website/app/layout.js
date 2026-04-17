import "./globals.css";

export const metadata = {
  title: "Chhapify — Extract Design Systems from Any Website",
  description: "Transform any website into a complete design system. Extract colors, typography, spacing, components, and more. Get 8 output formats including Tailwind config, CSS variables, and Figma tokens.",
  keywords: ["design system", "design tokens", "color extraction", "typography analysis", "tailwind config", "css variables", "figma tokens", "design analysis"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
