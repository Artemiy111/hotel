import type { Room } from '~/types'

export const rooms: Room[] = [
  {
    id: '1',
    title: 'Обычный',
    price: 1200,
    bookedDateRanges: [],
    conditions: {
      maxPersons: 2,
      square: 15,
      beds: {
        double: 2,
        single: 0,
      },
      options: ['has-safe', 'has-shower'],
    },
    images: {
      preview: { id: '1' },
      all: [{ id: '1' }],
    },
  },
  {
    id: '2',
    title: 'Люкс',
    price: 1500,
    bookedDateRanges: [],
    conditions: {
      maxPersons: 3,
      square: 20,
      beds: {
        double: 2,
        single: 1,
      },
      options: ['has-safe', 'has-conditioner', 'has-shower'],
    },
    images: {
      preview: { id: '2' },
      all: [{ id: '1' }, { id: '3' }],
    },
  },
  {
    id: '3',
    title: 'Делюкс',
    price: 2000,
    bookedDateRanges: [],
    conditions: {
      maxPersons: 4,
      square: 40,
      beds: {
        double: 2,
        single: 2,
      },
      options: ['has-safe', 'has-conditioner', 'has-tub'],
    },
    images: {
      preview: { id: '4' },
      all: [
        {
          id: '1',
        },
        {
          id: '2',
        },
        {
          id: '3',
        },
        {
          id: '4',
        },
      ],
    },
  },
]
