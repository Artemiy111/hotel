export type Room = {
  id: string
  title: string
  price: number
  conditions: {
    square: number
    other: string[]
  }
  images: {
    preview: RoomImage
    all: RoomImage[]
  }
}

export type RoomImage = {
  id: string
}
