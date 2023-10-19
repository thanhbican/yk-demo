'use client'

import { signOut } from 'next-auth/react'

import { Button } from './ui/button'

const Logout = () => {
  return <Button onClick={() => signOut()}>Log out</Button>
}

export default Logout
