"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { AlertCircle, CheckCircle, CreditCard, Loader2 } from "lucide-react"

import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { processConnectPayment } from "@/app/actions/stripe-connect"
import { PLATFORM_FEE_PERCENT } from "@/lib/stripe"

// Load Stripe outside of component to avoid recreating it on each render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  cardDetails: z.any(),
})

export function CheckoutModal({ isOpen, onClose, deal }) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm isOpen={isOpen} onClose={onClose} deal={deal} />
    </Elements>
  )
}

function CheckoutForm({ isOpen, onClose, deal }) {
  const router = useRouter()
  const stripe = useStripe()
  const elements = useElements()
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      cardDetails: null,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return
    }

    setPaymentStatus("processing")
    setErrorMessage("")

    const cardElement = elements.getElement(CardElement)

    if (!cardElement) {
      setPaymentStatus("error")
      setErrorMessage("Payment form not loaded properly. Please try again.")
      return
    }

    try {
      // Create payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: values.name,
          email: values.email,
        },
      })

      if (error) {
        throw new Error(error.message)
      }

      if (!paymentMethod) {
        throw new Error("Failed to create payment method")
      }

      // Process the payment using Stripe Connect
      const result = await processConnectPayment(
        paymentMethod.id,
        deal.price * 100, // Convert to cents for Stripe
        deal.restaurantId,
        deal.id,
        values.email,
        PLATFORM_FEE_PERCENT,
      )

      if (!result.success) {
        throw new Error("Payment processing failed")
      }

      setPaymentStatus("success")

      // In a real app, redirect to order confirmation page after a delay
      setTimeout(() => {
        router.push(`/orders/confirmation?dealId=${deal.id}`)
        onClose()
      }, 2000)
    } catch (err: any) {
      console.error("Payment failed:", err)
      setPaymentStatus("error")
      setErrorMessage(err.message || "Payment failed. Please try again.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] vintage-border bg-card p-0">
        <DialogHeader className="p-6 vintage-header">
          <h2 className="vintage-title text-2xl">COMPLETE YOUR PURCHASE</h2>
          <p className="text-muted-foreground">
            You're purchasing: {deal.discount} at {deal.restaurant}
          </p>
        </DialogHeader>

        {paymentStatus === "success" ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4 p-6">
            <div className="rounded-full bg-secondary/20 p-3">
              <CheckCircle className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="vintage-title text-xl">PAYMENT SUCCESSFUL!</h3>
            <p className="text-center text-muted-foreground">
              Your order has been processed. Redirecting to your order confirmation...
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-sm tracking-wider">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="border-foreground" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-sm tracking-wider">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} className="border-foreground" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cardDetails"
                  render={() => (
                    <FormItem>
                      <FormLabel className="uppercase text-sm tracking-wider">Card Details</FormLabel>
                      <FormControl>
                        <div className="rounded-none border border-foreground px-3 py-2">
                          <CardElement
                            options={{
                              style: {
                                base: {
                                  fontSize: "16px",
                                  color: "#424770",
                                  fontFamily: "Courier, monospace",
                                  "::placeholder": {
                                    color: "#aab7c4",
                                  },
                                },
                                invalid: {
                                  color: "#9e2146",
                                },
                              },
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="vintage-border bg-muted p-3">
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span className="vintage-price">${deal.price.toFixed(2)}</span>
                  </div>
                </div>

                {paymentStatus === "error" && (
                  <Alert variant="destructive" className="vintage-border bg-card">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Payment Failed</AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                )}
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={paymentStatus === "processing"}
                  className="vintage-button bg-card text-foreground py-2 px-4"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={!stripe || paymentStatus === "processing"}
                  className="vintage-button py-2 px-4"
                >
                  {paymentStatus === "processing" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      PROCESSING...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      PAY ${deal.price.toFixed(2)}
                    </>
                  )}
                </button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  )
}
