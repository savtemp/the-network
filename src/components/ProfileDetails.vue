<template>
<!-- TODO add v-if profile -->
    <!-- <div class="row">
        <div class="col-12">
            <div class="bg-light elevation-2" v-if="profile.id == account.id"> -->
                <!-- <router-link :to="{name: 'Profile', params: {profileId: account.id}}">
                    <img class="profile-icon" :src="account.picture" alt="">
                </router-link> -->
                <!-- <p>{{account.name}}</p>
                <p>{{account.class}}</p>
                <p>Links - swap to a tags</p>
            </div>
        </div>
    </div> -->

</template>


<script>
// import { computed } from '@vue/reactivity';
// import { useRoute } from 'vue-router';
// import { AppState } from '../AppState.js';

// export default {
//     setup(){
//         const route = useRoute()

//         return{
//             route,
//             account: computed(() => AppState.account),
//             profile: computed(() => AppState.profiles)
//         }
//     }
// }
</script>


<style lang="scss" scoped>
.profile-details{
    background-color: white;
    width: 15em;
}
</style>