import type { BedType, RoomOption } from '~/constants'

export type { BedType, RoomOption }

type BookedDateRangeDto = {
  roomId: number
  start: Date
  end: Date
}

export interface RoomDto {
  id: number
  title: string
  price: number
  bookedDateRanges: BookedDateRangeDto[]
  conditions: {
    maxGuests: number
    square: number
    beds: {
      double: number
      single: number
    }
    options: {
      hasSafe: boolean
      hasConditioner: boolean
      hasShower: boolean
      hasTub: boolean
    }
  }
  images: RoomImageDto[]

}

export interface RoomImageDto {
  id: number
  url: string
}

export interface CreateReservationGuest {
  name: string
  lastName: string
  middleName: string
  isChild: boolean
  age: number | null
}

export interface CreateReservation {
  roomId: number
  checkIn: Date
  checkOut: Date
  isPaid: boolean
  wishes: string | null
  totalPrice: number
  booker: {
    name: string
    lastName: string
    middleName: string
    email: string
    phone: string
  }

  guests: CreateReservationGuest[]
}

export interface ReservationDto {
  id: number
  roomId: number
  room: RoomDto
  checkIn: Date
  checkOut: Date
  isPaid: boolean
  wishes: string | null
  totalPrice: number
  booker: {
    name: string
    lastName: string
    middleName: string
    email: string
    phone: string
  }

  guests: CreateReservationGuest[]
}
