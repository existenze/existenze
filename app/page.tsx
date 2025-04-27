import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <nav className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium">
              Login
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="hero-gradient text-white py-16 md:py-24 lg:py-32">
          <div className="container mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              Exclusive Deals for <span className="text-accent">College Students</span>
            </h1>
            <p className="max-w-[750px] text-lg sm:text-xl opacity-90">
              Verify your student ID and unlock special discounts at restaurants near your campus.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/signup">
                <Button size="lg" className="gap-2 bg-white text-primary hover:bg-white/90">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/deals">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                >
                  Browse Deals
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-6 text-center shadow-sm card-highlight">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                1
              </div>
              <h3 className="text-xl font-bold">Sign Up</h3>
              <p className="text-sm text-muted-foreground">Create an account with your email and password</p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-6 text-center shadow-sm card-highlight">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                2
              </div>
              <h3 className="text-xl font-bold">Verify Student ID</h3>
              <p className="text-sm text-muted-foreground">Enter and verify your student ID number</p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-6 text-center shadow-sm card-highlight">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">3</div>
              <h3 className="text-xl font-bold">Access Deals</h3>
              <p className="text-sm text-muted-foreground">Browse and redeem exclusive restaurant discounts</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <Logo size="small" />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Second Course. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
