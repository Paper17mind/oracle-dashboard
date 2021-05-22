<template>
  <v-app id="inspire">
    <v-app-bar app dense elevate-on-scroll>
      <v-toolbar-title>
        <v-img
          class="elevation-10"
          height="30px"
          contain
          :src="require('@/assets/images/logo.png')"
        ></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-divider class="mx-3" vertical></v-divider>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-slide-y-reverse-transition>
        <router-view></router-view>
      </v-slide-y-reverse-transition>
    </v-main>
    <v-footer>
      <v-row justify="center" align="center">
        <v-col cols="12" md="5">
          <img
            data-v-7cb4fa7d=""
            :src="require('@/assets/images/logo.png')"
            alt="Oracle"
            width="150px"
            style="padding-bottom: 40px;"
          />
          <h4 data-v-7cb4fa7d="" class="title">Info Kontak</h4>
          <p data-v-7cb4fa7d="">
            <i data-v-7cb4fa7d="" class="fas fa-map-marker-alt"></i> Jalan xxxx
            No.xx Kec.xxxx, Kel. xxxx, Kota xxxx
          </p>
          <p data-v-7cb4fa7d="">
            <i data-v-7cb4fa7d="" class="fas fa-phone-alt"></i>
            012-3456-7890
          </p>
          <p data-v-7cb4fa7d="">
            <i data-v-7cb4fa7d="" class="fas fa-envelope"></i>
            customer@oracle.com
          </p>
        </v-col>
        <v-col cols="12" md="3" class="align-content-center">
          <h4 data-v-7cb4fa7d="" class="title">Social Media</h4>
          <v-list color="transparent" data-v-7cb4fa7d="" class="social-icon">
            <v-list-item>
              <v-list-item-content>
                <a href="#">
                  <v-icon style="font-size:50px" color="primary darken-3">
                    mdi-facebook
                  </v-icon>
                </a>
              </v-list-item-content>
              <v-list-item-content>
                <a href="#" class="red--text">
                  <v-icon style="font-size:50px" color="red">
                    mdi-youtube
                  </v-icon>
                </a>
              </v-list-item-content>
              <v-list-item-content>
                <a href="#">
                  <v-icon style="font-size:50px" color="cyan">
                    mdi-twitter
                  </v-icon>
                </a>
              </v-list-item-content>
              <v-list-item-content>
                <a href="#">
                  <v-icon style="font-size:50px" color="red darken-3">
                    mdi-instagram
                  </v-icon>
                </a>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="4">
          <h4 data-v-7cb4fa7d="" class="title">Download App</h4>
          <div
            data-v-7cb4fa7d=""
            style="display: flex; justify-content: center; margin: 16px 0px;"
          >
            <a
              data-v-7cb4fa7d=""
              aria-label="android"
              style="margin-right: 8px"
            >
              <img
                src="https://ecs7.tokopedia.net/assets-unify/img/ic-download-android.svg"
                height="50px"
              /> </a
            ><a data-v-7cb4fa7d="" aria-label="ios" class="unf-footer-ios">
              <img
                src="https://ecs7.tokopedia.net/assets-unify/img/ic-download-ios.svg"
                height="50px"
              />
            </a>
          </div>
        </v-col>
        <v-col cols="12">
          <div
            data-v-7cb4fa7d=""
            class="row text-center"
            style="justify-content: center;"
          >
            <a data-v-7cb4fa7d="" style="color: rgb(255, 255, 255);">
              Copyright © 2021 <span data-v-7cb4fa7d="">Oracle.</span> All right
              reserved.
            </a>
          </div>
          <hr data-v-7cb4fa7d="" />
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>
<style scoped>
a {
  text-decoration: none;
}
</style>
