import Image from 'next/image'
import { redirect } from 'next/navigation'

import { authOptions } from '@/lib/auth'
import fetcher from '@/lib/fetcher'
import { getAccessToken } from '@/lib/session'
import { formatTimeJP } from '@/lib/utils'
import { ContactSchema } from '@/lib/validations/contact'

const getContact = async (token: string, contactId: string) => {
  try {
    const response = await fetcher(`/api/admin/contact/${contactId}`, {
      headers: {
        Authorization: token,
      },
      cache: 'no-store',
    })
    return response
  } catch (err) {
    console.error(err)
    return null
  }
}

const readContact = async (token: string, contactId: string) => {
  try {
    const response = await fetcher(`/api/admin/contact/${contactId}/read`, {
      method: 'PATCH',
      headers: {
        Authorization: token,
      },
    })
    return response
  } catch (err) {
    console.error(err)
    return null
  }
}

interface contactDetailPageProps {
  params: {
    contactId: string
  }
}

const contactDetailPage: React.FC<contactDetailPageProps> = async ({
  params,
}) => {
  const { contactId } = params
  const token = await getAccessToken()
  if (!token) {
    redirect(authOptions?.pages?.signIn || '/login')
  }
  const contact = (await getContact(token, contactId)) as ContactSchema

  if (!contact) {
    return null
  }
  await readContact(token, contactId)
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 mt-10 text-center">
        Contact Information
      </h2>
      <div className="mx-auto bg-white my-10">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">
            Customer (
            <span className="text-sm"> {formatTimeJP(contact.createdAt!)}</span>
            )
          </h2>
          <div className="px-4">
            <p className="text-gray-600">
              <span className="font-bold">Name:</span> {contact.name}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Email:</span> {contact.email}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Phone:</span> {contact.phone}
            </p>
            <p className="text-gray-600 whitespace-pre-line">
              <span className="font-bold">Message:</span> {contact.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default contactDetailPage
