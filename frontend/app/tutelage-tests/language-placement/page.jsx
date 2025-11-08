

const LanguagePlacement = () => {
  return (
    <div className="relative min-h-screen bg-background pt-4"> 
        <LanguagePlacementHero />
    </div>
  )
}

export default LanguagePlacement




const LanguagePlacementHero = () => {
  const title = "Free Practice Test"
  const heroImage = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1400"
  const description = "Our free 30-minutes English placement test helps you identify your current level of English proficiency. It assesses grammar, vocabulary, and comprehension to provide an accurate overview of your strengths and areas for development."
  return (
    <>
      {/* Header Section */}
      <div className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between gap-6 py-6">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl flex items-center justify-between font-bold text-foreground mb-2">
                {title}
                <Link href="/tutelage-tests/free-practice-test/start">
                    <Button size="lg" className="bg-primary text-primary-foreground px-6 py-3 cursor-pointer">
                         Start the test
                    </Button>
                </Link>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={heroImage}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </div>

      {/* Description */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-5xl">
          <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </>
  )
}