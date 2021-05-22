<template>
  <v-skeleton-loader v-if="data.length == 0" type="table"> </v-skeleton-loader>
  <v-data-table :search="search" :items="data" :headers="headers" v-else>
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title> Status Pembayaran </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          placeholder="Pencarian.."
          rounded
          filled
          dense
          class="mt-6"
          v-model="search"
        ></v-text-field>
      </v-toolbar>
    </template>
    <template #item.created_at="{ item }">
      {{ moment(item.created_at).fromNow() }}
    </template>
  </v-data-table>
</template>

<script>
import api from "@/controller/transactions";
import moment from "moment";
moment.locale("id");
export default {
  data() {
    return {
      moment,
      data: [],
      search: null,
      headers: [
        { text: "Status", value: "status" },
        { text: "Invoice", value: "external_id" },
        { text: "Pembayaran", value: "payment_method" },
        { text: "Dibuat", value: "created_at" },
      ],
    };
  },
  mounted() {
    api.callback().then((res) => {
      this.data = res.data.data;
    });
  },
};
</script>

<style lang="scss" scoped>
</style>