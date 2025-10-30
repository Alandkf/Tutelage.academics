'use client'

import Image from 'next/image'

const AboutUsHero = () => {
  return (
    <div className="relative w-full aspect-[16/7] min-h-[300px] h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[100vh]">
      <Image
        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80"
        alt="About Tutelage - Our Team"
        fill
        priority
        quality={100}
        className="object-cover object-center w-full h-full"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
      />
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 text-center mt-36">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow mb-4">
          About Us
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-white/80 font-normal max-w-5xl mx-auto mb-7">
          Welcome to Tutelage, your trusted partner in English language learning. We are dedicated to providing high-quality education and resources to help learners of all ages and levels achieve their language goals with experienced instructors and innovative teaching methods.
        </p>
      </div>
    </div>
  )
}

export default AboutUsHero
