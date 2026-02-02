import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const vazirFont = `
  @font-face {
    font-family: 'Vazirmatn';
    src: url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@latest/fonts/webfonts/Vazirmatn-Regular.woff2') format('woff2');
    font-weight: 400;
    font-display: swap;
  }
  @font-face {
    font-family: 'Vazirmatn';
    src: url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@latest/fonts/webfonts/Vazirmatn-Bold.woff2') format('woff2');
    font-weight: 700;
    font-display: swap;
  }
`;

export const metadata: Metadata = {
  title: 'Kellopet | پت شاپ آنلاین',
  description: 'فروشگاه آنلاین محصولات حیوانات خانگی - Kellopet',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <style>{vazirFont}</style>
      </head>
      <body className={`font-sans antialiased`} style={{ fontFamily: 'Vazirmatn, sans-serif' }}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
