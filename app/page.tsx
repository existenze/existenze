import Link from "next/link"
import { Logo } from "@/components/logo"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-foreground py-4">
        <div className="vintage-container flex justify-between items-center">
          <Logo />
          <nav className="flex items-center gap-6">
            <Link href="/login" className="uppercase tracking-wider text-sm font-bold hover:underline">
              Login
            </Link>
            <Link href="/signup">
              <button className="vintage-button px-4 py-2">Sign Up</button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="vintage-container">
            <div className="vintage-border bg-card p-8 md:p-12 mb-12">
              <h1 className="vintage-title text-4xl md:text-5xl lg:text-6xl mb-6 max-w-4xl">
                ACCESS TO TOOLS FOR STUDENT SUSTENANCE
              </h1>
              <div className="vintage-divider"></div>
              <p className="text-lg md:text-xl mb-8 max-w-3xl">
                A cooperative catalog of exclusive discounts at restaurants near your campus. Verify your student ID and
                join our community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <button className="vintage-button px-6 py-3">BECOME A MEMBER</button>
                </Link>
                <Link href="/deals">
                  <button className="vintage-button px-6 py-3 bg-secondary">BROWSE CATALOG</button>
                </Link>
              </div>
            </div>

            <div className="border-t border-b border-foreground py-8">
              <h2 className="vintage-title text-3xl mb-8 text-center">HOW IT WORKS</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="vintage-border bg-card p-6 text-center">
                  <div className="text-5xl font-serif mb-4">1</div>
                  <h3 className="vintage-title text-xl mb-3">SIGN UP</h3>
                  <p>Create an account with your email and password</p>
                </div>
                <div className="vintage-border bg-card p-6 text-center">
                  <div className="text-5xl font-serif mb-4">2</div>
                  <h3 className="vintage-title text-xl mb-3">VERIFY ID</h3>
                  <p>Enter and verify your student ID number</p>
                </div>
                <div className="vintage-border bg-card p-6 text-center">
                  <div className="text-5xl font-serif mb-4">3</div>
                  <h3 className="vintage-title text-xl mb-3">ACCESS DEALS</h3>
                  <p>Browse and redeem exclusive restaurant discounts</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-foreground py-6">
        <div className="vintage-container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm uppercase tracking-widest">SECOND COURSE COOPERATIVE</div>
          <p className="text-sm">© {new Date().getFullYear()} • PUBLISHED BY STUDENTS FOR STUDENTS</p>
        </div>
      </footer>
    </div>
  )
}
