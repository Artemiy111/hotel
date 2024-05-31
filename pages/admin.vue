<script setup lang="ts">
import { useToast } from '~/components/ui/toast'
import { useAuthStore } from '~/store/auth'
import type { ReservationDto } from '~/types'

const { $api } = useNuxtApp()

const authStore = useAuthStore()

const { toast } = useToast()
watch(() => authStore.isAuthed, () => {
  if (!authStore.isAuthed) navigateTo('/auth')
}, {
  immediate: true,
})

const deleteReservation = async (id: number) => {
  try {
    await $api(`reservations/${id}`, {
      method: 'DELETE',
    })
    toast({ variant: 'success', title: 'Бронь отменена' })
    refresh()
  }
  catch (_e) {
    toast({ variant: 'destructive', title: 'Не удалось отменить бронь' })
  }
}

const { data: reservations, refresh } = useAsyncData(() => $api<ReservationDto[]>('/reservations'), {
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
        <TableHead>
          Сумма бронирования
        </TableHead>
        <TableHead>
          Отменить бронирование
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
          {{ r.booker.lastName }} {{ r.booker.name }} {{ r.booker.middleName }}
        </TableCell>
        <TableCell>
          {{ r.booker.email }}
        </TableCell>
        <TableCell>
          {{ r.wishes }}
        </TableCell>
        <TableCell>
          {{ r.totalPrice }}р
        </TableCell>
        <TableCell>
          <Button @click="deleteReservation(r.id)">
            Отменить
          </Button>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
