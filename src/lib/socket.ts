// socket.ts
import { io } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const socket = io(URL, {
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: 10,
  transports: ["websocket"],
});
