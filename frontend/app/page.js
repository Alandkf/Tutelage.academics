'use client'

import { useAuth } from "@/components/AuthHook";




const Home = () => {
  useAuth();

  
  return (
    <div className=''>Home</div>
  )
}

export default Home