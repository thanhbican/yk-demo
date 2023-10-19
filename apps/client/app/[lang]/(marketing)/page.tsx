import Image from 'next/image'
import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Keyvisual from '@/public/images/keyvisual.jpg'

import fetcher from '@/lib/fetcher'
import ContactCard from '@/components/ContactCard'
import { Icons } from '@/components/Icons'
import Products from '@/components/Products'
import Services from '@/components/Services'

const page = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dict = await getDictionary(lang)
  const getProducts = async () => {
    try {
      const response = await fetcher('/api/query/product/homePage', {
        cache: 'no-store',
      })
      return response
    } catch (err) {
      console.error(err)
      return null
    }
  }
  const { newestProducts, productsByCategory } = await getProducts()
  return (
    <>
      <section className="mb-10">
        <div className="xl:px-[4.375rem] lg:h-[800px] h-[22rem] relative">
          <Image
            src={Keyvisual}
            alt="Keyvisual"
            width={1780}
            className="object-cover h-full mx-auto relative"
          />
          <h2 className="absolute text-white font-bold top-[4rem] lg:top-[150px] left-[10%] lg:left-[calc(calc(100%-1780px)/2+400px)] text-2xl md:text-4xl lg:text-7xl leading-tight">
            COMMITTED TO
            <br /> SUPERIOR <br />
            <span className="text-blue">QUALITY</span> AND
            <br />
            <span className="text-blue">RESULTS</span>
          </h2>
        </div>
      </section>
      <section className="container mb-10">
        <h2 className="text-center text-2xl md:text-3xl mb-4">
          OUR <span className="text-blue font-bold">PRODUCTS</span>
        </h2>
        {!!newestProducts.length && (
          <Products
            title="Newest product"
            href={`/${lang}/products/category/all`}
            products={newestProducts}
            dict={dict}
            lang={lang}
          />
        )}
        {productsByCategory.map(
          (category: any) =>
            !!category.products.length && (
              <Products
                key={category.id}
                title={category.type}
                href={`/${lang}/products/category/${encodeURIComponent(
                  category.slug!
                )}`}
                products={category.products}
                dict={dict}
                lang={lang}
              />
            )
        )}
      </section>
      <Services />
    </>
  )
}

export default page
