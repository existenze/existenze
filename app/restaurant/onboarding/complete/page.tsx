"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Logo } from "@/components/logo"

export default function OnboardingComplete() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"success" | "pending" | "error">("pending")

  useEffect(() => {
    // In a real app, you would verify the onboarding status with your backend
    // For this example, we'll just simulate a successful onboarding
    const timer = setTimeout(() => {
      setStatus("success")
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

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
            {status === "pending" && (
              <div className="text-center py-8">
                <p className="text-xl">Verifying your account...</p>
              </div>
            )}

            {status === "success" && (
              <>
                <div className="flex justify-center mb-6">
                  <div className="rounded-full bg-secondary/20 p-4">
                    <CheckCircle className="h-12 w-12 text-secondary" />
                  </div>
                </div>

                <h1 className="vintage-title text-3xl mb-4 text-center">ONBOARDING COMPLETE</h1>
                <div className="vintage-divider"></div>

                <p className="text-center mb-6">
                  Your restaurant is now connected to Second Course! You can start creating deals for students.
                </p>

                <div className="space-y-6">
                  <div className="vintage-border bg-muted p-4">
                    <h3 className="font-bold mb-2">NEXT STEPS:</h3>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Log in to your restaurant dashboard</li>
                      <li>Create your first student deal</li>
                      <li>Set your payout preferences in your Stripe dashboard</li>
                    </ol>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/restaurant/dashboard" className="flex-1">
                      <button className="vintage-button w-full py-2">GO TO DASHBOARD</button>
                    </Link>
                    <Link href="/restaurant/create-deal" className="flex-1">
                      <button className="vintage-button w-full py-2 bg-secondary">CREATE A DEAL</button>
                    </Link>
                  </div>
                </div>
              </>
            )}

            {status === "error" && (
              <div className="text-center py-8">
                <p className="text-xl text-red-600 mb-4">There was a problem connecting your account</p>
                <Link href="/restaurant/onboarding">
                  <button className="vintage-button py-2 px-6">TRY AGAIN</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
