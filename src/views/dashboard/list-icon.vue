<template>
  <div>
    <v-row v-if="data.length == 0">
      <v-col cols="6" md="2" v-for="x in 15" :key="x">
        <v-skeleton-loader type="image"></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else>
      <!-- <v-col cols="12">
        <v-toolbar flat></v-toolbar>
      </v-col> -->
      <v-col cols="6" md="2" v-for="x in data" :key="x.name">
        <v-card>
          <v-img :src="x.url"></v-img>
          <v-card-actions>
            <small class="text-wrap">
              {{ x.imageable_id }}
            </small>
            <v-spacer></v-spacer>
            <v-btn icon color="primary" @click="edit(x)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-bottom-sheet scrollable v-model="modal" max-width="400px">
      <v-card>
        <v-card-title>
          <v-avatar>
            <v-img :src="forms.url"></v-img>
          </v-avatar>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="forms.imageable_id"></v-text-field>
          <v-file-input
            v-model="forms.file"
            placeholder="upload image"
          ></v-file-input>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn rounded elevation="0" @click="close" color="primary">
            Close
          </v-btn>
          <v-btn rounded elevation="0" @click="save" color="primary">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      data: [],
      forms: {},
      modal: false,
      index: -1
    };
  },
  watch: {
    modal(val) {
      val || this.close();
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    edit(item) {
      this.index = this.data.findIndex(x => x.id == item.id);
      this.forms = Object.assign({}, item);
      this.$nextTick().then(() => (this.modal = true));
    },
    close() {
      this.index = -1;
      this.forms = {};
      this.modal = false;
    },
    save() {
      const { forms } = this;
      let fd = new FormData();
      fd.append("id", forms.id);
      fd.append("imageable_id", forms.imageable_id);
      if (forms.file) {
        fd.append("file", forms.file);
        fd.append("url", URL.createObjectURL(forms.file));
      }
      axios.post("admin/list-image", fd).then(res => {
        Object.assign(this.data[this.index], res.data);
        this.close();
      });
    },
    getData() {
      axios.get("admin/list-image").then(res => {
        this.data = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
