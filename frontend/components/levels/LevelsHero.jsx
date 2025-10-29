'use client'

import Image from 'next/image'

const LevelsHero = () => {
  return (
    <div className="relative w-full aspect-[16/7] min-h-[300px] h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[100vh]">
      <Image
        src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=80"
        alt="English Proficiency Levels"
        fill
        priority
        quality={100}
        className="object-cover object-center w-full h-full"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
      />
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 text-center mt-36">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow mb-4">
          English Proficiency Levels
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-white/80 font-normal max-w-5xl mx-auto mb-7">
          Discover your English level and find the perfect learning path for you. From beginner to advanced, each level is carefully designed to help you progress confidently in your language journey.
        </p>
      </div>
    </div>
  )
}

export default LevelsHero
