import React from 'react'
import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'

import Breadcrumbs from '@/components/Breadcrumbs'

interface ServicePageProps {
  params: { lang: Locale }
}

const ServicePage: React.FC<ServicePageProps> = async ({
  params: { lang },
}) => {
  const dict = await getDictionary(lang)
  const breadcrumbs = [{ title: dict['services'], isDisabled: true }]
  const services = [
    dict['ServiceDetail'],
    dict['ServiceDetail'],
    dict['ServiceDetail'],
  ]
  return (
    <>
      <Breadcrumbs items={breadcrumbs} dict={dict} lang={lang} />
      <section className="container pb-10">
        <h2 className="text-2xl text-center mb-4">{dict['services']}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <div key={index} className="border p-4 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
              <p className="mb-4">{service.description}</p>
              <h3 className="text-lg font-semibold mb-2">{dict['Price']}</h3>
              <ul>
                {service.pricing.map((item, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{item.type}</span>
                    <span>{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default ServicePage
