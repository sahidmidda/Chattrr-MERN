import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({ children }) => {
    const socket = useRef();
    const { userInfo } = useAppStore();

    useEffect(() => {
        if (userInfo) {
            socket.current = io(HOST, {
                withCredentials: true,
                query: { userId: userInfo.id }
            });
            socket.current.on("connect", () => {
                console.log('Connected to socket server')
            })

            const handleReceiveMessage = (messageData) => {
                const { selectedChatType, selectedChatData, addMessage, addContactsInDMContacts } = useAppStore.getState();
                if (
                    selectedChatType !== undefined
                    &&
                    (selectedChatData._id === messageData.sender._id || selectedChatData._id === messageData.recipient._id)
                ) {
                    console.log("message received: ", messageData);
                    addMessage(messageData);
                }
                addContactsInDMContacts(messageData);
            }

            const handleReceiveChannelMessage = (messageData) => {
                const { selectedChatType, selectedChatData, addMessage, addChannelInChannelList } = useAppStore.getState();
                if (selectedChatType !== undefined && selectedChatData._id === messageData.channelId) {
                    console.log("channel message received: ", messageData);
                    addMessage(messageData);
                }
                addChannelInChannelList(messageData);
            }

            socket.current.on("receiveMessage", handleReceiveMessage)

            socket.current.on("receive-channel-message", handleReceiveChannelMessage)

            return () => {
                socket.current.disconnect();
            }
        }
    }, [userInfo])

    return (
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    )
}