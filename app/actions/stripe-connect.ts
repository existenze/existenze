"use server"

import { stripe } from "@/lib/stripe"
import { redirect } from "next/navigation"

/**
 * Create a Stripe Connect account for a restaurant
 */
export async function createConnectAccount(formData: FormData) {
  const email = formData.get("email") as string
  const restaurantName = formData.get("restaurantName") as string
  const userId = formData.get("userId") as string

  try {
    // Create a Connect Express account
    const account = await stripe.accounts.create({
      type: "express",
      email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      business_type: "company",
      business_profile: {
        name: restaurantName,
        product_description: "Restaurant deals for students",
      },
      metadata: {
        userId,
      },
    })

    // Create an account link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.NEXT_PUBLIC_BASE_URL}/restaurant/onboarding/refresh`,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/restaurant/onboarding/complete`,
      type: "account_onboarding",
    })

    // Store the account ID in your database (mock implementation)
    console.log(`Created Stripe account ${account.id} for restaurant ${restaurantName}`)

    // Redirect to the Stripe hosted onboarding
    redirect(accountLink.url)
  } catch (error) {
    console.error("Error creating Connect account:", error)
    throw new Error("Failed to create Connect account")
  }
}

/**
 * Process a payment using Stripe Connect
 */
export async function processConnectPayment(
  paymentMethodId: string,
  amount: number,
  restaurantId: string,
  dealId: number,
  customerEmail: string,
  platformFeePercent = 15,
) {
  try {
    // Get the restaurant's connected account ID (in a real app, fetch from your database)
    const connectedAccountId = await getRestaurantStripeAccountId(restaurantId)

    // Calculate the platform fee
    const platformFeeAmount = Math.round((amount * platformFeePercent) / 100)

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method: paymentMethodId,
      amount: amount, // in cents
      currency: "usd",
      confirmation_method: "manual",
      confirm: true,
      application_fee_amount: platformFeeAmount,
      transfer_data: {
        destination: connectedAccountId,
      },
      metadata: {
        dealId: dealId.toString(),
        restaurantId,
      },
      receipt_email: customerEmail,
    })

    return {
      success: true,
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
    }
  } catch (error) {
    console.error("Error processing Connect payment:", error)
    throw new Error("Payment failed")
  }
}

/**
 * Mock function to get a restaurant's Stripe account ID
 * In a real app, you would fetch this from your database
 */
async function getRestaurantStripeAccountId(restaurantId: string): Promise<string> {
  // This is a mock implementation
  // In a real app, you would fetch the account ID from your database
  const mockAccountMapping = {
    rest_123: "acct_123456789",
    rest_456: "acct_987654321",
    rest_789: "acct_456789123",
    // Add more mappings as needed
  }

  const accountId = mockAccountMapping[restaurantId as keyof typeof mockAccountMapping]

  if (!accountId) {
    throw new Error(`No Stripe account found for restaurant ${restaurantId}`)
  }

  return accountId
}

/**
 * Check if a restaurant's Stripe account is properly set up
 */
export async function checkAccountStatus(accountId: string) {
  try {
    const account = await stripe.accounts.retrieve(accountId)

    return {
      id: account.id,
      payoutsEnabled: account.payouts_enabled,
      chargesEnabled: account.charges_enabled,
      detailsSubmitted: account.details_submitted,
      requirements: account.requirements,
    }
  } catch (error) {
    console.error("Error checking account status:", error)
    throw new Error("Failed to check account status")
  }
}

/**
 * Create a login link for a connected account
 */
export async function createLoginLink(accountId: string) {
  try {
    const loginLink = await stripe.accounts.createLoginLink(accountId)
    return loginLink.url
  } catch (error) {
    console.error("Error creating login link:", error)
    throw new Error("Failed to create login link")
  }
}
