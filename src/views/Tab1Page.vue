<template>
  <ion-page>
    <HeaderMenu title="BIENVENIDO" />
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-row class="ion-padding">
        <ion-col size="12">
          <ion-card class="estadias">
            <ion-card-header>
              <ion-card-title class="card-title">ESTADÍAS <ion-icon :icon="documentTextOutline" /></ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-row>
                <ion-col size="12">
                  <ion-text color="tertiary">
                    <h2>{{user.name}} {{user.paterno}} {{user.materno}}</h2>
                  </ion-text>
                  <br>
                </ion-col>
                <ion-col size="12">
                  <ion-text color="tertiary">
                    <h1>{{items.titulo}}</h1>
                  </ion-text>
                  <br>
                </ion-col>
                <ion-col size="10">
                  <ion-text color="danger">
                    <h2>Carta de Aceptación</h2>
                  </ion-text>
                </ion-col>
                <ion-col size="2" v-if="items.ct_ac > 0">
                  <ion-icon :icon="checkmark" size="large"/>
                </ion-col>
                <ion-col size="2" v-else>
                  <ion-icon :icon="close" size="large"/>
                </ion-col>
                <ion-col size="10">
                  <ion-text color="danger">
                    <h2>Carta de Precentación</h2>
                  </ion-text>
                </ion-col>
                <ion-col size="2" v-if="items.ct_pr > 0">
                  <ion-icon :icon="checkmark" size="large"/>
                </ion-col>
                <ion-col size="2" v-else>
                  <ion-icon :icon="close" size="large"/>
                </ion-col>
                <ion-col size="10">
                  <ion-text color="danger">
                    <h2>Reportes</h2>
                  </ion-text>
                </ion-col>
                <ion-col size="2" v-if="items.report > 0">
                  <ion-icon :icon="checkmark" size="large"/>
                </ion-col>
                <ion-col size="2" v-else>
                  <ion-icon :icon="close" size="large"/>
                </ion-col>
                <ion-col size="10">
                  <ion-text color="danger">
                    <h2>Evaluaciones</h2>
                  </ion-text>
                </ion-col>
                <ion-col size="2" v-if="items.eval > 0">
                  <ion-icon :icon="checkmark" size="large"/>
                </ion-col>
                <ion-col size="2" v-else>
                  <ion-icon :icon="close" size="large"/>
                </ion-col>
                <ion-col size="10">
                  <ion-text color="danger">
                    <h2>Carta de Liberación	</h2>
                  </ion-text>
                </ion-col>
                <ion-col size="2" v-if="items.ct_li > 0">
                  <ion-icon :icon="checkmark" size="large"/>
                </ion-col>
                <ion-col size="2" v-else>
                  <ion-icon :icon="close" size="large"/>
                </ion-col>
              </ion-row>
            </ion-card-content>
          </ion-card>
        </ion-col>
        <ion-col size="12">
          <ion-card color="primary">
            <ion-card-header>
              <ion-card-title class="card-title">INFORMACIÓN</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-row>
                <ion-col size="6">
                  <h2>Entregado </h2>
                </ion-col>
                <ion-col size="6">
                  <ion-icon :icon="checkmark" size="large"/>
                </ion-col>
                <ion-col size="6">
                  <h2>No Entregado</h2>
                </ion-col>
                <ion-col size="6">
                  <ion-icon :icon="close" size="large"/>
                </ion-col>
              </ion-row>
            </ion-card-content>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonContent, IonRefresher, IonRefresherContent, IonRow, IonCol, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonText } from '@ionic/vue';
import HeaderMenu from '@/components/HeaderMenu.vue';
import axios from 'axios';
import { documentTextOutline, checkmark, close } from 'ionicons/icons';

export default defineComponent({
  name: 'Tab1Page',
  components: {
    HeaderMenu, IonContent, IonPage, IonRefresher,
    IonRefresherContent, IonRow, IonCol, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonText
  },
  data() {
    return {
      items: {} as any,
      user: {} as any
    }
  },
  methods: {
    async getProject() {
      await axios.get(`/app/getproject/${localStorage.getItem('user')}`).then(response => {
        this.items = response.data;
        this.user = response.data.user;
      }).catch((error) => {
        console.log(error);
      });
    },
    handleRefresh(ev: any){
      this.getProject();
      setTimeout(() => {
        ev.target.complete();
      }, 2000);
    },
    ionViewWillEnter() {
      this.getProject();
    },
  },
  setup() {
    return {
      documentTextOutline,
      checkmark,
      close
    }
  }
});
</script>

<style scoped>
ion-refresher {
  z-index: 1;
}

ion-refresher>>>ion-spinner {
  --color: #fc4311;
}

.estadias {
  --background: #97ebb7;
  --color: #000 !important;
}

ion-icon {
  color: black;
}

.card-title {
  color: #000 !important;
}

.custom-card-title{
  font-size: 15px;
}
</style>