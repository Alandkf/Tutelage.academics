import Image from 'next/image'


export default function SkillsHero() {
  return (
    <>
      <div className="relative w-full aspect-[16/7] min-h-[300px] h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[100vh]">
        <Image
          src="/hero.jpg"
          alt="Landing Hero"
          fill
          priority
          quality={100}
          className="object-cover object-center w-full h-full"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        {/* Centered hero text and search (all screens) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 text-center mt-36">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow mb-4">Master Essential English Skills with Tutelage</h1>
          <p className="text-sm sm:text-base md:text-lg text-white/80 font-normal max-w-5xl mx-auto mb-7">
            Develop your listening, speaking, reading, and writing abilities through comprehensive skill-building exercises and interactive learning experiences. Build confidence in English communication with our structured approach to language mastery.</p>
        </div>
      </div>
    </>
  )
}
