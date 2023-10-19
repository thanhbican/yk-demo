import React from 'react'

interface LoginPageProps {
  children: React.ReactNode
}

const LoginPage = async ({ children }: LoginPageProps) => {
  return <div className="container">{children}</div>
}

export default LoginPage
