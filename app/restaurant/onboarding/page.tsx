"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { createConnectAccount } from "@/app/actions/stripe-connect"
import { Logo } from "@/components/logo"

const formSchema = z.object({
  restaurantName: z.string().min(2, { message: "Restaurant name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  userId: z.string().min(1, { message: "User ID is required" }),
})

export default function RestaurantOnboarding() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      restaurantName: "",
      email: "",
      userId: "user_123", // In a real app, this would come from authentication
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("restaurantName", data.restaurantName)
    formData.append("email", data.email)
    formData.append("userId", data.userId)

    try {
      await createConnectAccount(formData)
    } catch (error) {
      console.error("Error during onboarding:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-foreground py-4">
        <div className="vintage-container flex justify-between items-center">
          <Logo />
        </div>
      </header>

      <main className="flex-1">
        <div className="vintage-container py-8">
          <div className="vintage-border bg-card p-8 max-w-2xl mx-auto">
            <h1 className="vintage-title text-3xl mb-6">RESTAURANT PARTNER ONBOARDING</h1>
            <div className="vintage-divider"></div>

            <p className="mb-6">
              Join Second Course as a restaurant partner and offer exclusive deals to college students. We'll handle the
              payments and send you your share automatically.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block mb-2 uppercase text-sm tracking-wider">Restaurant Name</label>
                <input {...register("restaurantName")} className="w-full p-2 border-2 border-foreground bg-card" />
                {errors.restaurantName && <p className="text-red-600 mt-1">{errors.restaurantName.message}</p>}
              </div>

              <div>
                <label className="block mb-2 uppercase text-sm tracking-wider">Business Email</label>
                <input type="email" {...register("email")} className="w-full p-2 border-2 border-foreground bg-card" />
                {errors.email && <p className="text-red-600 mt-1">{errors.email.message}</p>}
              </div>

              <input type="hidden" {...register("userId")} />

              <button type="submit" disabled={isSubmitting} className="vintage-button w-full py-3">
                {isSubmitting ? "PROCESSING..." : "CONNECT WITH STRIPE"}
              </button>
            </form>

            <div className="mt-8 text-sm">
              <p>
                By connecting your account, you agree to our terms of service and the Stripe Connected Account
                Agreement.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
