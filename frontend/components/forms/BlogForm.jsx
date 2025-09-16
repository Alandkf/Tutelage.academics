import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const blogSchema = z.object({
  title: z.string().min(2, "Title is required"),
  content: z.string().min(2, "Content is required"),
  imageRef: z.string().optional(),
  category: z.string().optional()
})

export default function BlogForm({ onSuccess, onCancel, initialValues, mode = "create" }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const form = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: initialValues || {
      title: "",
      content: "",
      imageRef: "",
      category: ""
    }
  })

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues)
    }
  }, [initialValues])

  const onSubmit = async (values) => {
    setIsLoading(true)
    setError(null)
    // For now, just call onSuccess after a short delay (simulate API)
    setTimeout(() => {
      setIsLoading(false)
      if (onSuccess) onSuccess(values)
      form.reset()
    }, 600)
  }

  return (
    <div className="w-full bg-card rounded-lg p-0">
      <h2 className="text-lg font-bold mb-4">{mode === "edit" ? "Edit Blog" : "Create Blog"}</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Blog title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <textarea className="w-full min-h-[100px] border rounded-md p-2 bg-background" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageRef"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Category (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <div className="text-destructive text-sm">{error}</div>}
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>{isLoading ? (mode === "edit" ? "Saving..." : "Creating...") : (mode === "edit" ? "Save" : "Create")}</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
