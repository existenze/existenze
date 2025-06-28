import Stripe from "stripe"

// Initialize Stripe with your secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16", // Use the latest API version
})

// Platform account ID (your Stripe account)
export const PLATFORM_ACCOUNT_ID = process.env.STRIPE_ACCOUNT_ID

// Platform fee percentage (e.g., 15%)
export const PLATFORM_FEE_PERCENT = 15
