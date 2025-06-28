"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle, Download, MapPin } from "lucide-react"
import { Logo } from "@/components/logo"
import { deals } from "@/lib/data"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const dealId = searchParams.get("dealId")
  const [orderNumber, setOrderNumber] = useState("")

  // Find the deal by ID
  const deal = deals.find((d) => d.id.toString() === dealId)

  useEffect(() => {
    // Generate a random order number
    setOrderNumber(`SC-${Math.floor(100000 + Math.random() * 900000)}`)
  }, [])

  if (!deal) {
    return (
      <div className="vintage-container flex flex-col items-center justify-center min-h-screen">
        <h1 className="vintage-title text-2xl mb-4">ORDER NOT FOUND</h1>
        <p className="mb-8">We couldn't find your order details.</p>
        <Link href="/deals">
          <button className="vintage-button px-6 py-2">RETURN TO CATALOG</button>
        </Link>
      </div>
    )
  }

  const orderDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-foreground py-4">
        <div className="vintage-container flex justify-between items-center">
          <Logo />
          <nav className="flex items-center gap-6">
            <Link href="/dashboard" className="uppercase tracking-wider text-sm hover:underline">
              Dashboard
            </Link>
            <Link href="/deals" className="uppercase tracking-wider text-sm hover:underline">
              Catalog
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 vintage-container py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="rounded-full bg-secondary/20 p-3 mb-4">
              <CheckCircle className="h-8 w-8 text-secondary" />
            </div>
            <h1 className="vintage-title text-3xl mb-2">ORDER CONFIRMED!</h1>
            <p className="text-muted-foreground">Your order has been successfully processed and confirmed.</p>
          </div>

          <div className="vintage-border bg-card p-6 mb-8">
            <h2 className="vintage-title text-2xl mb-4">ORDER SUMMARY</h2>
            <p className="mb-4">
              Order #{orderNumber} • {orderDate}
            </p>

            <div className="vintage-divider"></div>

            <div className="flex items-start gap-4 mb-6">
              <img
                src={deal.logo || "/placeholder.svg?height=80&width=80"}
                alt={`${deal.restaurant} logo`}
                className="vintage-image h-20 w-20 object-cover"
              />
              <div className="flex-1">
                <h3 className="font-bold mb-1">{deal.discount}</h3>
                <p className="text-muted-foreground">{deal.restaurant}</p>
                <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{deal.location}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="vintage-price">${deal.price.toFixed(2)}</p>
              </div>
            </div>

            <div className="vintage-divider"></div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${deal.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span className="vintage-price">${deal.price.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6">
              <button className="vintage-button w-full py-2 flex items-center justify-center gap-2 bg-card text-foreground">
                <Download className="h-4 w-4" />
                DOWNLOAD RECEIPT
              </button>
            </div>
          </div>

          <div className="vintage-border bg-card p-6">
            <h2 className="vintage-title text-2xl mb-4">HOW TO REDEEM YOUR DEAL</h2>

            <ol className="list-decimal pl-5 space-y-3 mb-6">
              <li>Show this confirmation page to the restaurant staff</li>
              <li>
                Mention your order number: <span className="font-bold">{orderNumber}</span>
              </li>
              <li>Enjoy your exclusive student discount!</li>
            </ol>

            <div className="vintage-border bg-muted p-4">
              <h4 className="font-bold mb-2">IMPORTANT NOTES:</h4>
              <ul className="list-disc pl-5 space-y-2">
                {deal.terms.map((term, index) => (
                  <li key={index}>{term}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link href="/deals" className="flex-1">
                <button className="vintage-button w-full py-2 bg-card text-foreground">BROWSE MORE DEALS</button>
              </Link>
              <Link href="/dashboard" className="flex-1">
                <button className="vintage-button w-full py-2">GO TO DASHBOARD</button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
