export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type MarketingConfig = {
  mainNav: MainNavItem[]
}

export type AdminConfig = {
  mainNav: MainNavItem[]
}
export type ImageProps = {
  fileId: string
  fileName: string
  fileUrl: string
}
