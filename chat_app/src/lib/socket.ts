import { io } from "socket.io-client";

const ENDPOINT = "https://chatsocket-1-7r99.onrender.com";
const socket = io(ENDPOINT, { transports: ["websocket"] });

export default socket;
