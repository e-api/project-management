import React from 'react'
import type { Route } from '../../+types/root'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'

export function meta({}: Route.MetaArgs){
    return [
        {title: "Taskhub"},
        {name: "description", content: "welcome to taskhub"},
    ]
}

const Homepage = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center gap-4'>
      <Link to="/sign-in">
        <Button className='bg-blue-500'>Login</Button>
      </Link>
      <Link to="/sign-up">
        <Button className='bg-blue-500'>Sign Up</Button>
      </Link>
    </div>
  )
}

export default Homepage