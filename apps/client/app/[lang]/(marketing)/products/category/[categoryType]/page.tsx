import { notFound } from 'next/navigation'
import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'

import fetcher from '@/lib/fetcher'
import { CategorySchema } from '@/lib/validations/category'
import { ProductSchema } from '@/lib/validations/product'
import Breadcrumbs from '@/components/Breadcrumbs'
import Category from '@/components/Category'
import Filter from '@/components/Filter'
import Pagination from '@/components/Pagination'
import ProductItem from '@/components/ProductItem'
import ProductItemSmall from '@/components/ProductItemSmall'

const getCategory = async () => {
  try {
    const response = await fetcher('/api/categories', {
      cache: 'no-store',
    })
    return response
  } catch (err) {
    console.error(err)
    return null
  }
}
const getProductByCategory = async (type: string, params: any) => {
  try {
    const response = await fetcher(
      `/api/query/product/category/${type}?${params.toString()}`,
      {
        cache: 'no-store',
      }
    )
    return response
  } catch (err) {
    console.error(err)
    return null
  }
}

interface CategoryPageProps {
  params: {
    categoryType: string
    lang: Locale
  }
  searchParams: any
}
interface QueryProducts {
  totalPages: number
  products: ProductSchema[]
  totalProducts: number
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const type = params.categoryType
  const urlSearchParams = new URLSearchParams(searchParams)

  const dict = await getDictionary(params.lang)
  const [categories, queryProducts] = (await Promise.all([
    getCategory(),
    getProductByCategory(type, urlSearchParams),
  ])) as [CategorySchema[], QueryProducts]

  if (!categories || !queryProducts) {
    return notFound()
  }
  const { totalPages, products, totalProducts } = queryProducts
  // const searchValue = urlSearchParams.get('search')

  const breadcrumbs = [{ title: dict['products'], isDisabled: true }]
  return (
    <>
      <Breadcrumbs items={breadcrumbs} dict={dict} lang={params.lang} />
      <section className="container pb-10">
        <h2 className="text-2xl text-center mb-4">{dict['products']}</h2>
        <div className="flex gap-8 relative">
          <div className="md:w-[160px] lg:w-[260px] flex-shrink-0 hidden md:block">
            <Category
              currentType={type}
              categories={categories}
              dict={dict}
              lang={params.lang}
            />
          </div>
          <div className="flex-grow">
            {!!products.length && (
              <>
                <Filter
                  totalProducts={totalProducts}
                  categories={categories}
                  currentType={type}
                  dict={dict}
                  lang={params.lang}
                />
                <div className="gap-x-8 gap-y-8 hidden md:grid md:grid-cols-2 lg:grid-cols-3">
                  {products.map((product) => (
                    <ProductItemSmall
                      key={product.id}
                      product={product}
                      lang={params.lang}
                      dict={dict}
                    />
                  ))}
                </div>
                <div className="grid gap-x-8 gap-y-8 md:hidden sm:grid-cols-2">
                  {products.map((product) => (
                    <ProductItem
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
            {!!!products.length && (
              <h2 className="text-center">{dict['No data']}</h2>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default CategoryPage
