"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle, Download, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
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
      <div className="container flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Order not found</h1>
        <p className="mb-8">We couldn't find your order details.</p>
        <Button asChild className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
          <Link href="/deals">Browse Deals</Link>
        </Button>
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
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <nav className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/deals" className="text-sm font-medium">
              Deals
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Order Confirmed!
            </h1>
            <p className="text-muted-foreground mt-2">Your order has been successfully processed and confirmed.</p>
          </div>

          <Card className="mb-8 card-highlight">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>
                Order #{orderNumber} • {orderDate}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <img
                  src={deal.logo || "/placeholder.svg?height=80&width=80"}
                  alt={`${deal.restaurant} logo`}
                  className="h-16 w-16 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{deal.discount}</h3>
                  <p className="text-muted-foreground">{deal.restaurant}</p>
                  <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{deal.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-primary">${deal.price.toFixed(2)}</p>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${deal.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span className="text-primary">${deal.price.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full gap-2">
                <Download className="h-4 w-4" />
                Download Receipt
              </Button>
            </CardFooter>
          </Card>

          <Card className="card-highlight">
            <CardHeader>
              <CardTitle>How to Redeem Your Deal</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Show this confirmation page to the restaurant staff</li>
                <li>
                  Mention your order number: <span className="font-medium text-secondary">{orderNumber}</span>
                </li>
                <li>Enjoy your exclusive student discount!</li>
              </ol>

              <div className="mt-6 p-4 rounded-lg bg-muted">
                <h4 className="font-medium mb-2">Important Notes:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  {deal.terms.map((term, index) => (
                    <li key={index}>{term}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/deals">Browse More Deals</Link>
              </Button>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90" asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
