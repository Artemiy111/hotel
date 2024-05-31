<script setup lang="ts">
import { useAuthStore } from '~/store/auth'
import type { ReservationDto } from '~/types'

const { $api } = useNuxtApp()

const authStore = useAuthStore()

watch(() => authStore.isAuthed, () => {
  if (!authStore.isAuthed) navigateTo('/auth')
}, {
  immediate: true,
})

const { data: reservations } = useLazyAsyncData(() => $api<ReservationDto[]>('/reservations'), {
  transform: (rs) => {
    return rs.map((r) => {
      return {
        ...r,
        checkIn: new Date(r.checkIn),
        checkOut: new Date(r.checkOut),
      } satisfies ReservationDto
    })
  },
})

const formatter = new Intl.DateTimeFormat('ru')
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>
          Id Комнаты
        </TableHead>
        <TableHead>
          Время заезда
        </TableHead>
        <TableHead>
          Время выезда
        </TableHead>
        <TableHead>
          Заказчик
        </TableHead>
        <TableHead>
          Email
        </TableHead>
        <TableHead>
          Пожелания
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow
        v-for="r in reservations"
        :key="r.id"
      >
        <TableCell>
          {{ r.roomId }}
        </TableCell>
        <TableCell>
          {{ formatter.format(r.checkIn) }}
        </TableCell>
        <TableCell>
          {{ formatter.format(r.checkOut) }}
        </TableCell>

        <TableCell>
          {{ r.booker.lastName }} {{ r.booker.name }} {{ r.booker.lastName }}
        </TableCell>
        <TableCell>
          {{ r.booker.email }}
        </TableCell>
        <TableCell>
          {{ r.wishes }}
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
