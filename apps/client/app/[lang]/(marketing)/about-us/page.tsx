import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'

import Breadcrumbs from '@/components/Breadcrumbs'

interface AboutUsPageProps {
  params: { lang: Locale }
}

const AboutUsPage: React.FC<AboutUsPageProps> = async ({
  params: { lang },
}) => {
  const dict = await getDictionary(lang)
  const breadcrumbs = [{ title: dict['aboutUs'], isDisabled: true }]
  return (
    <>
      <Breadcrumbs items={breadcrumbs} dict={dict} lang={lang} />

      <section className="container pb-10">
        <h2 className="text-2xl text-center mb-4">{dict['aboutUs']}</h2>
        <table className="border w-full">
          <tbody>
            <tr className="border-b">
              <th className="w-[10rem] py-4 px-3 border-r">
                {dict['Company Name']}
              </th>
              <td className="py-4 px-3">Ykshoji</td>
            </tr>
            <tr className="border-b">
              <th className="w-[10rem] py-4 px-3 border-r">
                {dict['Address']}
              </th>
              <td className="py-4 px-3">栃木県, 617-1 Nishikuroda, Oyama, Tochigi 329-0203</td>
            </tr>
            <tr className="border-b">
              <th className="w-[10rem] py-4 px-3 border-r">{dict['TEL']}</th>
              <td className="py-4 px-3">+81285-39-7893</td>
            </tr>
            <tr className="border-b">
              <th className="w-[10rem] py-4 px-3 border-r">{dict['FAX']}</th>
              <td className="py-4 px-3">+81285-39-7893</td>
            </tr>
            <tr className="border-b">
              <th className="w-[10rem] py-4 px-3 border-r">
                {dict['Establishment']}
              </th>
              <td className="py-4 px-3">2014-06-17</td>
            </tr>
            <tr className="border-b">
              <th className="w-[10rem] py-4 px-3 border-r">
                {dict['Business details']}
              </th>
              <td className="py-4 px-3">Demo</td>
            </tr>
            <tr className="border-b">
              <th className="w-[10rem] py-4 px-3 border-r">
                {dict['Google maps']}
              </th>
              <td className="py-4 px-3 h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3216.4586967314303!2d139.78202078840695!3d36.276918625871915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601f4d2d0651cadd%3A0xb362e9cd384052a5!2sYK%20SHOJI!5e0!3m2!1sen!2s!4v1682490964953!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  className="col-span-2"
                ></iframe>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  )
}

export default AboutUsPage
