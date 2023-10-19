'use client'

import { useCallback, useState } from 'react'
import { Locale } from '@/i18n-config'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import localFetcher from '@/lib/localFetcher'
import { ContactSchema, contactSchema } from '@/lib/validations/contact'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { Icons } from './Icons'

interface ContactProps {
  dict: any
  lang: Locale
}

const Contact: React.FC<ContactProps> = ({ dict, lang }) => {
  const [isSaving, setIsSaving] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = useCallback(
    async (data: ContactSchema) => {
      try {
        setIsSaving(true)
        await localFetcher('/api/contact', {
          method: 'POST',
          body: JSON.stringify(data),
        })
        toast({
          title:
            dict[
              'Thank you for contacting us, we will respond as soon as possible'
            ],
        })
        reset()
      } catch (err) {
        console.error(err)
      } finally {
        setIsSaving(false)
      }
    },
    [reset, dict]
  )
  const breadcrumbs = [{ title: dict['contact'], isDisabled: true }]

  return (
    <>
      <Breadcrumbs items={breadcrumbs} dict={dict} lang={lang} />

      <section className="container pb-10">
        <h2 className="text-2xl text-center mb-4">{dict['contact']}</h2>
        <div className="grid grid-cols-3 gap-x-12 gap-y-12 md:gap-y-0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3216.4586967314303!2d139.78202078840695!3d36.276918625871915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601f4d2d0651cadd%3A0xb362e9cd384052a5!2sYK%20SHOJI!5e0!3m2!1sen!2s!4v1682490964953!5m2!1sen!2s"
            width="100%"
            height="100%"
            loading="lazy"
            className="md:col-span-2 col-span-3 md:h-full h-[25rem]"
          ></iframe>

          <form
            className="col-span-3 md:col-span-1"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Card>
              <CardHeader>
                <CardTitle>{dict['Contact us']}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="Name">{dict['Name']}</Label>
                  <Input
                    id="subject"
                    placeholder="Your name..."
                    {...register('name')}
                  />
                  {errors?.name && (
                    <p className="px-1 py-2 text-xs text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">{dict['Phone']}</Label>
                  <Input
                    id="subject"
                    placeholder="0123456789..."
                    {...register('phone')}
                  />
                  {errors?.phone && (
                    <p className="px-1 py-2 text-xs text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">{dict['Email']}</Label>
                  <Input
                    id="subject"
                    placeholder="ykshoji@jp..."
                    {...register('email')}
                  />
                  {errors?.email && (
                    <p className="px-1 py-2 text-xs text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">{dict['Message']}</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    {...register('message')}
                  />
                  {errors?.message && (
                    <p className="px-1 py-2 text-xs text-red-600">
                      {errors.message.message}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="justify-end space-x-2">
                <Button type="submit" disabled={isSaving}>
                  {isSaving && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {dict['Submit']}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </section>
    </>
  )
}

export default Contact
