'use client'

const LevelsDescription = () => {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6">
            What do CEFR levels mean?
          </h2>
          <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            <p>
              The CEFR (Common European Framework of Reference for Languages) is an international
              standard that describes your ability to use English in real-life situations. It divides
              learners into different levels, from beginner to advanced, and helps you understand
              what you can already do and what you need to improve.
            </p>
            <p>
              At our website, each CEFR level includes lessons and practice activities designed to
              match your skills — so you can learn at your own pace, step by step. Whether you're just
              starting or preparing for advanced exams, you'll find materials that fit your level
              perfectly.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LevelsDescription
