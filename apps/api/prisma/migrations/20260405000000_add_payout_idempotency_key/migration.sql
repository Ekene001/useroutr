-- AlterTable: add idempotencyKey and missing indexes to Payout
ALTER TABLE "Payout" ADD COLUMN "idempotencyKey" TEXT;
CREATE UNIQUE INDEX "Payout_idempotencyKey_key" ON "Payout"("idempotencyKey");

-- Add indexes
CREATE INDEX IF NOT EXISTS "Payout_merchantId_idx" ON "Payout"("merchantId");
CREATE INDEX IF NOT EXISTS "Payout_status_idx" ON "Payout"("status");
CREATE INDEX IF NOT EXISTS "Payout_batchId_idx" ON "Payout"("batchId");
CREATE INDEX IF NOT EXISTS "Payout_createdAt_idx" ON "Payout"("createdAt");
