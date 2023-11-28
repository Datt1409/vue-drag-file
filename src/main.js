import Vue from "vue";
import App from "./App.vue";

import "./assets/main.css";

// import { initializeApp } from "firebase/app";

//   created() {
//     const firebaseConfig = {
//       apiKey: process.env.VUE_API_KEY,
//       authDomain: process.env.VUE_AUTH_DOMAIN,
//       projectId: process.env.VUE_PROJECT_ID,
//       storageBucket: process.env.VUE_STORAGE_BUCKET,
//       messagingSenderId: process.env.VUE_MESSAGING_SENDER_ID,
//       appId: process.env.VUE_APP_ID,
//     };

//     // Initialize Firebase
//     const app = initializeApp(firebaseConfig);
// },
new Vue({
  render: (h) => h(App),
}).$mount("#app");
