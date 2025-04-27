"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, MapPin, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Logo } from "@/components/logo"
import { Badge } from "@/components/ui/badge"
import { deals } from "@/lib/data"
import { CheckoutModal } from "@/components/checkout-modal"

export default function DealDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  // Find the deal by ID
  const deal = deals.find((d) => d.id.toString() === params.id)

  if (!deal) {
    return (
      <div className="container flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Deal not found</h1>
        <p className="mb-8">The deal you're looking for doesn't exist or has expired.</p>
        <Button asChild>
          <Link href="/deals">Browse Deals</Link>
        </Button>
      </div>
    )
  }

  const savings = deal.value - deal.price
  const savingsPercentage = Math.round((savings / deal.value) * 100)

  // Determine badge color based on category
  const getBadgeClass = () => {
    switch (deal.category) {
      case "food":
        return "bg-primary/10 text-primary border-primary/20"
      case "drinks":
        return "bg-secondary/10 text-secondary border-secondary/20"
      case "entertainment":
        return "bg-accent/10 text-accent border-accent/20"
      default:
        return "bg-primary/10 text-primary border-primary/20"
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <nav className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/deals" className="text-sm font-medium text-primary">
              Deals
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8">
          <Button variant="ghost" className="mb-6 pl-0" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Deals
          </Button>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="mb-6 flex items-center gap-4">
                <img
                  src={deal.logo || "/placeholder.svg?height=120&width=120"}
                  alt={`${deal.restaurant} logo`}
                  className="h-24 w-24 rounded-md object-cover"
                />
                <div>
                  <h1 className="text-3xl font-bold">{deal.restaurant}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{deal.location}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < deal.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                        />
                      ))}
                    <span className="ml-1 text-sm text-muted-foreground">({deal.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">{deal.discount}</h2>
                <Badge variant="outline" className={getBadgeClass() + " mb-4"}>
                  {deal.category.charAt(0).toUpperCase() + deal.category.slice(1)}
                </Badge>
                <p className="mb-4">{deal.description}</p>
                <p className="mb-4">{deal.longDescription}</p>

                <div className="flex flex-col gap-2 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>Valid until {deal.expires}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-secondary" />
                    <span>Available {deal.availability}</span>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="font-bold mb-2">Terms & Conditions</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    {deal.terms.map((term, index) => (
                      <li key={index}>{term}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <Card className="sticky top-24 card-highlight">
                <CardHeader>
                  <CardTitle>Purchase this Deal</CardTitle>
                  <CardDescription>Secure this exclusive student discount</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Original price</span>
                      <span className="line-through">${deal.value.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Deal price</span>
                      <span className="text-primary">${deal.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">You save</span>
                      <span className="text-green-600">
                        ${savings.toFixed(2)} ({savingsPercentage}%)
                      </span>
                    </div>

                    <Separator />

                    <div className="rounded-lg bg-muted p-3">
                      <p className="text-sm font-medium">Deal includes:</p>
                      <ul className="mt-2 text-sm space-y-1">
                        {deal.includes.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    onClick={() => setIsCheckoutOpen(true)}
                  >
                    Buy Now - ${deal.price.toFixed(2)}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} deal={deal} />
    </div>
  )
}
