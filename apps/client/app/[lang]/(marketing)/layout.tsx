import { Locale } from '@/i18n-config'

import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'

interface MarketingLayoutProps {
  children: React.ReactNode
  params: { lang: Locale }
}

const MarketingLayout: React.FC<MarketingLayoutProps> = ({
  children,
  params: { lang },
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader lang={lang} />
      <main className="flex-1">{children}</main>
      <SiteFooter lang={lang} />
    </div>
  )
}

export default MarketingLayout
