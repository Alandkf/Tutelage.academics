"use client"

import LoginForm from "@/components/forms/LoginForm"

const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 space-y-6">
      <LoginForm />
      <div className="w-full max-w-md rounded-md bg-amber-50 p-4 border border-amber-300 text-center shadow-sm">
        <p className="text-amber-800 font-medium">
          ⚠️ Warning: This route is for admins only. If you're not an admin, please{" "}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.history.back(); }} 
            className="text-amber-600 underline font-bold hover:text-amber-800"
          >
            go back
          </a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage