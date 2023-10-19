import { SiteConfig } from '@/types'

export const siteConfig: SiteConfig = {
  name: 'YK',
  description: 'YK 商事株式会社',
  url: process.env['NEXTAUTH_URL']!,
  ogImage: `${process.env['NEXTAUTH_URL']}/og.jpg`,
  links: {
    twitter: '',
    github: '',
  },
}
