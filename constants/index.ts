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
  hasSafe: {
    title: 'Сейф',
  },
  hasConditioner: {
    title: 'Кондиционер',
  },
  hasTub: {
    title: 'Ванная',
  },
  hasShower: {
    title: 'Душ',
  },
}

export type RoomOption = keyof typeof ROOM_OPTIONS
