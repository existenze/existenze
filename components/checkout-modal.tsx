"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { AlertCircle, CheckCircle, CreditCard, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { processPayment } from "@/lib/payment"

// Load Stripe outside of component to avoid recreating it on each render
// Replace with your actual publishable key when in production
const stripePromise = loadStripe("pk_test_your_stripe_publishable_key")

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

      // Process the payment (in a real app, this would call your backend)
      await processPayment({
        paymentMethodId: paymentMethod.id,
        amount: deal.price * 100, // Convert to cents for Stripe
        dealId: deal.id,
        restaurantId: deal.restaurantId,
        customerEmail: values.email,
        customerName: values.name,
        // In a real implementation, you'd specify the commission percentage
        commissionPercentage: 15, // Second Course takes 15% of the transaction
      })

      setPaymentStatus("success")

      // In a real app, redirect to order confirmation page after a delay
      setTimeout(() => {
        router.push(`/orders/confirmation?dealId=${deal.id}`)
        onClose()
      }, 2000)
    } catch (err) {
      console.error("Payment failed:", err)
      setPaymentStatus("error")
      setErrorMessage(err.message || "Payment failed. Please try again.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Complete Your Purchase</DialogTitle>
          <DialogDescription>
            You're purchasing: {deal.discount} at {deal.restaurant}
          </DialogDescription>
        </DialogHeader>

        {paymentStatus === "success" ? (
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Payment Successful!
            </h3>
            <p className="text-center text-muted-foreground">
              Your order has been processed. Redirecting to your order confirmation...
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
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
                      <FormLabel>Card Details</FormLabel>
                      <FormControl>
                        <div className="rounded-md border border-input px-3 py-2">
                          <CardElement
                            options={{
                              style: {
                                base: {
                                  fontSize: "16px",
                                  color: "#424770",
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

                <div className="rounded-md bg-muted p-3">
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span className="text-primary">${deal.price.toFixed(2)}</span>
                  </div>
                </div>

                {paymentStatus === "error" && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Payment Failed</AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" type="button" onClick={onClose} disabled={paymentStatus === "processing"}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!stripe || paymentStatus === "processing"}
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  {paymentStatus === "processing" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Pay ${deal.price.toFixed(2)}
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  )
}
