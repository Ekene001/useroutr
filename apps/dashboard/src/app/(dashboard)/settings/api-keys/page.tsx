"use client";

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Skeleton,
  useToast,
} from "@tavvio/ui";
import {
  useMerchantProfile,
  useGenerateApiKey,
  useRevokeApiKey,
} from "@/hooks/useSettings";
import { motion } from "framer-motion";
import {
  KeyRound,
  Copy,
  Trash2,
  AlertTriangle,
  ShieldCheck,
  TestTube,
  Zap,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.35, ease: "easeOut" },
  }),
};

export default function ApiKeysPage() {
  const { toast } = useToast();
  const { isLoading: isLoadingProfile } = useMerchantProfile();
  const generateApiKey = useGenerateApiKey();
  const revokeApiKey = useRevokeApiKey();

  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showRevokeModal, setShowRevokeModal] = useState(false);
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);
  const [selectedKeyType, setSelectedKeyType] = useState<"live" | "test">(
    "live",
  );
  const [revokeConfirmText, setRevokeConfirmText] = useState("");
  const [newKey, setNewKey] = useState("");
  const [hasGeneratedKey, setHasGeneratedKey] = useState(false);

  const handleGenerateKey = () => {
    generateApiKey.mutate(selectedKeyType, {
      onSuccess: (data) => {
        setNewKey(data.key);
        setHasGeneratedKey(true);
        setShowGenerateModal(false);
        setShowNewKeyModal(true);
      },
      onError: (err) =>
        toast(err.message || "Failed to generate API key.", "error"),
    });
  };

  const handleRevokeKey = () => {
    if (revokeConfirmText !== "REVOKE") return;

    revokeApiKey.mutate(undefined, {
      onSuccess: () => {
        setHasGeneratedKey(false);
        setShowRevokeModal(false);
        setRevokeConfirmText("");
        toast("API key has been revoked.", "success");
      },
      onError: (err) =>
        toast(err.message || "Failed to revoke API key.", "error"),
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard!", "success");
  };

  if (isLoadingProfile) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-6 w-24" />
            <Skeleton className="mt-1 h-4 w-56" />
          </div>
          <Skeleton className="h-10 w-40" />
        </div>
        <Skeleton className="h-20 w-full rounded-2xl" />
        <Skeleton className="h-28 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber/10">
            <KeyRound size={20} className="text-amber" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold tracking-tight text-foreground">
              API Keys
            </h2>
            <p className="text-xs text-muted-foreground">
              Manage your API keys for integration
            </p>
          </div>
        </div>
        <Button onClick={() => setShowGenerateModal(true)}>
          <Zap size={15} />
          Generate Key
        </Button>
      </motion.div>

      {/* Warning */}
      <motion.div
        className="flex items-start gap-3 rounded-2xl border border-amber/20 bg-amber/5 p-4"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        <AlertTriangle
          size={18}
          className="mt-0.5 shrink-0 text-amber"
        />
        <div>
          <p className="text-sm font-medium text-amber">
            API keys are shown once at creation.
          </p>
          <p className="text-xs text-amber/70">
            Store them securely in your environment variables.
          </p>
        </div>
      </motion.div>

      {/* Key Status */}
      <motion.div
        className="surface overflow-hidden"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={2}
      >
        {hasGeneratedKey ? (
          <div className="flex items-center justify-between p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green/10">
                <ShieldCheck size={18} className="text-green" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <code className="font-mono text-sm text-foreground tracking-wide">
                    ••••••••••••••••••••
                  </code>
                  <span className="inline-flex items-center rounded-lg bg-green/10 px-2 py-0.5 text-[11px] font-semibold text-green">
                    Active
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Full key is only shown at creation
                </p>
              </div>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowRevokeModal(true)}
            >
              <Trash2 size={14} />
              Revoke
            </Button>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary">
              <KeyRound size={20} className="text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">
              No API key configured
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Generate one to start integrating with Tavvio
            </p>
          </div>
        )}
      </motion.div>

      {/* Sandbox info */}
      <motion.div
        className="surface p-5"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={3}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue/10">
            <TestTube size={16} className="text-blue" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Sandbox Mode
            </h3>
            <p className="text-xs text-muted-foreground">
              Use{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[11px] text-foreground">
                ur_test_
              </code>{" "}
              keys to test without real money on Stellar testnet
            </p>
          </div>
        </div>
      </motion.div>

      {/* Generate Key Dialog */}
      <Dialog open={showGenerateModal} onOpenChange={setShowGenerateModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Generate New API Key</DialogTitle>
            <DialogDescription>
              {hasGeneratedKey
                ? "This will replace your existing API key"
                : "Select the type of API key you want to generate"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {hasGeneratedKey && (
              <div className="flex items-start gap-3 rounded-xl border border-amber/20 bg-amber/5 p-4">
                <AlertTriangle
                  size={16}
                  className="mt-0.5 shrink-0 text-amber"
                />
                <p className="text-xs text-amber">
                  Generating a new key will revoke your existing one. Any
                  integration using the current key will stop working.
                </p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedKeyType("live")}
                className={`rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                  selectedKeyType === "live"
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border/60 hover:border-border hover:bg-secondary/50"
                }`}
              >
                <Zap
                  size={18}
                  className={
                    selectedKeyType === "live"
                      ? "text-primary"
                      : "text-muted-foreground"
                  }
                />
                <p className="mt-2 font-semibold text-foreground">Live</p>
                <p className="text-xs text-muted-foreground">
                  For production
                </p>
              </button>
              <button
                onClick={() => setSelectedKeyType("test")}
                className={`rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                  selectedKeyType === "test"
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border/60 hover:border-border hover:bg-secondary/50"
                }`}
              >
                <TestTube
                  size={18}
                  className={
                    selectedKeyType === "test"
                      ? "text-primary"
                      : "text-muted-foreground"
                  }
                />
                <p className="mt-2 font-semibold text-foreground">Test</p>
                <p className="text-xs text-muted-foreground">
                  For sandbox
                </p>
              </button>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={handleGenerateKey}
              loading={generateApiKey.isPending}
            >
              Generate Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Key Dialog */}
      <Dialog open={showNewKeyModal} onOpenChange={setShowNewKeyModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>API Key Generated</DialogTitle>
            <DialogDescription>
              Copy this key now. It will not be shown again.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-xl border border-amber/20 bg-amber/5 p-4">
              <AlertTriangle
                size={16}
                className="mt-0.5 shrink-0 text-amber"
              />
              <p className="text-xs text-amber">
                This key will only be shown once. Copy it now.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-secondary/50 p-3">
              <code className="flex-1 font-mono text-sm text-foreground break-all">
                {newKey}
              </code>
              <button
                onClick={() => copyToClipboard(newKey)}
                className="shrink-0 rounded-lg p-2 text-muted-foreground hover:bg-background hover:text-foreground transition-colors"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Done</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Revoke Key Dialog */}
      <Dialog open={showRevokeModal} onOpenChange={setShowRevokeModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Revoke API Key</DialogTitle>
            <DialogDescription>This action cannot be undone</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4">
              <AlertTriangle
                size={16}
                className="mt-0.5 shrink-0 text-destructive"
              />
              <p className="text-xs text-destructive">
                Revoking this key will immediately break any integration
                using it. This action cannot be undone.
              </p>
            </div>
            <Input
              label='Type "REVOKE" to confirm'
              value={revokeConfirmText}
              onChange={(e) => setRevokeConfirmText(e.target.value)}
              placeholder="REVOKE"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleRevokeKey}
              loading={revokeApiKey.isPending}
              disabled={revokeConfirmText !== "REVOKE"}
            >
              Revoke Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
