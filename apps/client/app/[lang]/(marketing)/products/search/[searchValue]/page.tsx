import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'

import fetcher from '@/lib/fetcher'
import { ProductSchema } from '@/lib/validations/product'
import Breadcrumbs from '@/components/Breadcrumbs'
import Filter from '@/components/Filter'
import Pagination from '@/components/Pagination'
import ProductItemSmall from '@/components/ProductItemSmall'
import Searching from '@/components/Searching'

const getProductBySearch = async (searchValue: string, params: any) => {
  try {
    let query = ''
    if (params.toString()) {
      query = `/api/query/product/search?searchValue=${searchValue}&${params.toString()}`
    } else {
      query = `/api/query/product/search?searchValue=${searchValue}`
    }

    const response = await fetcher(query, {
      cache: 'no-store',
    })
    return response
  } catch (err) {
    console.error(err)
    return null
  }
}

interface SearchPageProps {
  params: {
    searchValue: string
    lang: Locale
  }
  searchParams: any
}
interface QueryProducts {
  totalPages: number
  products: ProductSchema[]
  totalProducts: number
}

const SearchPage: React.FC<SearchPageProps> = async ({
  params,
  searchParams,
}) => {
  const dict = await getDictionary(params.lang)
  const searchValue = params.searchValue
  const urlSearchParams = new URLSearchParams(searchParams)

  const queryProducts = await getProductBySearch(searchValue, urlSearchParams)
  const { totalPages, products, totalProducts } = queryProducts as QueryProducts
  const breadcrumbs = [{ title: dict['products'], isDisabled: true }]
  return (
    <>
      <Breadcrumbs items={breadcrumbs} dict={dict} lang={params.lang} />
      <section className="container pb-10">
        <Searching searchValue={searchValue} dict={dict} />
        <div className="flex relative">
          <div className="flex-grow">
            {!!products?.length && (
              <>
                <Filter
                  totalProducts={totalProducts}
                  dict={dict}
                  lang={params.lang}
                />
                {/* <div className="flex flex-wrap gap-8 mb-10"> */}
                <div className="grid gap-x-8 gap-y-8 md:grid-cols-3">
                  {products.map((product) => (
                    <ProductItemSmall
                      key={product.id}
                      product={product}
                      lang={params.lang}
                      dict={dict}
                    />
                  ))}
                </div>
                <Pagination totalPages={totalPages} />
              </>
            )}
            {!!!products?.length && (
              <h2 className="text-center">{dict['No data']}</h2>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default SearchPage
