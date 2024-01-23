interface BookingStore {
  checkIn: Date | null
  checkOut: Date | null
  countGuests: {
    adults: number
    children: number
  }
}

export function useBookingStore() {
  const bookingStore = useState<BookingStore>(
    'booking-store',
    () => ({
      checkIn: null,
      checkOut: null,
      countGuests: {
        adults: 1,
        children: 0,
      },
    }),
  )
  return bookingStore
}
