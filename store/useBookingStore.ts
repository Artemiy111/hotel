export const useBookingStore = () => {
  const bookingStore = useState<{ checkIn: Date | null; checkOut: Date | null }>(
    'booking-store',
    () => ({
      checkIn: null,
      checkOut: null,
    }),
  )
  return bookingStore
}
