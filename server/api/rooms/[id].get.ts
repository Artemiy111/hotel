import { rooms } from '~/server/mocks/rooms'

export default defineEventHandler(async (event) => {
  const roomId = event.context.params!.id as string

  const room = rooms.find((room) => room.id == roomId) || null

  return room
})
