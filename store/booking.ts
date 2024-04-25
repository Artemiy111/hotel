export const useBookingStore = defineStore('booking', () => {
  const checkIn = ref<Date | null>(null)
  const checkOut = ref<Date | null>(null)
  const guests = ref({
    adults: 1,
    children: 0,
    babies: 0,
    maxAdults: 10,
    maxChildren: 5,
    maxBabies: 5,
  })
  const countGuests = computed(() => guests.value.adults + guests.value.children + guests.value.babies)

  const canDecrement = (guests: number, min: number) => guests > min
  const canDecrementAdults = computed(() => canDecrement(guests.value.adults, 1))
  const canDecrementChildren = computed(() => canDecrement(guests.value.children, 0))
  const canDecrementBabies = computed(() => canDecrement(guests.value.babies, 0))

  const canIncrement = (guests: number, max: number) => guests < max
  const canIncrementAdults = computed(() => canIncrement(guests.value.adults, guests.value.maxAdults))
  const canIncrementChildren = computed(() => canIncrement(guests.value.children, guests.value.maxChildren))
  const canIncrementBabies = computed(() => canIncrement(guests.value.babies, guests.value.maxBabies))

  const incrementAdults = () => canIncrementAdults.value && guests.value.adults++
  const incrementChildren = () => canIncrementChildren.value && guests.value.children++
  const incrementBabies = () => canIncrementBabies.value && guests.value.babies++

  const decrementAdults = () => canDecrementAdults.value && guests.value.adults--
  const decrementChildren = () => canDecrementChildren.value && guests.value.children--
  const decrementBabies = () => canDecrementBabies.value && guests.value.babies--

  return {
    checkIn,
    checkOut,
    guests: readonly(guests),
    countGuests,
    canDecrementAdults,
    canDecrementChildren,
    canDecrementBabies,
    canIncrementAdults,
    canIncrementChildren,
    canIncrementBabies,

    incrementAdults,
    incrementChildren,
    incrementBabies,
    decrementAdults,
    decrementChildren,
    decrementBabies,
  }
})
