<template>
  <div class="container fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" md="6">
        <v-card :loading="loading">
          <v-card-title>
            <v-img
              height="100px"
              contain
              :src="require('@/assets/images/logo1.png')"
            ></v-img>
          </v-card-title>
          <v-card-text>
            <v-text-field
              placeholder="No Hp/Email"
              v-model="forms.phone"
              persistent-hint
              autofocus
              :hint="forms.asMember ? '89663710152' : '0123456789'"
            >
              <template #prepend>
                <div class="pa-0 pt-2">+62</div>
              </template>
            </v-text-field>
            <v-text-field
              v-if="!forms.asMember"
              placeholder="password"
              v-model="forms.password"
              persistent-hint
              hint="password"
              :type="show ? 'text' : 'password'"
              :append-outer-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-outer="show = !show"
              v-on:keyup.enter="login"
            >
              <template #prepend>
                <v-icon>mdi-lock</v-icon>
              </template>
            </v-text-field>
            <v-divider class="my-5"></v-divider>
            <!-- <v-checkbox
              v-model="forms.asMember"
              label="Login As Member"
            ></v-checkbox> -->
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="grey"
              :disabled="!forms.phone || loading"
              :loading="loading"
              rounded
              block
              @click="login"
            >
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      forms: {},
      on_reg: false,
      show: false,
      loading: false,
    };
  },
  computed: {
    isEmail() {
      if (!this.forms.phone) return false;
      return this.forms.phone.match(/[a-z A-Z]/g);
    },
  },
  methods: {
    login() {
      if (this.isEmail) {
        this.forms.email = this.forms.phone;
      }
      this.$store.dispatch("login", this.forms);
    },
    register() {
      this.loading = true;
      axios.post("auth/register").then((res) => {
        this.on_reg = true;
        this.$message({
          type: "success",
          message:
            "Registrasi berhasil, silahkan masukkan otp yang sudah dikirim ke Whatsapp",
        });
        this.loading = false;
      });
    },
  },
  beforeCreate() {
    axios.get("user").then((res) => {
      res.data.role === "Admin"
        ? this.$router.push("/admin")
        : this.$router.push("/member");
    });
  },
};
</script>

<style lang="scss" scoped></style>
