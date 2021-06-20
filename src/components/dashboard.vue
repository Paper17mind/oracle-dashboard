<template>
  <v-app id="inspire" dark>
    <v-system-bar app>
      {{ $route.path }}
      <v-spacer></v-spacer>
      {{ $store.state.user.name }}/
      {{ $store.state.user.role }}
      <v-icon class="ml-4">mdi-account</v-icon>
    </v-system-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-sheet class="pa-4">
        <v-img class="my-8" :src="require('@/assets/images/logo.png')"></v-img>
      </v-sheet>
      <v-divider></v-divider>
      <v-list dense rounded>
        <v-list-item
          v-for="[icon, text, route] in links"
          :key="icon"
          link
          :to="route"
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template #append>
        <v-list-item @click="$store.dispatch('logout')">
          <v-list-item-avatar><v-icon>mdi-power</v-icon></v-list-item-avatar>
          <v-list-item-content class="pl-4">
            <v-list-item-title>Logout</v-list-item-title>
            <v-list-item-subtitle>Keluar dari halaman</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-scroll-y-reverse-transition>
          <router-view></router-view>
        </v-scroll-y-reverse-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    cards: ['Today', 'Yesterday'],
    drawer: null,
    links: [
      ['mdi-cash-multiple', 'Penjualan Voucher', '/admin'],
      ['mdi-account-group', 'List Member', '/admin/member'],
      ['mdi-history', 'Status Pembayaran', '/admin/transaction-callback'],
      ['mdi-ticket-account', 'Redeem', '/admin/redeem'],
      ['mdi-settings', 'Pengaturan Halaman', '/admin/page-setting'],
      ['mdi-newspaper', 'Pengaturan Konten', '/admin/content-setting'],
      ['mdi-image', 'Pengaturan Icon', '/admin/list-image'],
    ],
  }),
}
</script>
