<template>
<!-- <div>Hello from the profile page </div> -->
    <div class="row profile-page justify-content-center p-3" v-if="profile">
        <div class="cover-img">
            <div class="position-absolute" style="right:0" v-if="profile.id == account.id">
                <router-link class="btn square btn-warning" :to="{name: 'Account'}">Edit Account</router-link>
            </div>   
            <img :src="profile.picture" alt="" height="120">
            <h3>{{profile.name}}</h3>
            <p>{{profile.bio}}</p>
        </div>
        <div class="row">
            <div class="col-10" v-for="p in posts" :key="p.id">
                <PostCard :post="p" />
            </div>
        </div>
    </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { router } from '../router.js';
import { profilesService } from '../services/ProfilesService.js';
import {postsService} from '../services/PostsService.js'
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import PostCard from '../components/PostCard.vue';

export default {
    name: "Profile",
    setup() {

        const route = useRoute();

        async function getProfileById() {
            try {
                await profilesService.getProfileById(route.params.profileId);
            }
            catch (error) {
                logger.error("[Getting profile by Id]", error);
                Pop.error(error);
                router.push({ name: "Home" });
            }
        }

        async function getPostsByCreatorId(){
            try {
                await postsService.getPostsByCreatorId(route.params.profileId)
            } catch (error) {
                logger.error('[Getting profile posts]',error)
                Pop.error(error)
            }
        }

        onMounted(() => {
            getProfileById()
            getPostsByCreatorId()
        });

        return {
            route,
            account: computed(() => AppState.account),
            profile: computed(() => AppState.activeProfile),
            cover: computed(() => `url(${AppState.activeProfile?.coverImg || 'https://cdn.pixabay.com/photo/2017/07/16/17/33/background-2509983_1280.jpg'})`), 
            posts: computed(() => AppState.profilePosts)
        };
    },
    components: { PostCard }
}
</script>


<style lang="scss" scoped>
</style>