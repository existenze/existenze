"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowUpRight, DollarSign, Package, Users } from "lucide-react"
import { Logo } from "@/components/logo"
import { createLoginLink } from "@/app/actions/stripe-connect"

export default function RestaurantDashboard() {
  const [stripeLoginUrl, setStripeLoginUrl] = useState("")

  useEffect(() => {
    // In a real app, you would fetch the restaurant's data and Stripe account ID
    const fetchStripeLoginLink = async () => {
      try {
        // Mock account ID - in a real app, this would come from your database
        const accountId = "acct_123456789"
        const url = await createLoginLink(accountId)
        setStripeLoginUrl(url)
      } catch (error) {
        console.error("Error fetching Stripe login link:", error)
      }
    }

    fetchStripeLoginLink()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-foreground py-4">
        <div className="vintage-container flex justify-between items-center">
          <Logo />
          <nav className="flex items-center gap-6">
            <Link href="/restaurant/dashboard" className="uppercase tracking-wider text-sm font-bold hover:underline">
              Dashboard
            </Link>
            <Link href="/restaurant/deals" className="uppercase tracking-wider text-sm hover:underline">
              My Deals
            </Link>
            <Link href="/restaurant/settings" className="uppercase tracking-wider text-sm hover:underline">
              Settings
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="vintage-container py-8">
          <div className="vintage-header mb-8">
            <h1 className="vintage-title text-4xl mb-2">RESTAURANT DASHBOARD</h1>
            <p className="text-muted-foreground">Manage your student deals and track your earnings</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="vintage-border bg-card p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <h3 className="vintage-title text-xl">EARNINGS</h3>
              </div>
              <p className="vintage-price text-3xl mb-2">$1,245.00</p>
              <p className="text-sm text-muted-foreground">Total earnings this month</p>
            </div>

            <div className="vintage-border bg-card p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-secondary/20 p-3 rounded-full">
                  <Package className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="vintage-title text-xl">DEALS SOLD</h3>
              </div>
              <p className="vintage-price text-3xl mb-2">87</p>
              <p className="text-sm text-muted-foreground">Deals purchased this month</p>
            </div>

            <div className="vintage-border bg-card p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-accent/20 p-3 rounded-full">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <h3 className="vintage-title text-xl">CUSTOMERS</h3>
              </div>
              <p className="vintage-price text-3xl mb-2">64</p>
              <p className="text-sm text-muted-foreground">Unique customers this month</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="vintage-border bg-card p-6">
              <h2 className="vintage-title text-2xl mb-4">RECENT TRANSACTIONS</h2>
              <div className="vintage-divider"></div>

              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div>
                      <p className="font-bold">20% Off Entire Order</p>
                      <p className="text-sm text-muted-foreground">Order #SC-{100000 + i}</p>
                    </div>
                    <div className="text-right">
                      <p className="vintage-price">${(8.99 * 0.85).toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">After 15% platform fee</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link href="/restaurant/transactions">
                  <button className="vintage-button w-full py-2 bg-card text-foreground">VIEW ALL TRANSACTIONS</button>
                </Link>
              </div>
            </div>

            <div className="vintage-border bg-card p-6">
              <h2 className="vintage-title text-2xl mb-4">STRIPE CONNECT</h2>
              <div className="vintage-divider"></div>

              <p className="mb-4">
                Manage your payouts, banking information, and account details directly through your Stripe dashboard.
              </p>

              <a href={stripeLoginUrl} target="_blank" rel="noopener noreferrer">
                <button className="vintage-button w-full py-2 flex items-center justify-center gap-2">
                  GO TO STRIPE DASHBOARD
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </a>

              <div className="mt-6 p-4 vintage-border bg-muted">
                <h4 className="font-bold mb-2">PAYOUT SCHEDULE</h4>
                <p>Your earnings are automatically transferred to your bank account on a 7-day rolling basis.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
