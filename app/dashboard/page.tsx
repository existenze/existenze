"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, LogOut, Menu, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "@/components/logo"
import { deals } from "@/lib/data"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("all")

  // Get featured deals (first 3)
  const featuredDeals = deals.slice(0, 3)

  // Get popular deals
  const popularDeals = deals.filter((deal) => deal.isPopular).slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Bell className="h-5 w-5" />
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="mb-8">
                  <Logo />
                </div>
                <nav className="grid gap-6 text-lg font-medium">
                  <Link href="/dashboard" className="flex items-center gap-2 text-primary">
                    Dashboard
                  </Link>
                  <Link href="/deals" className="flex items-center gap-2">
                    Browse Deals
                  </Link>
                  <Link href="/profile" className="flex items-center gap-2">
                    Profile
                  </Link>
                  <Link href="/settings" className="flex items-center gap-2">
                    Settings
                  </Link>
                  <Link href="/" className="flex items-center gap-2 text-red-500">
                    <LogOut className="h-5 w-5" />
                    Logout
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <nav className="hidden md:flex md:items-center md:gap-6">
              <Link href="/dashboard" className="text-sm font-medium text-primary">
                Dashboard
              </Link>
              <Link href="/deals" className="text-sm font-medium">
                Browse Deals
              </Link>
              <Link href="/profile" className="text-sm font-medium">
                Profile
              </Link>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Welcome, Student!</h1>
            <p className="text-muted-foreground">
              Browse and redeem exclusive deals from restaurants near your campus.
            </p>
          </div>

          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Featured Deals</h2>
              <Button variant="link" asChild>
                <Link href="/deals">View All</Link>
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          </div>

          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Popular Deals</h2>
              <Button variant="link" asChild>
                <Link href="/deals">View All</Link>
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {popularDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function DealCard({ deal }) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center gap-4">
          <img
            src={deal.logo || "/placeholder.svg?height=80&width=80"}
            alt={`${deal.restaurant} logo`}
            className="h-16 w-16 rounded-md object-cover"
          />
          <div>
            <CardTitle className="text-xl">{deal.restaurant}</CardTitle>
            <CardDescription>Expires: {deal.expires}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-4 flex-grow">
        <p className="text-lg font-medium mb-2">{deal.discount}</p>
        <p className="text-sm text-muted-foreground">{deal.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <p className="font-medium">${deal.price.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground">Value: ${deal.value.toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/deals/${deal.id}`} className="w-full">
          <Button className="w-full">View Deal</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
