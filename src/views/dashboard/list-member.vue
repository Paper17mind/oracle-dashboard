<template>
  <div>
    <v-data-iterator :items="data" :search="search">
      <template v-slot:header>
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

      <template v-slot:default="{ items }">
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
      </template>
    </v-data-iterator>
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
      search: null
    };
  },
  mounted() {
    member.index().then(({ data }) => {
      this.data = data.data;
    });
  }
};
</script>

<style lang="scss" scoped></style>
