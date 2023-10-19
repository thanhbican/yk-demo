import Image from 'next/image'
import Link from 'next/link'
import { Locale } from '@/i18n-config'
import Logo from '@/public/images/logo.png'

import ContactCard from './ContactCard'
import { Icons } from './Icons'
import { Button } from './ui/button'

interface SiteFooterProps {
  lang: Locale
}

const SiteFooter: React.FC<SiteFooterProps> = ({ lang }) => {
  return (
    <>
      <footer>
        <div className="container bg-blue md:translate-y-1/2">
          <ul className="grid md:grid-cols-3 gap-4">
            <ContactCard
              title="栃木県, 617-1 Nishikuroda, Oyama, Tochigi 329-0203"
              icon={Icons.location}
              href="https://goo.gl/maps/fuzwbCSMUKTcv5wH6"
              target="blank"
            />
            <ContactCard
              title="+81285-39-7893"
              icon={Icons.phone}
              href="tel:+81285-39-7893"
            />
            <ContactCard
              title="ykshoji@ykshoji.com"
              icon={Icons.email}
              href="mailto:ykshoji@ykshoji.com"
            />
          </ul>
        </div>
        <div className="bg-[#e7e8f4] pt-10 md:pt-24 pb-10">
          <div className="container flex flex-col-reverse items-center justify-center gap-4 md:flex-row ">
            <div className="flex flex-col items-center gap-2 text-center">
              <Link
                href={`/${lang}`}
                className="items-center space-x-2 md:flex md:flex-col"
              >
                <Image
                  width={78}
                  height={37}
                  src={Logo}
                  alt="YK"
                  className="m-auto"
                />
              </Link>
              <p className="font-bold text-lg">YK 商事株式会社</p>
              <p className="text-sm font-bold">
                &copy;Copyright 2023 YK 商事株式会社. All Right Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default SiteFooter
