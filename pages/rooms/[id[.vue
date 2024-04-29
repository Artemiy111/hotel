<script setup lang="ts">
import BookingPanel from '~/components/BookingPanel.vue'
import RoomCardFull from '~/components/RoomCardFull.vue'
import RoomGuestInfo from '~/components/RoomGuestInfo.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'

interface TimeOption {
  hour: number
  minute: number
}

function timePad(time: number) {
  return time.toString().padStart(2, '0')
}
function timeToString(time: TimeOption) {
  return `${timePad(time.hour)}:${timePad(time.minute)}`
}
const checkInTimeOptions: TimeOption[] = [
  { hour: 14, minute: 0 },
  { hour: 14, minute: 30 },
  { hour: 15, minute: 0 },
  { hour: 16, minute: 30 },
  { hour: 17, minute: 0 },
  { hour: 17, minute: 30 },
  { hour: 18, minute: 0 },
  { hour: 19, minute: 30 },
  { hour: 20, minute: 0 },
  { hour: 20, minute: 30 },
  { hour: 21, minute: 0 },
  { hour: 22, minute: 30 },
  { hour: 23, minute: 0 },
  { hour: 23, minute: 30 },
]
const checkInTime = ref(checkInTimeOptions[0])

const checkOutTimeOptions: TimeOption[] = [
  { hour: 0, minute: 0 },
  { hour: 0, minute: 30 },
  { hour: 1, minute: 0 },
  { hour: 1, minute: 30 },
  { hour: 2, minute: 0 },
  { hour: 3, minute: 30 },
  { hour: 4, minute: 0 },
  { hour: 4, minute: 30 },
  { hour: 5, minute: 0 },
  { hour: 5, minute: 30 },
  { hour: 6, minute: 0 },
  { hour: 6, minute: 30 },
  { hour: 7, minute: 0 },
  { hour: 7, minute: 30 },
  { hour: 8, minute: 0 },
  { hour: 8, minute: 30 },
  { hour: 9, minute: 0 },
  { hour: 9, minute: 30 },
  { hour: 10, minute: 0 },
  { hour: 10, minute: 30 },
  { hour: 11, minute: 0 },
  { hour: 11, minute: 30 },
  { hour: 12, minute: 0 },
]

const checkOutTime = ref(checkOutTimeOptions.at(-1)!)

const route = useRoute()
const roomId = route.params.id as string
const { data: room, error: _error } = useFetch(`/api/rooms/${roomId}`, {
  transform: (room) => {
    if (!room) return null
    return {
      ...room,
      bookedDateRanges: room.bookedDateRanges.map(r => ({ start: new Date(r.start), end: new Date(r.end) })),
    }
  },
})

interface GuestName {
  lastName: string
  name: string
  middleName: string
}

const contactInfo = ref<{ guest: GuestName, email: string, tel: string }>({
  guest: { lastName: '', name: '', middleName: '' },
  email: '',
  tel: '',
})

const isBookingForAnotherPerson = ref(false)

const guests = ref<GuestName[]>([])
const children = ref<Array<GuestName & { age: number }>>([])

function addGuestField(guestType: { isChild: boolean }) {
  if (guestType.isChild)
    children.value.push({ lastName: '', name: '', middleName: '', age: 7 })
  else guests.value.push({ lastName: '', name: '', middleName: '' })
}

function deleteGuestField(index: number, guestType: { isChild: boolean }) {
  if (guestType.isChild)
    children.value.splice(index, 1)
  else guests.value.splice(index, 1)
}

const haveChildren = ref(false)

const childAgeOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

const wishes = ref('')

const price = ref(6000)

const tab = ref<'1' | '2'>('1')
</script>

<template>
  <div
    v-if="room"
    class="m-auto container"
  >
    <RoomCardFull
      v-if="room"
      :room="room"
      :button="{ show: false }"
    />
    <div class="mt-16 flex flex-col gap-16">
      <section class="flex flex-col gap-4">
        <h3 class="text-3xl font-bold">
          Заселение
        </h3>
        <BookingPanel
          :show-button="false"
          :booked-date-ranges="room.bookedDateRanges"
        />
      </section>
      <section class="flex flex-col gap-4">
        <h3 class="text-3xl font-bold">
          Время заезда и выезда
        </h3>
        <p>
          Вы можете выбрать удобное для вас время заезда и выезда<br>
          Услуга позднего выезда предоставляется за дополнительную плату<br>
          Стандартное время заезда — 14:00, выезда — 12:00
        </p>
        <div class="grid grid-cols-[min-content_1fr] items-center gap-4">
          <Label for="check-in-time">Заезд</Label>
          <Select
            :model-value="JSON.stringify(checkInTime)"
            @update:model-value="(timeString) => checkInTime = JSON.parse(timeString) "
          >
            <SelectTrigger
              id="check-in-time"
              class="w-max"
            >
              <SelectValue>{{ timeToString(checkInTime) }}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="time in checkInTimeOptions"
                :key="time.toString()"
                :value="JSON.stringify(time)"
              >
                {{ timeToString(time) }}
              </SelectItem>
            </SelectContent>
          </Select>
          <Label for="check-out-time">Выезд</Label>
          <Select
            :model-value="JSON.stringify(checkOutTime)"
            @update:model-value="(timeString) => checkOutTime = JSON.parse(timeString) "
          >
            <SelectTrigger
              id="check-out-time"
              class="w-max"
            >
              <SelectValue>{{ timeToString(checkOutTime) }}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="time in checkOutTimeOptions"
                :key="time.toString()"
                :value="JSON.stringify(time)"
              >
                {{ timeToString(time) }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>
      <section class="flex flex-col gap-4">
        <h3 class="text-3xl font-bold">
          Контактные данные
        </h3>
        <Alert class="w-fit bg-blue-50">
          <AlertTitle>
            Важно
          </AlertTitle>
          <AlertDescription>
            На электронную почту вам придёт подтверждение бронирования.<br>
            При необходимости мы свяжемся с вами по телефону, чтобы уточнить детали
          </AlertDescription>
        </Alert>
        <div class="flex flex-col gap-4">
          <RoomGuestInfo v-model="contactInfo.guest" />
          <div class="flex gap-4">
            <div class="relative w-full max-w-sm items-center">
              <Input
                v-model="contactInfo.email"
                class="pl-10"
                placeholder="Email"
                type="email"
                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              />
              <div class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
                <Icon name="mingcute:mail-open-line" />
              </div>
            </div>

            <div class="relative w-full max-w-sm items-center">
              <Input
                v-model="contactInfo.tel"
                placeholder="Телефон"
                type="tel"
                class="pl-10"
              />
              <div class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
                <Icon name="mingcute:phone-line" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="flex flex-col gap-4">
        <h3 class="text-3xl font-bold">
          Информация о гостях
        </h3>

        <div class="flex items-center gap-4">
          <Label for="booking-for-another-person">Бронирую для другого человека</Label>
          <Checkbox
            id="booking-for-another-person"
            v-model="isBookingForAnotherPerson"
          />
        </div>
        <div class="flex flex-col gap-4">
          <RoomGuestInfo
            v-show="!isBookingForAnotherPerson"
            v-model="contactInfo.guest"
          />
          <div
            v-for="(guest, index) in guests"
            :key="guest.toString()"
            class="flex gap-4"
          >
            <RoomGuestInfo v-model="guests[index]" />
            <Button
              variant="outline"
              class="border-red-500 hover:bg-red-100 text-red-500 hover:text-red-800"
              @click="deleteGuestField(index, { isChild: false })"
            >
              <Icon name="mingcute:close-line" />
            </Button>
          </div>
          <Button
            class="w-fit"
            variant="outline"
            @click="addGuestField({ isChild: false })"
          >
            Добавить гостя
          </Button>
        </div>
        <div class="flex items-center gap-4">
          <Label for="have-children">Дети</Label>
          <Checkbox
            id="have-children"
            v-model:checked="haveChildren"
          />
        </div>
        <div
          v-if="haveChildren"
          class="flex flex-col gap-4"
        >
          <div
            v-for="(child, index) in children"
            :key="child.toString()"
            class="flex gap-4"
          >
            <RoomGuestInfo v-model="children[index]" />
            <Select
              :model-value="children[index].age.toString()"
              @update:model-value="(ageString) => child.age = Number(ageString)"
            >
              <SelectTrigger class="w-max">
                <SelectValue>{{ child.age }}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="age in childAgeOptions"
                  :key="age"
                  :value="age.toString()"
                >
                  {{ age }}
                </SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              class="border-red-500 hover:bg-red-100 text-red-500 hover:text-red-800"
              @click="deleteGuestField(index, { isChild: true })"
            >
              <Icon name="mingcute:close-line" />
            </Button>
          </div>
          <Button
            class="w-fit"
            variant="outline"
            @click="addGuestField({ isChild: true })"
          >
            Добавить ребёнка
          </Button>
        </div>
      </section>
      <section class="flex flex-col gap-4">
        <h3 class="text-3xl font-bold">
          Дополнительная информация
        </h3>
        <Textarea
          v-model="wishes"
          class="max-w-3xl"
          placeholder="Напишите свои пожелания. Мы постараемся их исполнить"
        />
      </section>
      <section class="flex flex-col gap-4">
        <h3 class="text-3xl font-bold">
          Оплата
        </h3>

        <Tabs v-model="tab">
          <TabsList>
            <TabsTrigger value="1">
              <h4 class="text-bold">
                При заселении
              </h4>
            </TabsTrigger>
            <TabsTrigger value="2">
              <h4 class="text-bold">
                Предоплата картой
              </h4>
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="1"
            class=""
          >
            <div class="flex flex-col gap-4 max-w-lg">
              <p>
                Выбирая этот способ оплаты, вы не вносите предоплату за бронь. Получите
                подтверждение бронирования на электронную почту, которую указали при бронировании,
                и предъявите его при заселении.
              </p>
              <Button class="w-fit">
                Забронировать
              </Button>
            </div>
          </TabsContent>
          <TabsContent
            value="2"
            class=""
          >
            <div class="flex flex-col gap-4 max-w-lg">
              <p>
                Оплачивается вся сумма брони. Данный способ оплаты поддерживает платежи только с
                карт, выпущенных российскими банками, а также с карт платежной системы Мир,
                выпущенных банками других стран.
              </p>
              <Button class="w-fit">
                Оплатить
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  </div>
</template>
