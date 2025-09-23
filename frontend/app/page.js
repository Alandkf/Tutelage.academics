'use client'

import Image from 'next/image'

const Home = () => {
  return (
    <div className="relative w-full aspect-[16/7] min-h-[300px] h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[100vh]">
      <Image
        src="/land-one.png"
        alt="Landing Hero"
        fill
        priority
        className="object-cover object-center w-full h-full"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
      />
      {/* ...future hero content can go here... */}
    </div>
  )
}

export default Home