<template>
  <div>
    <v-data-table
      :loading="loading"
      :items="data"
      :headers="headers"
      :search="search"
    >
      <template #top>
        <v-toolbar class="mb-2 rounded-lg" color="secondary darken-5" dark flat>
          <v-toolbar-title>List Member</v-toolbar-title>
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
      <template #item.premium="{ item }">
        {{ category(item) }}
      </template>
      <template #item.is_active="{ item }">
        <v-icon :color="item.is_active ? 'success' : 'warning'">
          mdi-circle
        </v-icon>
      </template>
      <!-- <template v-slot:default="{ items }">
        <v-list dense>
          <v-list-item v-for="item in items" :key="item.id">
            <v-list-item-avatar>
              <v-icon>mdi-face</v-icon>
            </v-list-item-avatar>
            <v-list-item-content class="align-end">
              <v-list-item-title>
                {{ item.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ item.email }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ moment(item.created_at).fromNow() }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon :color="item.is_active ? 'success' : 'warning'">
                mdi-circle
              </v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </template> -->
    </v-data-table>
  </div>
</template>

<script>
import member from "@/controller/member.js";
import moment from "moment";
moment.locale("id");
export default {
  data() {
    return {
      moment,
      data: [],
      search: null,
      loading: false,
      headers: [
        { text: "Nama", value: "name" },
        { text: "Email", value: "email" },
        { text: "Telp", value: "phone" },
        { text: "Alamat", value: "address" },
        { text: "Kategori", value: "premium" },
        { text: "Active", value: "is_active" },
      ],
    };
  },
  mounted() {
    this.loading = true;
    member.index().then(({ data }) => {
      this.data = data.data;
      this.loading = false;
    });
  },
  methods: {
    category(item) {
      return item.premium
        .map(function (v) {
          v.category =
            v.code.search("Gold") > -1
              ? "Gold"
              : v.code.search("Bronze") > -1
              ? "Bronze"
              : v.code.search("Silver") > -1
              ? "Silver"
              : "Premium";
          return v.category;
        })
        .toString();
    },
  },
};
</script>

<style lang="scss" scoped></style>
