import type { BedType, RoomOption } from '~/constants'

export type { BedType, RoomOption }

export interface Room {
  id: string
  title: string
  price: number
  bookedDateRanges: []
  conditions: {
    maxGuests: number
    square: number
    beds: {
      double: number
      single: number
    }
    options: RoomOption[]
  }
  images: {
    preview: RoomImage
    all: RoomImage[]
  }
}

export interface RoomImage {
  id: string
}
