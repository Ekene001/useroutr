"use client";

import { Modal, Button } from "@tavvio/ui";
import { CopySimple, QrCode, WhatsappLogo, Envelope, ChatCircleText } from "@phosphor-icons/react";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { QRCodeModal } from "./QRCodeModal";

interface LinkCreatedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  linkUrl: string;
  linkName: string;
  onViewQR?: () => void;
}

export function LinkCreatedModal({
  open,
  onOpenChange,
  linkUrl,
  linkName,
  onViewQR,
}: LinkCreatedModalProps) {
  const [copied, setCopied] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(linkUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = (platform: "whatsapp" | "email" | "sms") => {
    const encodedUrl = encodeURIComponent(linkUrl);
    const encodedText = encodeURIComponent(`Check out this payment link: ${linkName}`);
    
    let shareUrl: string;
    
    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(linkName)}&body=${encodedText}%20${encodedUrl}`;
        break;
      case "sms":
        shareUrl = `sms:?body=${encodedText}%20${encodedUrl}`;
        break;
    }
    
    window.open(shareUrl, "_blank");
  };

  return (
    <>
      <Modal
        open={open}
        onOpenChange={onOpenChange}
        title="Link Created!"
        description="Your payment link is ready to share"
        footer={
          <div className="flex justify-end">
            <Button type="button" onClick={() => onOpenChange(false)}>
              Done
            </Button>
          </div>
        }
      >
        <div className="space-y-6">
          {/* URL + Copy */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--foreground)]">
              Payment Link
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 truncate rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)]">
                {linkUrl}
              </div>
              <Button
                type="button"
                variant={copied ? "primary" : "outline"}
                size="sm"
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <CopySimple size={16} weight="fill" className="text-[var(--green)]" />
                    Copied!
                  </>
                ) : (
                  <>
                    <CopySimple size={16} />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* QR Code Preview */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--foreground)]">
              QR Code
            </label>
            <div className="flex items-center justify-center rounded-lg border border-[var(--border)] bg-white p-4">
              <QRCodeSVG
                value={linkUrl}
                size={150}
                level="H"
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowQRModal(true)}
              >
                <QrCode size={16} />
                View Full Size
              </Button>
            </div>
          </div>

          {/* Share Options */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--foreground)]">
              Share via
            </label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => handleShare("whatsapp")}
                className="flex-1"
              >
                <WhatsappLogo size={18} weight="fill" className="text-[var(--green)]" />
                WhatsApp
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => handleShare("email")}
                className="flex-1"
              >
                <Envelope size={18} weight="fill" className="text-[var(--blue)]" />
                Email
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => handleShare("sms")}
                className="flex-1"
              >
                <ChatCircleText size={18} weight="fill" className="text-[var(--green)]" />
                SMS
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Full-size QR Modal */}
      <QRCodeModal
        open={showQRModal}
        onOpenChange={setShowQRModal}
        url={linkUrl}
        linkName={linkName}
      />
    </>
  );
}
