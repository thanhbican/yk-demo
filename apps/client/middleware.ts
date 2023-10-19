import { NextResponse, type NextRequest } from 'next/server'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'

import { i18n } from './i18n-config'

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  return matchLocale(languages, locales, i18n.defaultLocale)
}

export default withAuth(
  async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname

    const token = await getToken({ req })
    const isAuth = !!token

    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) =>
        !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    // Redirect if there is no locale
    const locale = getLocale(req)
    if (pathnameIsMissingLocale) {
      // e.g. incoming request is /products
      // The new URL is now /en-US/products
      return NextResponse.redirect(new URL(`/${locale}/${pathname}`, req.url))
    }

    const isLoginPage = pathname.startsWith(`/${locale}/login`)
    const isAdminPage = pathname.startsWith(`/${locale}/admin`)
    if (isLoginPage) {
      if (isAuth) {
        return NextResponse.redirect(
          new URL(`/${locale}/admin/products`, req.url)
        )
      } else {
        return null
      }
    }
    if (isAdminPage) {
      if (!isAuth) {
        return NextResponse.redirect(new URL(`/${locale}/login`, req.url))
      }
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true
      },
    },
  }
)

// export const config = {
//   matcher: ['/admin/:path*', '/login'],
// }
export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  // matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  matcher:
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|og.jpg|favicon-32x32.png|site.webmanifest|android-chrome-192x192.png|favicon-16x16.png|android-chrome-512x512.png|apple-touch-icon.png|images/).*)',
}
