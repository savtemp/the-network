<template>
  <header class="">
    <Navbar />
  </header>

  <main class="container-fluid">
    <router-view />
  </main>
</template>

<script>
import { computed } from 'vue';
import { AppState } from './AppState';
import Login from './components/Login.vue';
import ProfilePage from './pages/ProfilePage.vue';
import Login1 from './components/Login.vue';

export default {
    name: "App",
    setup() {
        return {
            appState: computed(() => AppState)
        };
    },
    components: { Login, ProfilePage, Login1 }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
