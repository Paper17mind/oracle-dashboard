<template>
  <div>
    <v-row>
      <v-col cols="6" md="4">
        <v-card min-height="210px">
          <v-card-title>Member</v-card-title>
          <v-card-text>
            <v-list-item>
              <!-- <v-list-item-avatar></v-list-item-avatar> -->
              <v-list-item-content> Member Terdaftar </v-list-item-content>
              <v-list-item-action>
                <v-avatar color="secondary">
                  {{ data.member }}
                </v-avatar>
              </v-list-item-action>
            </v-list-item>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" md="4">
        <v-card>
          <v-card-title>Penjualan</v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item v-for="x in data.penjualan" :key="x.status">
                <v-list-item-avatar color="secondary">
                  {{ x.total }}
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-subtitle>
                    {{ x.status }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle v-if="data.sum_penjualan">
                    {{ data.sum_penjualan[x.status] }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- pembayaran -->
      <v-col cols="6" md="4">
        <v-card>
          <v-card-title>Status Pembayaran</v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item v-for="x in data.pembayaran" :key="x.status">
                <v-list-item-avatar color="secondary">
                  {{ x.total }}
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-subtitle>
                    {{ x.status }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-data-table :items="data.list_order" :search="search" :headers="headers">
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title>
                List Transaksi
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-text-field placeholder="Search" v-model="search" filled dense rounded class="mt-5"></v-text-field>
            </v-toolbar>
          </template>
          <template #item.price="{item}">
            {{formatPrice(item.price)}}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import api from "@/controller/transactions";
export default {
  data() {
    return {
      data: {
        penjualan: [],
        pembayaran: [],
        list_order:[],
        sum_penjualan: {},
      },
      search:null,
      headers:[
        { text: "Invoice", value: 'invoice' },
        { text: "Kategori", value: 'category' },
        { text: "No Member", value: 'customer_no' },
        { text: "HP Member", value: 'customer_id' },
        { text: "Harga", value: 'price' },
        { text: "Status", value: 'status' },
      ]
    };
  },
  mounted() {
    this.getReport();
  },
  methods: {
    getReport() {
      api.report().then((e) => {
        this.data = e.data.data;
      });
    },
  },
};
</script>
