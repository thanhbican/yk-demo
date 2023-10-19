import '@/styles/globals.css'
import { Inter as FontSans } from 'next/font/google'

import { siteConfig } from '@/config/site'
import { absoluteUrl, cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import { Locale, i18n } from '../../i18n-config'

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  metadataBase: siteConfig.url,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'ykshoji',
    'Next.js',
    'React',
    'Tailwind CSS',
    'Server Components',
  ],
  authors: [
    {
      name: 'S4mD',
      url: process.env['NEXTAUTH_URL'],
    },
  ],
  creator: 'S4mD',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: absoluteUrl('/og.jpg'),
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: '@S4mD',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

interface RootLayoutProps {
  children: React.ReactNode
  params: { lang: Locale }
}

// export async function generateStaticParams() {
//   return i18n.locales.map((locale) => ({ lang: locale }))
// }

const RootLayout: React.FC<RootLayoutProps> = ({ children, params }) => {
  return (
    <html lang={params.lang}>
      <head />
      <body
        className={cn(
          'min-h-scree bg-white font-sans text-slate-900 antialiased break-words',
          fontSans.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}

export default RootLayout
