import React from 'react'

import { Icons } from './Icons'

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Icons.spinner className="animate-spin text-6xl text-blue-500" />
    </div>
  )
}

export default Loader
