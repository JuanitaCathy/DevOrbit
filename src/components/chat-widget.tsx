'use client';

import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { MessageCircle } from 'lucide-react';

const socket: Socket = io('http://localhost:4000');

interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
}

interface Props {
  roomId: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
}

export const ChatWidget: React.FC<Props> = ({ roomId, user }) => {
  const [isChatPanelDisplayed, setIsChatPanelDisplayed] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');

  useEffect(() => {
    socket.emit('joinRoom', roomId);

    socket.on('receiveMessage', (message: Message) => {
      setMessages((prevMessages) => {
        if (prevMessages.find((msg) => msg.id === message.id)) {
          return prevMessages;
        }
        return [...prevMessages, message];
      });
    });
  }, [roomId]);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedMessage = messageInput.trim();
    if (trimmedMessage === '') return;

    const newMessage: Message = {
      id: `${Date.now()}`,
      text: trimmedMessage,
      senderId: user.id,
      senderName: user.name,
      senderAvatar: user.avatar,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    socket.emit('sendMessage', newMessage, roomId);
    setMessageInput('');
  };

  return isChatPanelDisplayed ? (
    <div className="fixed bottom-10 right-10 text-white shadow-lg rounded-lg">
      <div className="flex h-96 w-72 flex-col bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
        <div className="flex justify-end p-2 border-b border-gray-700">
          <button
            onClick={() => setIsChatPanelDisplayed(false)}
            className="cursor-pointer text-white p-2 px-4 hover:bg-gray-600 rounded-full"
          >
            X
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-2 flex items-start ${
                message.senderId === user.id ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.senderId !== user.id && (
                <img
                  src={message.senderAvatar}
                  alt={`${message.senderName}'s avatar`}
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}
              <div
                className={`p-2 rounded-lg ${
                  message.senderId === user.id
                    ? 'bg-blue-500 text-right'
                    : 'bg-gray-700 text-left'
                }`}
              >
                {message.senderId !== user.id && (
                  <div className="font-bold">{message.senderName}</div>
                )}
                {message.text}
              </div>
              {message.senderId === user.id && (
                <img
                  src={message.senderAvatar}
                  alt={`${message.senderName}'s avatar`}
                  className="w-8 h-8 rounded-full ml-2"
                />
              )}
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSendMessage}
          className="flex p-2 border-t border-gray-700"
        >
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 p-1 rounded-lg focus:outline-none focus:border-blue-500 text-white"
            placeholder=" type your msg here :)"
          />
          <button
            type="submit"
            className="cursor-pointer bg-blue-500 p-2 px-4 text-white hover:bg-blue-600 rounded-lg ml-2"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  ) : (
    <button
      onClick={() => setIsChatPanelDisplayed(true)}
      className="fixed bottom-10 right-10 cursor-pointer bg-blue-500 p-4 text-white hover:bg-blue-600 rounded-full shadow-lg"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
};
