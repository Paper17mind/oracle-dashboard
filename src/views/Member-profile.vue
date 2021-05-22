<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="10">
      <v-list-item
        class="rounded-lg"
        style="background-color:#010100;height:100px"
      >
        <v-list-item-avatar>
          <v-icon>mdi-face</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ $store.state.user.role }}</v-list-item-title>
          <v-list-item-title>
            {{ $store.state.user.name }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action
          style="cursor:pointer"
          @click="$store.dispatch('logout')"
        >
          <v-icon size="45px">mdi-power</v-icon>
          <span>
            Logout
          </span>
        </v-list-item-action>
      </v-list-item>
    </v-col>
    <v-col cols="12" style="margin-top:-60px">
      <v-row justify="center">
        <v-col cols="3">
          <v-card hover height="150px" outlined>
            <v-card-title>Premium</v-card-title>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card hover height="150px" outlined>
            <v-card-title>Transaksi Paid</v-card-title>
            <v-card-text>
              <div class="title">
                {{ data.filter(x => x.status === "PAID").length }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="10">
      <v-data-table
        class="rounded-lg"
        :items="data"
        :search="search"
        :headers="headers"
      >
        <template #top>
          <v-toolbar flat>
            <v-toolbar-title>
              Riwayat Transaksi
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
              placeholder="Search"
              v-model="search"
              filled
              dense
              rounded
              class="mt-5"
            ></v-text-field>
          </v-toolbar>
        </template>
        <template #item.price="{item}">
          {{ formatPrice(item.price) }}
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import api from "@/controller/transactions";
import axios from "axios";
export default {
  data() {
    return {
      data: [],
      search: null,
      headers: [
        { text: "Invoice", value: "invoice" },
        { text: "Kategori", value: "category" },
        { text: "No Member", value: "customer_no" },
        { text: "HP Member", value: "customer_id" },
        { text: "Harga", value: "price" },
        { text: "Status", value: "status" }
      ]
    };
  },
  mounted() {
    this.getReport();
  },
  methods: {
    getReport() {
      api.index().then(e => {
        this.data = e.data.data;
      });
    }
  },
  beforeCreate() {
    axios.defaults.headers.common["Authorization"] = `Bearer ${atob(
      this.$route.query.token
    ).toString()}`;
  }
};
</script>

<style lang="scss" scoped></style>
