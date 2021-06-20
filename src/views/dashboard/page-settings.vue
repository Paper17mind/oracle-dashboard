<template>
  <div>
    <v-skeleton-loader
      v-if="data.length == 0"
      type="list-item-avatar-three-line,list-item-avatar-three-line,list-item-avatar-three-line"
    ></v-skeleton-loader>
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
          <v-btn rounded @click="sheet = true">Add</v-btn>
        </v-toolbar>
      </template>

      <template v-slot:default="{ items }">
        <v-list dense>
          <v-list-item v-for="item in items" :key="item.id">
            <v-list-item-avatar>
              <v-img :src="item.photo"></v-img>
            </v-list-item-avatar>
            <v-list-item-content class="align-end">
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ item.description }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-chip pill>
                <v-icon right @click="edit(item)" color="warning">
                  mdi-pencil
                </v-icon>
                <v-divider vertical class="mx-4"></v-divider>
                <v-icon left @click="destroy(item)" color="error">
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
          v-text="index > -1 ? 'Edit Konten' : 'Tambah Konten'"
        ></v-card-title>
        <v-card-text>
          <v-text-field
            v-model="forms.title"
            placeholder="Title"
          ></v-text-field>
          <v-text-field
            v-model="forms.description"
            placeholder="Deskripsi"
          ></v-text-field>
          <v-file-input
            v-model="forms.file"
            @change="upload"
            placeholder="Photo"
          ></v-file-input>
          <img :src="forms.photo" width="100%" alt="Photo" />
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
import pages from '@/controller/pages'
export default {
  data() {
    return {
      data: [],
      sheet: false,
      forms: {},
      index: -1,
      search: null,
    }
  },
  watch: {
    sheet(val) {
      val || this.close()
    },
  },
  mounted() {
    pages.index(1).then((res) => {
      this.data = res
    })
  },
  methods: {
    edit(item) {
      this.index = this.data.indexOf(item)
      this.forms = Object.assign({}, item)
      this.sheet = true
    },
    close() {
      this.index = -1
      this.forms = {}
      this.sheet = false
    },
    upload() {
      this.forms.photo = URL.createObjectURL(this.forms.file)
    },
    save() {
      this.forms.is_slider = 1
      if (this.index > -1) {
        pages
          .update(this.forms)
          .then((res) => {
            Object.assign(this.data[this.index], res.data)
            this.$message({
              type: 'success',
              message: 'Data berhasil diupdate',
            })
            this.close()
          })
          .catch((e) => {
            this.$message({
              type: 'error',
              message: e,
            })
          })
      } else {
        pages
          .store(this.forms)
          .then((res) => {
            this.data.push(res.data)
            this.$message({
              type: 'success',
              message: 'Data berhasil diupdate',
            })
            this.close()
          })
          .catch((e) => {
            this.$message({
              type: 'error',
              message: e,
            })
          })
      }
    },
    destroy(item) {
      const c = confirm('Hapus data ?')
      if (!c) return false
      pages
        .destroy(item.id)
        .then((e) => {
          let i = this.data.indexOf(item)
          this.data.splice(i, 1)
        })
        .catch((e) => {
          this.$message({
            type: 'error',
            message: e,
          })
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
