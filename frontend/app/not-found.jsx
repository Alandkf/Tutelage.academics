import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-background px-4 text-center text-foreground">
      <div className="mb-2 select-none text-[7rem] font-extrabold text-leo-red">404</div>
      <h1 className="mb-2 text-3xl font-bold text-leo-navy md:text-4xl">Page not found · پەڕەکە نەدۆزرایەوە</h1>
      <Link href="/" className="mt-6 rounded-md bg-leo-navy px-6 py-3 font-semibold text-white transition hover:bg-leo-navy-dark">
        LEO Institute
      </Link>
    </div>
  )
}
