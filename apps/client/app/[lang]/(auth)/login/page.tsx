import { Metadata } from 'next'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Icons } from '@/components/Icons'
import UserAuthForm from '@/components/form/UserAuthForm'
import { buttonVariants } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
}

export default function LoginPage() {
  return (
    <div className="container flex h-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-4 top-4 md:left-8 md:top-8'
        )}
      ></Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
          <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          <p className="text-sm text-muted-foreground">
            Enter your info to sign in to your account
          </p>
        </div>
        <UserAuthForm />
      </div>
    </div>
  )
}
