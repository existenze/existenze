"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Filter, LogOut, Menu, Search, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Logo } from "@/components/logo"
import { Badge } from "@/components/ui/badge"
import { deals } from "@/lib/data"

export default function DealsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter deals based on active tab and search query
  const filteredDeals = deals
    .filter((deal) => activeTab === "all" || deal.category === activeTab)
    .filter(
      (deal) =>
        searchQuery === "" ||
        deal.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )

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
                  <Link href="/dashboard" className="flex items-center gap-2">
                    Dashboard
                  </Link>
                  <Link href="/deals" className="flex items-center gap-2 text-primary">
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
              <Link href="/dashboard" className="text-sm font-medium">
                Dashboard
              </Link>
              <Link href="/deals" className="text-sm font-medium text-primary">
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
            <h1 className="text-3xl font-bold">Browse Deals</h1>
            <p className="text-muted-foreground">
              Find and purchase exclusive deals from restaurants near your campus.
            </p>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-6">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search restaurants or deals..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
            <TabsList className="bg-muted/50">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                All Deals
              </TabsTrigger>
              <TabsTrigger value="food" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Food
              </TabsTrigger>
              <TabsTrigger value="drinks" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Drinks
              </TabsTrigger>
              <TabsTrigger
                value="entertainment"
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Entertainment
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredDeals.map((deal) => (
                  <DealCard key={deal.id} deal={deal} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="food" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredDeals.map((deal) => (
                  <DealCard key={deal.id} deal={deal} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="drinks" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredDeals.map((deal) => (
                  <DealCard key={deal.id} deal={deal} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="entertainment" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredDeals.map((deal) => (
                  <DealCard key={deal.id} deal={deal} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

function DealCard({ deal }) {
  return (
    <Card className="overflow-hidden flex flex-col h-full card-highlight">
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
        <div className="mb-2 flex items-center gap-2">
          {deal.category === "food" && (
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              Food
            </Badge>
          )}
          {deal.category === "drinks" && (
            <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
              Drinks
            </Badge>
          )}
          {deal.category === "entertainment" && (
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
              Entertainment
            </Badge>
          )}
          {deal.isPopular && <Badge className="badge-gradient">Popular</Badge>}
        </div>
        <p className="text-lg font-medium mb-2">{deal.discount}</p>
        <p className="text-sm text-muted-foreground">{deal.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <p className="font-medium text-primary">${deal.price.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground">Value: ${deal.value.toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/deals/${deal.id}`} className="w-full">
          <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">View Deal</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
