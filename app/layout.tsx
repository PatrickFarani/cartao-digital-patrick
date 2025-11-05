
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'https://cartao-patrick.vercel.app'),
  title: 'Patrick Farani - Dev LLM | Cartão Digital',
  description: 'Cartão de visita digital de Patrick de Campos Farani, Dev LLM na Valid Certificadora',
  keywords: ['Patrick Farani', 'Dev LLM', 'Valid Certificadora', 'cartão digital'],
  authors: [{ name: 'Patrick de Campos Farani' }],
  creator: 'Patrick de Campos Farani',
  publisher: 'Valid Certificadora',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Patrick Farani - Dev LLM | Cartão Digital',
    description: 'Cartão de visita digital de Patrick de Campos Farani, Dev LLM na Valid Certificadora',
    url: '/',
    siteName: 'Patrick Farani - Cartão Digital',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Patrick Farani - Dev LLM',
      },
    ],
    locale: 'pt_BR',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Patrick Farani - Dev LLM | Cartão Digital',
    description: 'Cartão de visita digital de Patrick de Campos Farani, Dev LLM na Valid Certificadora',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
