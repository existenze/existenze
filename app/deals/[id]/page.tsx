"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, MapPin, Star } from "lucide-react"
import { Logo } from "@/components/logo"
import { deals } from "@/lib/data"
import { CheckoutModal } from "@/components/checkout-modal"

export default function DealDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  // Find the deal by ID
  const deal = deals.find((d) => d.id.toString() === params.id)

  if (!deal) {
    return (
      <div className="vintage-container flex flex-col items-center justify-center min-h-screen">
        <h1 className="vintage-title text-2xl mb-4">ITEM NOT FOUND</h1>
        <p className="mb-8">The deal you're looking for doesn't exist or has expired.</p>
        <button className="vintage-button px-6 py-2" onClick={() => router.push("/deals")}>
          RETURN TO CATALOG
        </button>
      </div>
    )
  }

  const savings = deal.value - deal.price
  const savingsPercentage = Math.round((savings / deal.value) * 100)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-foreground py-4">
        <div className="vintage-container flex justify-between items-center">
          <Logo />
          <nav className="flex items-center gap-6">
            <Link href="/dashboard" className="uppercase tracking-wider text-sm hover:underline">
              Dashboard
            </Link>
            <Link href="/deals" className="uppercase tracking-wider text-sm font-bold hover:underline">
              Catalog
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="vintage-container py-8">
          <button
            className="flex items-center mb-8 uppercase tracking-wider text-sm hover:underline"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Catalog
          </button>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="vintage-border bg-card p-6 mb-8">
                <div className="flex items-start gap-6 mb-6">
                  <img
                    src={deal.logo || "/placeholder.svg?height=120&width=120"}
                    alt={`${deal.restaurant} logo`}
                    className="vintage-image h-32 w-32 object-cover"
                  />
                  <div>
                    <h1 className="vintage-title text-3xl mb-2">{deal.restaurant}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{deal.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < deal.rating ? "text-accent fill-accent" : "text-muted-foreground"}`}
                          />
                        ))}
                      <span className="ml-1 text-sm text-muted-foreground">({deal.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="vintage-divider"></div>

                <h2 className="vintage-title text-2xl mb-4">{deal.discount}</h2>
                <span className="vintage-badge mb-4">{deal.category.toUpperCase()}</span>
                <p className="mb-4">{deal.description}</p>
                <p className="mb-6">{deal.longDescription}</p>

                <div className="vintage-border bg-card p-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>Valid until {deal.expires}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-secondary" />
                      <span>Available {deal.availability}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="vintage-border bg-card p-6">
                <h3 className="vintage-title text-xl mb-4">TERMS & CONDITIONS</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {deal.terms.map((term, index) => (
                    <li key={index}>{term}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className="vintage-border bg-card p-6 sticky top-8">
                <h3 className="vintage-title text-xl mb-4">PURCHASE THIS DEAL</h3>
                <p className="mb-6">Secure this exclusive student discount</p>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Original price</span>
                    <span className="line-through">${deal.value.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Deal price</span>
                    <span className="vintage-price">${deal.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">You save</span>
                    <span className="text-secondary font-bold">
                      ${savings.toFixed(2)} ({savingsPercentage}%)
                    </span>
                  </div>
                </div>

                <div className="vintage-divider"></div>

                <div className="vintage-border bg-muted p-4 mb-6">
                  <p className="font-bold mb-2">DEAL INCLUDES:</p>
                  <ul className="space-y-2">
                    {deal.includes.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="vintage-button w-full py-3" onClick={() => setIsCheckoutOpen(true)}>
                  BUY NOW - ${deal.price.toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} deal={deal} />
    </div>
  )
}
