export const BED_TYPES = {
  double: {
    title: 'Двуспальная',
  },
  separate: {
    title: 'Отдельная',
  },
}

export type BedType = keyof typeof BED_TYPES

export const ROOM_OPTIONS = {
  'has-safe': {
    title: 'Сейф',
  },
  'has-conditioner': {
    title: 'Кондиционер',
  },
  'has-tub': {
    title: 'Ванная',
  },
  'has-shower': {
    title: 'Душ',
  },
}

export type RoomOption = keyof typeof ROOM_OPTIONS
