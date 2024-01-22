import type { Room } from '~/types'

export const rooms: Room[] = [
  {
    id: '1',
    title: 'Обычный',
    price: 1200,
    conditions: {
      maxAdults: 2,
      maxChildren: 2,
      square: 10,
      other: ['Wi-Fi', 'Двуспальная кровать'],
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
    conditions: {
      maxAdults: 2,
      maxChildren: 3,
      square: 20,
      other: ['Wi-Fi', 'Двуспальная кровать', 'Сейф'],
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
    conditions: {
      maxAdults: 4,
      maxChildren: 6,
      square: 25,
      other: ['Wi-Fi', 'Двуспальная кровать', 'Сейф', 'Душевая кабина', 'Кондиционер'],
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
