"use client";

import { useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export function usePaymentSocket(paymentId: string) {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!paymentId) return;

    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      query: { paymentId },
    });

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));
    socket.on("payment:status", (data: { status: string }) => {
      setStatus(data.status);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [paymentId]);

  return { connected, status, socket: socketRef.current };
}
