import { db } from '@/db';
import { Room, room } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { like } from 'drizzle-orm';
import { getSession } from '@/lib/auth';
import randomstring from 'randomstring';

export async function getRooms(search: string | undefined) {
  const where = search ? like(room.tags, `%${search}%`) : undefined;
  const rooms = await db.query.room.findMany({
    where,
  });
  return rooms;
}

export async function getUserRooms() {
  const session = await getSession();
  if (!session) {
    throw new Error('User not authenticated');
  }
  const rooms = await db.query.room.findMany({
    where: eq(room.userId, session.user.id),
  });

  return rooms;
}

export async function getRoom(roomId: string) {
  return await db.query.room.findFirst({
    where: eq(room.id, roomId),
  });
}

export async function deleteRoom(roomId: string) {
  await db.delete(room).where(eq(room.id, roomId));
}

export async function createRoom(
  roomData: Omit<Room, 'id' | 'userId' | 'excalidraw_url'>,
  userId: string,
) {
  const firstPart = randomstring.generate({
    length: 20,
    charset: 'hex',
    capitalization: 'lowercase',
  });

  const secondPart = randomstring.generate({
    length: 22,
    readable: true,
  });

  const excalidrawUrl = `https://excalidraw.com/#room=${firstPart},${secondPart}`;

  console.log('Generated Excalidraw URL:', excalidrawUrl); // Debug log

  const inserted = await db
    .insert(room)
    .values({ ...roomData, userId, excalidraw_url: excalidrawUrl })
    .returning();

  console.log('Inserted room:', inserted[0]); // Debug log

  return inserted[0];
}

export async function editRoom(
  roomData: Omit<Room, 'userId' | 'excalidraw_url'>,
) {
  const firstPart = randomstring.generate({
    length: 20,
    charset: 'hex',
    capitalization: 'lowercase',
  });

  const secondPart = randomstring.generate({
    length: 22,
    readable: true,
  });

  const excalidrawUrl = `https://excalidraw.com/#room=${firstPart},${secondPart}`;

  console.log('Generated Excalidraw URL:', excalidrawUrl); // Debug log

  const updated = await db
    .update(room)
    .set({ ...roomData, excalidraw_url: excalidrawUrl })
    .where(eq(room.id, roomData.id))
    .returning();

  return updated[0];
}
