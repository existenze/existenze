"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/logo"

export default function VerifyPage() {
  const router = useRouter()
  const [verificationCode, setVerificationCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  const handleVerify = () => {
    setIsLoading(true)

    // This would be replaced with an actual verification API call
    setTimeout(() => {
      setIsLoading(false)
      setIsVerified(true)

      // Redirect to dashboard after successful verification
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    }, 1500)
  }

  return (
    <div className="container flex h-screen items-center justify-center">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-2">
          <div className="mx-auto">
            <Logo size="large" />
          </div>
          <CardTitle className="text-2xl text-center">Verify Student ID</CardTitle>
          <CardDescription className="text-center">We've sent a verification code to your email</CardDescription>
        </CardHeader>
        <CardContent>
          {!isVerified ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="verification-code">Verification Code</Label>
                <Input
                  id="verification-code"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                />
              </div>
              <Button onClick={handleVerify} className="w-full" disabled={verificationCode.length !== 6 || isLoading}>
                {isLoading ? "Verifying..." : "Verify Student ID"}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 space-y-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
              <p className="text-center font-medium">Student ID successfully verified!</p>
              <p className="text-center text-sm text-muted-foreground">Redirecting you to your dashboard...</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Verification code expires in 10 minutes</span>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Didn't receive a code?{" "}
            <Button variant="link" className="h-auto p-0">
              Resend code
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
