<script setup lang="ts">
import BookingPanel from '~/components/BookingPanel.vue'
import RoomCardFull from '~/components/RoomCardFull.vue'
import RoomGuestInfo from '~/components/RoomGuestInfo.vue'

// definePageMeta({
//   validate: async (route) => {
//     return /\w+/.test(route.params.id as string)
//   },
// })

interface CheckTimeOption {
  hour: number
  minute: number
}

const checkInTimeOptions: CheckTimeOption[] = [
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

const checkOutTimeOptions: CheckTimeOption[] = [
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
const checkOutTime = ref(checkOutTimeOptions.at(-1))

const route = useRoute()
const roomId = route.params.id as string
const { data: room, error: _error } = useFetch(`/api/rooms/${roomId}`)

interface GuestName {
  lastName: string
  name: string
  middleMane: string
}

const contactInfo = ref<{ guest: GuestName, email: string, tel: string }>({
  guest: { lastName: '', name: '', middleMane: '' },
  email: '',
  tel: '',
})

const isBookingForAnotherPerson = ref(false)

const guests = ref<GuestName[]>([])
const children = ref<Array<GuestName & { age: number }>>([])

function addGuestField(guestType: { isChild: boolean }) {
  if (guestType.isChild)
    children.value.push({ lastName: '', name: '', middleMane: '', age: 7 })
  else guests.value.push({ lastName: '', name: '', middleMane: '' })
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
</script>

<template>
  <div v-if="room" class="m-auto container">
    <RoomCardFull v-if="room" :room="room" :button="{ show: false }" />
    <!-- <RoomGalleria :room="room" /> -->
    <div class="mt-16 flex flex-col gap-16">
      <section class="flex flex-col gap-4">
        <h3 class="text-3xl font-bold">
          Заселение
        </h3>
        <BookingPanel :show-button="false" />
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
          <span>Заезд</span>
          <UDropdown v-model="checkInTime" class="min-w-32 w-fit" :options="checkInTimeOptions">
            <template #value="{ value: time }: { value: CheckTimeOption }">
              {{ time.hour }}:{{ time.minute === 0 ? '00' : time.minute }}
            </template>
            <template #option="{ option: time }: { option: CheckTimeOption }">
              {{ time.hour }}:{{ time.minute === 0 ? '00' : time.minute }}
            </template>
          </UDropdown>
          <span>Выезд</span>
          <UDropdown v-model="checkOutTime" class="min-w-32 w-fit" :options="checkOutTimeOptions">
            <template #value="{ value: time }: { value: CheckTimeOption }">
              {{ time.hour }}:{{ time.minute === 0 ? '00' : time.minute }}
            </template>
            <template #option="{ option: time }: { option: CheckTimeOption }">
              {{ time.hour }}:{{ time.minute === 0 ? '00' : time.minute }}
            </template>
          </UDropdown>
        </div>
      </section>
      <section class="flex flex-col gap-4">
        <h3 class="text-3xl font-bold">
          Контактные данные
        </h3>
        <UMessage class="w-fit">
          <template #container>
            <p class="p-6">
              На электронную почту вам придёт подтверждение бронирования.<br>
              При необходимости мы свяжемся с вами по телефону, чтобы уточнить детали
            </p>
          </template>
        </UMessage>
        <div class="flex flex-col gap-4">
          <RoomGuestInfo v-model="contactInfo.guest" />
          <div class="flex gap-4">
            <UInputGroup class="w-fit flex">
              <UInputGroupAddon>
                <div class="i-mingcute:mail-open-line" />
              </UInputGroupAddon>
              <UInputText
                v-model="contactInfo.email"
                placeholder="Email"
                type="email"
                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              />
            </UInputGroup>
            <UInputGroup class="w-fit flex">
              <UInputGroupAddon>
                <div class="i-mingcute:phone-line" />
              </UInputGroupAddon>
              <UInputText v-model="contactInfo.tel" placeholder="Телефон" type="tel" />
            </UInputGroup>
          </div>
        </div>
      </section>
      <section class="flex flex-col gap-4">
        <h3 class="text-3xl font-bold">
          Информация о гостях
        </h3>

        <div class="flex items-center gap-4">
          <label for="booking-for-another-person">Бронирую для другого человека</label>
          <UCheckbox
            v-model="isBookingForAnotherPerson"
            input-id="booking-for-another-person"
            binary
          />
        </div>
        <div class="flex flex-col gap-4">
          <RoomGuestInfo v-show="!isBookingForAnotherPerson" v-model="contactInfo.guest" />
          <div v-for="(guest, index) in guests" :key="index" class="flex gap-4">
            <!-- !FIX key -->
            <RoomGuestInfo v-model="guests[index]" />
            <UButton
              outlined
              severity="warning"
              @click="deleteGuestField(index, { isChild: false })"
            >
              <div class="i-mingcute:close-line" />
            </UButton>
          </div>
          <UButton class="w-fit" outlined label="" @click="addGuestField({ isChild: false })">
            Добавить гостя
          </UButton>
        </div>
        <div class="flex items-center gap-4">
          <label for="have-children">Дети</label>
          <UCheckbox v-model="haveChildren" input-id="have-children" binary />
        </div>
        <div v-if="haveChildren" class="flex flex-col gap-4">
          <div v-for="(child, index) in children" :key="index" class="flex gap-4">
            <!-- !FIX key -->
            <RoomGuestInfo :key="index" v-model="children[index]" />
            <UDropdown v-model="children[index].age" :options="childAgeOptions" class="w-40">
              <template #value="{ value: age }: { value: number }">
                {{ age }} лет
              </template>
            </UDropdown>
            <UButton
              outlined
              severity="warning"
              @click="deleteGuestField(index, { isChild: true })"
            >
              <div class="i-mingcute:close-line" />
            </UButton>
          </div>
          <UButton class="w-fit" outlined label="" @click="addGuestField({ isChild: true })">
            Добавить ребёнка
          </UButton>
        </div>
      </section>
      <section class="flex flex-col gap-4">
        <h3 class="text-3xl font-bold">
          Дополнительная информация
        </h3>
        <UTextarea
          v-model="wishes"
          class="max-w-3xl"
          placeholder="Напишите свои поделания. Мы постараемся их исполнить"
        />
      </section>
      <section class="flex flex-col gap-4">
        <h3 class="text-3xl font-bold">
          Оплата
        </h3>
        <UTabView class="w-fit">
          <UTabPanel :pt="{ headerAction: 'pl-0 text-2xl' }">
            <template #header>
              <h4 class="text-bold">
                При заселении
              </h4>
            </template>
            <template #default>
              <div class="flex flex-col items-start gap-4">
                <p class="max-w-5xl">
                  Выбирая этот способ оплаты, вы не вносите предоплату за бронь. Получите
                  подтверждение бронирования на электронную почту, которую указали при бронировании,
                  и предъявите его при заселении.
                </p>
                <UButton label="Забронировать" />
              </div>
            </template>
          </UTabPanel>
          <UTabPanel :pt="{ headerAction: 'text-2xl' }">
            <template #header>
              <h4>Банковской картой</h4>
            </template>
            <template #default>
              <div class="flex flex-col items-start gap-4">
                <span class="font-bold">
                  Предоплата: <span class="text-primary-500">{{ price }}р</span>
                </span>
                <p class="max-w-5xl">
                  Оплачивается вся сумма брони. Данный способ оплаты поддерживает платежи только с
                  карт, выпущенных российскими банками, а также с карт платежной системы Мир,
                  выпущенных банками других стран.
                </p>
                <UButton label="Оплатить" />
              </div>
            </template>
          </UTabPanel>
        </UTabView>
      </section>
    </div>
  </div>
</template>
