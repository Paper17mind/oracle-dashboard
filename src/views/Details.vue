<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" md="7" class="px-2">
        <v-item-group mandatory @change="(e) => (selected = data[e])">
          <v-container>
            <v-row>
              <v-col v-for="n in data" :key="n.pulsa_code" cols="12" md="4">
                <v-item v-slot="{ active, toggle }">
                  <v-card
                    :color="active ? 'black' : ''"
                    class="d-flex align-center"
                    light
                    height="150"
                    @click="toggle"
                  >
                    <v-scroll-y-transition>
                      <div
                        v-if="active"
                        class="flex-grow-1 white--text text-center"
                      >
                        <div>
                          {{ n.pulsa_nominal }}
                        </div>
                        <span>
                          {{ formatPrice(n.pulsa_price) }}
                        </span>
                      </div>
                    </v-scroll-y-transition>
                    <v-card-text v-if="!active">
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ n.pulsa_op }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ n.pulsa_nominal }}
                          </v-list-item-subtitle>
                          <v-list-item-subtitle>
                            {{ formatPrice(n.pulsa_price) }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card-text>
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-container>
        </v-item-group>
  
      </v-col>
      <!-- product description -->
      <v-col cols="12" md="5" class="px-2">
        <v-card flat>
          <v-card-text>
            <v-img width="100%" :src="selected.icon_url" contain></v-img>
            <div>
              {{ selected.pulsa_details }}
            </div>
            <v-row no-gutters>
              <v-col cols="6" v-for="x in objKey" :key="x">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle
                      v-text="x.replace(/_/g, ' ')"
                      class="text-capitalize"
                    />
                    <v-list-item-title v-text="selected[x]" />
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Player ID" filled dense v-model="selected.hp" persistent-hint hint="156378300|8483"/>
              </v-col>
              <v-col cols="12">
                <!-- not required if user has login -->
                <v-text-field label="No Handphone" 
                  filled dense v-model="selected.no_hp">
                <template #prepend>
                  +62
                </template>
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card class="mt-2">
          <v-card-title>Pilih Metode Pembayaran</v-card-title>
          <v-card-title>
            <v-list dense rounded class="mx-auto">
              <v-list-item-group
                mandatory
                v-model="selected.payment"
                color="indigo"
              >
                <v-list-item
                  v-for="(x, i) in payments"
                  :key="i"
                  :value="x.channel_code"
                >
                  <v-list-item-title v-text="x.channel_code" />
                  <v-list-item-subtitle v-text="x.name" />
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-title>
          <v-card-actions>
            <v-btn rounded @click="topUp" block>Simpan</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import voucher from "@/controller/voucher.js";
import transactions from "@/controller/transactions.js";
export default {
  data() {
    return {
      data: [],
      payments: [],
      selected: {},
      overlay:false,
    };
  },
  computed: {
    objKey() {
      const hide = ["icon_url", "pulsa_details","hp","no_hp"];
      return Object.keys(this.selected).filter((x) => hide.indexOf(x) == -1);
    },
  },
  mounted() {
    const name = this.$route.params.id.replace(/[+]/g, " ");
    this.getData(name);
  },
  methods: {
    getData(name) {
      voucher.show(name).then((res) => {
        this.data = res.data.data;
        this.getPayment();
      });
    },
    getPayment() {
      transactions.payments().then((res) => {
        this.payments = res.data;
      });
    },
    topUp(){
      const {selected}  = this;
      if (!selected.payment || !selected.hp || !selected.no_hp) {
        this.$message({
          type:'error',
          message:"Harap lengkap data",
        })
        return false;
      }
      this.overlay = true
      transactions.store(this.selected).then((e)=>{
        this.$message({
          type:'success',
          message:e.data.message,
        })
        this.overlay = false
      }).catch(error => {
        this.$message({
          type:'error',
          message:error,
        })
        this.overlay = false
      })
    }
  },
};
</script>

<style lang="scss" scoped>
</style>