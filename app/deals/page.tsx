"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, LogOut, Menu, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "@/components/logo"
import { deals } from "@/lib/data"

export default function DealsPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter deals based on active category and search query
  const filteredDeals = deals
    .filter((deal) => activeCategory === "all" || deal.category === activeCategory)
    .filter(
      (deal) =>
        searchQuery === "" ||
        deal.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-foreground py-4">
        <div className="vintage-container flex justify-between items-center">
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
                  <Logo size="small" />
                </div>
                <nav className="grid gap-6 text-lg font-medium">
                  <Link href="/dashboard" className="flex items-center gap-2">
                    Dashboard
                  </Link>
                  <Link href="/deals" className="flex items-center gap-2 font-bold">
                    Browse Catalog
                  </Link>
                  <Link href="/profile" className="flex items-center gap-2">
                    Profile
                  </Link>
                  <Link href="/" className="flex items-center gap-2 text-red-500">
                    <LogOut className="h-5 w-5" />
                    Logout
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <nav className="hidden md:flex md:items-center md:gap-6">
              <Link href="/dashboard" className="uppercase tracking-wider text-sm hover:underline">
                Dashboard
              </Link>
              <Link href="/deals" className="uppercase tracking-wider text-sm font-bold hover:underline">
                Catalog
              </Link>
              <Link href="/profile" className="uppercase tracking-wider text-sm hover:underline">
                Profile
              </Link>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="vintage-container py-8">
          <div className="vintage-header mb-8">
            <h1 className="vintage-title text-4xl mb-2">CATALOG OF DEALS</h1>
            <p className="text-muted-foreground">
              Find and purchase exclusive deals from restaurants near your campus.
            </p>
          </div>

          <div className="vintage-border bg-card p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              <div className="relative w-full md:max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="SEARCH CATALOG..."
                  className="pl-8 border-foreground"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`vintage-button px-3 py-1 text-xs ${activeCategory === "all" ? "bg-primary" : "bg-card text-foreground"}`}
                >
                  ALL
                </button>
                <button
                  onClick={() => setActiveCategory("food")}
                  className={`vintage-button px-3 py-1 text-xs ${activeCategory === "food" ? "bg-primary" : "bg-card text-foreground"}`}
                >
                  FOOD
                </button>
                <button
                  onClick={() => setActiveCategory("drinks")}
                  className={`vintage-button px-3 py-1 text-xs ${activeCategory === "drinks" ? "bg-primary" : "bg-card text-foreground"}`}
                >
                  DRINKS
                </button>
                <button
                  onClick={() => setActiveCategory("entertainment")}
                  className={`vintage-button px-3 py-1 text-xs ${activeCategory === "entertainment" ? "bg-primary" : "bg-card text-foreground"}`}
                >
                  ENTERTAINMENT
                </button>
              </div>
            </div>
          </div>

          <div className="catalog-grid">
            {filteredDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

function DealCard({ deal }) {
  return (
    <div className="vintage-border bg-card p-4">
      <div className="flex items-start gap-4 mb-4">
        <img
          src={deal.logo || "/placeholder.svg?height=80&width=80"}
          alt={`${deal.restaurant} logo`}
          className="vintage-image h-20 w-20 object-cover"
        />
        <div>
          <h3 className="vintage-title text-xl mb-1">{deal.restaurant}</h3>
          <p className="text-sm mb-2">Expires: {deal.expires}</p>
          <div className="flex flex-wrap gap-1">
            <span className="vintage-badge">{deal.category}</span>
            {deal.isPopular && <span className="vintage-badge bg-accent">Popular</span>}
          </div>
        </div>
      </div>

      <div className="vintage-divider"></div>

      <div className="mb-4">
        <p className="font-bold mb-2">{deal.discount}</p>
        <p className="text-sm">{deal.description}</p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <span className="vintage-price">${deal.price.toFixed(2)}</span>
        <span className="text-sm line-through">Value: ${deal.value.toFixed(2)}</span>
      </div>

      <Link href={`/deals/${deal.id}`} className="block">
        <button className="vintage-button w-full py-2">VIEW DETAILS</button>
      </Link>
    </div>
  )
}
