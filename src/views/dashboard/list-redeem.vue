<template>
  <div>
    <v-skeleton-loader
      v-if="loading"
      type="list-item-avatar-three-line,list-item-avatar-three-line,list-item-avatar-three-line"
    >
    </v-skeleton-loader>
    <v-data-iterator v-else :items="data" :search="search">
      <template v-slot:header>
        <v-toolbar class="mb-2 rounded-lg" color="secondary" dark flat>
          <v-text-field
            class="mt-5"
            v-model="search"
            rounded
            dense
            placeholder="Search"
            filled
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn rounded @click="sheet = true">Tambah</v-btn>
          <v-divider vertical class="mx-4"></v-divider>
          <v-btn rounded to="/admin/redeem-history"> Riwayat </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:default="{ items }">
        <v-list dense>
          <v-list-item v-for="item in items" :key="item.id">
            <v-list-item-avatar color="white">
              <v-img
                width="10px"
                contain
                :src="require('@/assets/svgs/solid/ticket-alt.svg')"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content class="align-end">
              <v-list-item-title>
                <h3>Kode Redeem: {{ item.redeem_code }}</h3>
              </v-list-item-title>
              <v-list-item-subtitle>
                Kategori: {{ item.redeem_category }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                Berlaku: {{ item.redeem_available }} Hari
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                Expired: {{ moment(item.expired).format("lll") }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-chip pill>
                <v-icon left @click="edit(item)" color="warning">
                  mdi-pencil
                </v-icon>
                <v-divider vertical class="mx-4"></v-divider>
                <v-icon right @click="destroy(item)" color="error">
                  mdi-delete
                </v-icon>
              </v-chip>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </template>
    </v-data-iterator>
    <v-bottom-sheet max-width="600px" v-model="sheet" scrollable>
      <v-card>
        <v-card-title
          v-text="index > -1 ? 'Edit Data' : 'Tambah Data'"
        ></v-card-title>
        <v-card-text>
          <v-row no-gutters justify="space-between">
            <v-col cols="12">
              <v-select
                v-model="forms.redeem_category"
                placeholder="Kategori"
                :items="['Silver', 'Gold', 'Bronze']"
              ></v-select>
            </v-col>
            <v-col cols="6" class="px-1">
              <v-text-field
                type="number"
                v-model="forms.redeem_available"
                placeholder="Berlaku (hari)"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="forms.expired"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="forms.expired"
                    label="Picker in menu"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="forms.expired" no-title>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(forms.expired)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="close" rounded color="secondary">Tutup</v-btn>
          <v-btn @click="save" rounded color="success">Simpan</v-btn>
        </v-card-actions>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
import pages from "@/controller/redeem-code";
import moment from "moment";
moment.locale("id");
export default {
  data() {
    return {
      moment,
      data: [],
      sheet: false,
      forms: {},
      index: -1,
      search: null,
      loading: false,
      menu: false,
    };
  },
  watch: {
    "forms.redeem_category"(val) {
      if (val === "Bronze") {
        this.forms.redeem_available = 5;
      } else if (val === "Silver") {
        this.forms.redeem_available = 20;
      } else if (val === "Gold") {
        this.forms.redeem_available = 28;
      }
    },
    sheet(val) {
      val || this.close();
    },
  },
  mounted() {
    this.loading = true;
    pages.index().then((res) => {
      this.data = res.data;
      this.loading = false;
    });
  },
  methods: {
    edit(item) {
      this.index = this.data.indexOf(item);
      this.forms = Object.assign({}, item);
      this.sheet = true;
    },
    close() {
      this.index = -1;
      this.forms = {};
      this.sheet = false;
    },
    upload() {
      this.forms.photo = URL.createObjectURL(this.forms.file);
    },
    save() {
      if (this.index > -1) {
        pages
          .update(this.forms)
          .then((res) => {
            Object.assign(this.data[this.index], res.data.data);
            this.$message({
              type: "success",
              message: "Data berhasil diupdate",
            });
            this.close();
          })
          .catch((e) => {
            this.$message({
              type: "error",
              message: e,
            });
          });
      } else {
        pages
          .store(this.forms)
          .then((res) => {
            this.data.push(res.data.data);
            this.$message({
              type: "success",
              message: "Data berhasil diupdate",
            });
            this.close();
          })
          .catch((e) => {
            this.$message({
              type: "error",
              message: e,
            });
          });
      }
    },
    destroy(item) {
      const c = confirm("Hapus data ?");
      if (!c) return false;
      pages
        .destroy(item.id)
        .then((e) => {
          let i = this.data.indexOf(item);
          this.data.splice(i, 1);
        })
        .catch((e) => {
          this.$message({
            type: "error",
            message: e,
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
