"use client";

import { useState } from "react";
import { Button, Input } from "@tavvio/ui";

export default function VerifyPage() {
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call verify endpoint
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-[400px] space-y-8">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Verify your email
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We sent a verification code to your email address
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="code"
            type="text"
            label="Verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit code"
            className="text-center text-lg tracking-widest"
            maxLength={6}
            required
          />

          <Button type="submit" className="w-full">
            Verify
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Didn&apos;t receive a code?{" "}
          <Button variant="link">Resend</Button>
        </p>
      </div>
    </div>
  );
}
