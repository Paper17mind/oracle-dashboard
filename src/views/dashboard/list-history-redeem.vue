<template>
  <div>
    <v-skeleton-loader
      v-if="loading"
      type="list-item-avatar-three-line,list-item-avatar-three-line,list-item-avatar-three-line"
    >
    </v-skeleton-loader>
    <v-data-table v-else :items="data" :headers="headers" :search="search">
      <template #top>
        <v-toolbar flat>
          <v-btn icon @click="$router.go(-1)">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title>Riwayat Membership</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            filled
            outlined
            rounded
            dense
            class="mt-5"
            placeholder="Pencarian"
          ></v-text-field>
        </v-toolbar>
      </template>
      <template #item.created_at="{ item }">
        {{ moment(item.created_at).format("lll") }}
      </template>
      <template #item.description="{ item }">
        <v-btn icon :href="item.description" target="_blank">
          <v-icon>mdi-information-outline</v-icon>
        </v-btn>
      </template>
      <template #item.is_active="{ item }">
        <v-icon :color="item.is_active ? 'success' : 'red'">
          {{ item.is_active ? "mdi-check-all" : "mdi-close" }}
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import pages from "../../controller/redeem";
import moment from "moment";
moment.locale("id");
export default {
  data() {
    return {
      moment,
      data: [],
      headers: [
        { text: "Tanggal", value: "created_at" },
        { text: "Kategori", value: "code" },
        { text: "User", value: "user.name" },
        { text: "Status", value: "status" },
        { text: "Link", value: "description" },
        { text: "Active", value: "is_active" },
      ],
      forms: {},
      search: null,
      loading: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      pages.index().then((res) => {
        this.data = res.data;
        this.loading = false;
      });
    },
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
