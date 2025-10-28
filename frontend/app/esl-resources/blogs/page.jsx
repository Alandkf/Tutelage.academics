'use client'

import BlogGrid from "@/components/esl-resources/blogs/BlogGrid"
import BlogLibraryDescription from "@/components/esl-resources/blogs/BlogLibraryDescription"
import BlogLibraryHero from "@/components/esl-resources/blogs/BlogLibraryHero"



const BlogLibraryPage = () => {
  return (
    <div className="relative min-h-screen bg-background pt-4">
      <BlogLibraryHero />
      <BlogLibraryDescription />
      <BlogGrid />
    </div>
  )
}

export default BlogLibraryPage