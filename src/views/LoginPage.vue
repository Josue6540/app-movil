<template>
    <ion-page>
    <ion-content :fullscreen="true" class="background-image-login">
        <div class="fullheight xc">
            <ion-row class="ion-padding">
                <ion-col size="12">
                  <div align="center">
                    <ion-img :src="'/assets/img/tics.png'" alt="Logo" class="logo-image-login"></ion-img>
                  </div>
                </ion-col>
                <ion-col size="12">
                  <div align="center">
                    <form @submit.prevent="loginFn" novalidate>
                      <ion-item class="item-login ion-margin-vertical">
                        <ion-input type="email" class="input-login" v-model="email" placeholder="CORREO ELECTRÓNICO"></ion-input>
                      </ion-item>
                      <ion-note v-if="v$.email.$error" color="danger">{{ v$.email.$errors[0].$message }}</ion-note>
                      <ion-item class="item-login ion-margin-vertical">
                        <ion-input type="password" class="input-login" v-model="password" placeholder="CONTRASEÑA"></ion-input>
                      </ion-item>
                      <ion-note v-if="v$.password.$error" color="danger">{{ v$.password.$errors[0].$message }}</ion-note>
                      <ion-row>
                        <ion-col size="12">
                          <ion-note v-if="invalidLogin" color="danger"><strong>{{invalidLogin}}</strong></ion-note>
                        </ion-col>
                      </ion-row>
                      <ion-button type="submit" size="large" class="buttom-login">ACCEDER</ion-button>
                    </form>
                  </div>
                </ion-col>
            </ion-row>
        </div>
    </ion-content>
  </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonPage, IonContent, IonImg, IonInput, IonItem, IonButton, IonNote, IonRow, IonCol } from '@ionic/vue';
  import { useVuelidate } from '@vuelidate/core';
  import { required, email,helpers } from '@vuelidate/validators';
  import axios from 'axios';
  
  export default  defineComponent({
    name: 'LoginPage',
    components: { IonPage, IonContent, IonImg, IonInput, IonItem, IonButton, IonNote, IonRow, IonCol },
    data() {
        return {
        v$: useVuelidate(),
        email: "",
        password: "",
        invalidLogin: "",
        };
    },
    methods: {
        async loginFn() {
          const result = await this.v$.$validate();
          if (!result) {
            return
          }
          await axios.post('/auth/login', {
            email: this.email,
            password: this.password,
          }).then((response: any) => {
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('user', response.data.user.id);
            this.v$.$reset();
            this.email = '';
            this.password = '';
            this.$router.push({name: 'tab1'});
          }).catch((error) => {
            console.log(error);
            this.invalidLogin = 'Estas credenciales no coinciden con nuestros registros';
          });
          
        }
    },
    validations(){
        return {
        email: { required: helpers.withMessage('Este campo es obligatorio', required), email: helpers.withMessage('Por favor, introduce una dirección de correo electrónico válida', email) },
        password: { required: helpers.withMessage('Este campo es obligatorio', required) },
        }
    }
  });
  </script>

<style scoped>
.fullheight {
    height: 100%;
}

.xc {
    display: grid;
    align-items: center;
    justify-content: center;
  }

.background-image-login {
    --background: url(../../public/assets/img/background.jpg) #97ebb7 0 0/100% 100% no-repeat;
}

.logo-image-login {
  width: 50%;
}

.item-login {
  --background: #fff;
  --color: #000;
  --border-radius: 5px;
  --border-style: none;
  box-shadow: 3px 2px 2px rgba(66,66,66,.70);
}

.input-login {
  --background: #fff;
  --color: #000;
  caret-color: black;
}

.buttom-login {
	--border-radius:30px;
  font-size: 20px;
  width: 60%;
  margin-top: 10%;
  color:#000;
  --background: #97ebb7;
  --background-activated: #9E9E9E;
}

</style>
  