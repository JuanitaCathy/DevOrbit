'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { ChatWidget } from '@/components/chat-widget';

const ChatWidgetWrapper = ({ roomId }: { roomId: string }) => {
  const { data: session } = useSession();

  const user = {
    id: session?.user?.id ?? 'unknown',
    name: session?.user?.name ?? 'Unknown User',
    avatar: session?.user?.image ?? '',
  };

  return <ChatWidget roomId={roomId} user={user} />;
};

export default ChatWidgetWrapper;
