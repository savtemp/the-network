<template>
  <div class="row about text-center">
    <div class="col-8">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
    </div>
    <div class="col-8">
      <h1>Edit Your Profile Details</h1>
      <!-- INSERT ACCOUNT FORM -->
      <AccountForm />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import AccountForm from '../components/AccountForm.vue';
export default {
    name: "Account",
    setup() {
        return {
            account: computed(() => AppState.account)
        };
    },
    components: { AccountForm }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
