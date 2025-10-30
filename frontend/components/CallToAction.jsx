'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

const CallToAction = () => {
  return (
    <section className="py-16 bg-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to take your English further?
          </h2>
          <p className="text-lg text-foreground leading-relaxed mb-8 max-w-3xl">
            Join our courses for more detailed materials and effortless learning.
            Experience real English with your instructor, either one-on-one or in
            small group classes with your classmates, and take your skills to the
            next level!
          </p>
          <Link href="/courses">
            <Button size="lg" variant={'secondary'} className="text-lg px-8 py-6">
              Explore Courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
