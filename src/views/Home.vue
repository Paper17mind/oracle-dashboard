<template>
  <div>
    <v-carousel
      cycle
      height="400"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-row>
          <v-col cols="12" md="10" class="mx-auto">
            <v-card class="elevation-5">
              <v-img height="100%" :src="slide.photo"> </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <v-container>
      <v-row>
        <v-col v-for="(n, i) in data" :key="i" cols="2">
          <v-card
            :to="`/details/${n.name.replace(/\s/g,'+')}`"
            height="200"
            :img="n.icon"
          ></v-card>
        </v-col>
      </v-row>
    </v-container>
   
  </div>
</template>

<script>
import db from "@/store/dummy.json";
import pages from "@/controller/pages.js";
import voucher from "@/controller/voucher.js";
export default {
  data() {
    return {
      db,
      data:[],
      slides: [],
    };
  },
  mounted() {
    this.getSlide();
  },
  methods: {
    getSlide() {
      pages.index().then((e) => {
        this.slides = e;
        this.getVoucher()
      });
    },
    getVoucher(){
      voucher.list().then(e => {
        this.data = e;
      })
    }
  },
};
</script>