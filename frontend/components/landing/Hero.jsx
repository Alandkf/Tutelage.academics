import Image from 'next/image'
import CountUp from 'react-countup'


export default function HeroSection() {
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
        {/* Hero content row (desktop/tablet) */}
        <div className="hidden lg:flex absolute inset-0 items-center justify-between z-10 w-full h-auto px-4 mt-10">
          <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto gap-8">
            {/* Left hero text box */}
            <div className="max-w-xl bg-background rounded-xl p-8 shadow-lg border border-border flex flex-col gap-4">
              <h1 className="text-4xl md:text-3xl font-bold text-foreground drop-shadow">Unlock Your Potential with Tutelage</h1>
              <p className="text-lg text-muted-foreground font-normal">education is vital to everyone on this planet. With a passion for education, compassion for teachers, and advanced technology, we believe we can provide high-quality education for learners everywhere and narrow the education gap between the privileged and underprivileged</p>
            </div>
            {/* Centered stat boxes */}
            <div className="flex flex-col gap-4 md:gap-6 md:ml-8">
              <div className="bg-background/90 text-foreground rounded-lg px-5 py-2 shadow font-bold text-2xl text-start border border-border min-w-[150px]">
                <CountUp end={3000} duration={2} separator="," />+
                <br />
                <span className='text-lg font-normal'>Students</span>
              </div>
              <div className="bg-background/90 text-foreground rounded-lg px-5 py-2 shadow font-bold text-2xl text-start border border-border min-w-[150px]">
                <CountUp end={95} duration={2} suffix="%" />
                <br />
                <span className='text-lg font-normal'>Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Plain text hero and stats below image on mobile */}
      <div className="lg:hidden flex flex-col gap-4 w-full mt-4 px-4 sm:py-2">
        <h1 className="text-3xl sm:text-5xl font-bold text-foreground flex items-center justify-start gap-4"><Image src={"/only-logo-black-border-white-bg.svg"} width={50} height={50} alt='logo' /> Unlock Your Potential with Tutelage</h1>
        <p className="text-base sm:text-lg text-muted-foreground font-normal">education is vital to everyone on this planet. With a passion for education, compassion for teachers, and advanced technology, we believe we can provide high-quality education for learners everywhere and narrow the education gap between the privileged and underprivileged</p>
        <div className="flex gap-2 items-center justify-around">
          <div className="font-bold text-2xl text-foreground border border-border rounded-lg px-5 py-2 shadow">
            <CountUp end={3000} duration={2} separator="," />+
            <span className='text-lg font-normal ml-2'>Students</span>
          </div>
          <div className="font-bold text-2xl text-foreground border border-border rounded-lg px-5 py-2 shadow">
            <CountUp end={95} duration={2} suffix="%" />
            <span className='text-lg font-normal ml-2'>Success Rate</span>
          </div>
        </div>
      </div>
    </>
  )
}
