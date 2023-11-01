import React from 'react'
import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'

import Breadcrumbs from '@/components/Breadcrumbs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface FaqPageProps {
  params: { lang: Locale }
}

const FaqPage: React.FC<FaqPageProps> = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang)
  const breadcrumbs = [{ title: dict['FAQ'], isDisabled: true }]
  const items = dict['FAQDetail']

  return (
    <>
      <Breadcrumbs items={breadcrumbs} dict={dict} lang={lang} />

      <section className="container pb-10">
        <h2 className="text-2xl text-center mb-4">{dict['FAQ']}</h2>
        <Accordion type="multiple" className="w-full">
          {items.map((item, index) => (
            <AccordionItem key={index} value={index + ''}>
              <AccordionTrigger className="text-left">
                {item.title}
              </AccordionTrigger>
              <AccordionContent>{item.description}</AccordionContent>
            </AccordionItem>
          ))}
          {/* <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              Có bao nhiêu loại xe tải hiện có?
            </AccordionTrigger>
            <AccordionContent>
              Có nhiều loại xe tải khác nhau, bao gồm xe tải nhẹ, xe tải trung
              bình và xe tải nặng.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">
              Xe tải nhẹ thích hợp cho những công việc nào?
            </AccordionTrigger>
            <AccordionContent>
              Xe tải nhẹ thường được sử dụng cho việc vận chuyển hàng hóa trong
              thành phố, giao hàng tại các khu vực hẹp, hay cho các công việc
              vận chuyển hàng hóa nhẹ.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">
              Xe tải có độ bền như thế nào?
            </AccordionTrigger>
            <AccordionContent>
              Xe tải được thiết kế để chịu tải trọng và điều kiện vận hành khắc
              nghiệt. Tuy nhiên, việc duy trì và bảo dưỡng định kỳ là rất quan
              trọng để đảm bảo độ bền và tuổi thọ của xe.
            </AccordionContent>
          </AccordionItem> */}
        </Accordion>
      </section>
    </>
  )
}

export default FaqPage
