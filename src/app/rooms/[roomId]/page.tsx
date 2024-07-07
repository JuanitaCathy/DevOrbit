import { TagsList } from '@/components/tags-list';
import { getRoom } from '@/data-access/rooms';
import { GithubIcon } from 'lucide-react';
import Link from 'next/link';
import TaskList from '@/components/task-list';
import { DevOrbitVideo } from './video-player';
import { splitTags } from '@/lib/utils';
import { unstable_noStore } from 'next/cache';
import Timer from '@/components/timer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ChatWidgetWrapper from '@/components/chat-widget-wrapper';

export default async function RoomPage(props: {
  params: { username: string; roomId: string };
}) {
  unstable_noStore();
  const roomId = props.params.roomId;

  const room = await getRoom(roomId);

  if (!room) {
    return <div>No room of this ID found</div>;
  }

  console.log(room);

  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="col-span-3 p-4 pr-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 min-h-screen">
          <DevOrbitVideo room={room} />
        </div>
      </div>

      <div className="col-span-1 p-4 pl-2">
        <Timer />
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
          <h1 className="text-base">{room?.name}</h1>

          {room.githubRepo && (
            <Link
              href={room.githubRepo}
              className="flex items-center gap-2 text-center text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon />
              Github Project
            </Link>
          )}

          <p className="text-base text-gray-600">{room?.description}</p>

          <TagsList tags={splitTags(room.tags)} />

          <Accordion type="single" collapsible>
            <AccordionItem value="excalidraw-session">
              <AccordionTrigger>Excalidraw Session</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm">Click below to join the session:</p>
                {room.excalidraw_url && (
                  <a
                    href={room.excalidraw_url}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join Excalidraw Session
                  </a>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <TaskList roomId={room.id} />
          <ChatWidgetWrapper roomId={room.id} />
        </div>
      </div>
    </div>
  );
}
