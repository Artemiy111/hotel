export interface Room {
  id: string
  title: string
  price: number
  conditions: {
    maxAdults: number
    maxChildren: number
    square: number
    other: string[]
  }
  images: {
    preview: RoomImage
    all: RoomImage[]
  }
}

export interface RoomImage {
  id: string
}
