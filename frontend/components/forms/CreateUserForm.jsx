import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import BASE_URL from "@/app/config/url"

const createSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["ADMIN", "MAIN_MANAGER"])
})

const editSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().optional(),
  role: z.enum(["ADMIN", "MAIN_MANAGER"])
})

export default function CreateUserForm({ onSuccess, onCancel, initialValues, mode = "create" }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const form = useForm({
    resolver: zodResolver(mode === "edit" ? editSchema : createSchema),
    defaultValues: initialValues || {
      name: "",
      email: "",
      password: "",
      role: "ADMIN"
    }
  })

  useEffect(() => {
    if (initialValues) {
      form.reset({ ...initialValues, password: "" })
    }
  }, [initialValues])

  const onSubmit = async (values) => {
    setIsLoading(true)
    setError(null)
    try {
      let res, data
      if (mode === "edit") {
        // Remove password if blank
        const payload = { ...values }
        if (!payload.password) delete payload.password
        res = await fetch(`${BASE_URL}/users/${initialValues.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include"
        })
      } else {
        res = await fetch(`${BASE_URL}/users/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
          credentials: "include"
        })
      }
      data = await res.json()
      if (!data.success) {
        setError(data.message || `Failed to ${mode === "edit" ? "edit" : "create"} user`)
        return
      }
      if (onSuccess) onSuccess()
      form.reset()
    } catch (e) {
      setError(`Failed to ${mode === "edit" ? "edit" : "create"} user`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full bg-card rounded-lg p-0">
      <h2 className="text-lg font-bold mb-4">{mode === "edit" ? "Edit User" : "Create User"}</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password {mode === "edit" && <span className="text-xs text-muted-foreground">(leave blank to keep unchanged)</span>}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <select {...field} className="w-full border rounded-md p-2 bg-background">
                    <option value="ADMIN">ADMIN</option>
                    <option value="MAIN_MANAGER">MAIN_MANAGER</option>
                  </select>
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
