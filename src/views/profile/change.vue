<template>
  <v-row justify="center">
    <v-col cols="12" md="8">
      <v-card class="mx-5">
        <v-card-title>Edit profile</v-card-title>
        <v-card-text>
          <v-row no-gutters>
            <v-col cols="12">
              <v-text-field v-model="forms.name" label="Nama"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="number"
                v-model="forms.phone"
                label="Telp"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="email"
                v-model="forms.email"
                label="Email"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="password"
                v-model="forms.password"
                label="password"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="save" elevation="0" rounded>Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import member from "../../controller/member";
export default {
  data() {
    return {
      forms: {},
    };
  },
  mounted() {
    this.forms = Object.assign({}, this.$store.state.user);
  },
  methods: {
    save() {
      member.updateUser(this.forms, this.forms.id).then((res) => {
        this.$store.commit("user", res.data);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>