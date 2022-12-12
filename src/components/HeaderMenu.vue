<template>
    <div>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button>
              
            </ion-button>
          </ion-buttons>
          <ion-title>{{title}}</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="presentActionSheet">
              <ion-icon class="custom-icon-headermenu" slot="icon-only" :icon="ellipsisVertical"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton, 
  IonButtons, 
  IonIcon,
  actionSheetController
} from "@ionic/vue";
import { ellipsisVertical, search, personCircle } from 'ionicons/icons';
import axios from 'axios';

export default defineComponent({
  name: 'HeaderMenu',
  props: {
    title: String
  },
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton, 
    IonButtons, 
    IonIcon
  },
  data () {
    return {
      user: null as any,
    }
  },
  methods: {
    async presentActionSheet(){
      const actionSheet = await actionSheetController.create({
        header: 'ESTADÍAS',
        cssClass: 'my-custom-class',
        buttons: [
          {
            text: 'CERRAR SESIÓN',
            role: 'destructive',
            data: {
              action: 'logout',
            },
          },
          {
            text: 'CANCELAR',
            role: 'cancel',
            data: {
              action: 'cancel',
            },
          },
        ],
      });
      await actionSheet.present();
      const res = await actionSheet.onDidDismiss();
      if(res.role === 'destructive'){
        this.logout();
      }else{
        return;
      }
    },
    async logout(){
        await axios.get('/auth/logout').then((Response) => {
          localStorage.clear();
          this.$router.push({name: 'login'})
        }).catch((error) => {
          console.log(error)
        });
    }
  },
  setup() {
    return { ellipsisVertical, search, personCircle };
  },
});
</script>

<style scoped>
.custom-icon-headermenu {
  color: #fc4311;
}
</style>