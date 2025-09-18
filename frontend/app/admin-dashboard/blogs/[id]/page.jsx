'use client'

import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

const SingleBlog = () => {
  const router = useRouter()
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetch(`http://localhost:3001/api/blogs/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setBlog(data.data)
        else setError(data.message || 'Not found')
      })
      .catch(() => setError('Failed to fetch blog'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className='p-8 text-center text-muted-foreground'>Loading...</div>
  if (error) return <div className='p-8 text-center text-destructive'>{error}</div>
  if (!blog) return null

  return (
    <article className="max-w-5xl mx-auto w-full py-10 px-4 sm:px-0">
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
        aria-label="Back"
      >
        <ArrowLeft className="h-5 w-5" />
        Back
      </button>
      {blog.imageRef && (
        <div className="relative w-full h-72 sm:h-96 mb-8 rounded-lg overflow-hidden shadow">
          <Image src={blog.imageRef} alt={blog.title} fill className="object-cover" />
        </div>
      )}
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight text-foreground">{blog.title}</h1>
      <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted-foreground">
        {blog.author && <span>By <span className="font-semibold text-foreground">{blog.author.name}</span></span>}
        {blog.createdAt && <span>{new Date(blog.createdAt).toLocaleDateString()}</span>}
        {blog.category && <Badge variant="secondary">{blog.category}</Badge>}
      </div>
      <div className="prose prose-neutral max-w-none text-lg leading-relaxed">
        {blog.content}
      </div>
    </article>
  )
}

export default SingleBlog