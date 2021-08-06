<template>
  <v-app>
    <v-slide-x-transition>
      <router-view></router-view>
    </v-slide-x-transition>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  metaInfo() {
    return {
      title: this.path,
      titleTemplate: "%s - Yellowins",
      htmlAttrs: {
        lang: "id",
        amp: true,
      },
    };
  },
  data() {
    return {
      path: "Dashboard",
    };
  },
  watch: {
    "$route.name"(val) {
      this.path = val;
    },
  },
  mounted() {
    this.$store.dispatch("checkAuth");
    this.$vuetify.theme.dark = true;
    if (this.$store.state.authentication) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${this.$store.state.authentication}`;
    }
  },
};
</script>

<style lang="scss" scoped></style>
