export function useBookingStore() {
  const bookingStore = useState(
    'booking-store',
    () => ({
      checkIn: null,
      checkOut: null,
      countGuests: {
        adults: 1,
        children: 0,
      },
    } satisfies {
      checkIn: Date | null
      checkOut: Date | null
      countGuests: {
        adults: number
        children: number
      }
    }),
  )
  return bookingStore
}
