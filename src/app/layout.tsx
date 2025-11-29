import './globals.css'
import React from 'react'
import { Metadata, Viewport } from 'next'
import { Montserrat, Inconsolata } from 'next/font/google'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Providers } from './providers'
import ServiceWorkerRegister from '../components/ServiceWorkerRegister'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const inconsolata = Inconsolata({
  subsets: ['latin'],
  variable: '--font-inconsolata',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Family Recipes',
  description: 'A simple family recipes app',
}

export const viewport: Viewport = {
  themeColor: '#645cff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inconsolata.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col justify-between bg-white dark:bg-zinc-900 dark:text-white">
        <Providers>
          <ServiceWorkerRegister />
          <Navbar />
          <main className="grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
