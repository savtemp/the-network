<template>

<div class="d-flex">
  <section class="container bg-white elevation-3 profile-details">
    <Login />
  </section>

  <div>
    <header class="">
      <Navbar />
    </header>

    <main class="container-fluid">
      <router-view />
    </main>

    <!-- <section class="container">
      <Ads />
    </section> -->
  </div>

</div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from './AppState';
import Login from './components/Login.vue';
import ProfilePage from './pages/ProfilePage.vue';
import Login1 from './components/Login.vue';
import ProfileDetails from './components/ProfileDetails.vue';
import Login2 from './components/Login.vue';

export default {
    name: "App",
    setup() {
        return {
            appState: computed(() => AppState)
        };
    },
    components: { Login, ProfilePage, Login1, ProfileDetails, Login2 }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.profile-details{
  height: 40em;
  width: 20em;
}

</style>
