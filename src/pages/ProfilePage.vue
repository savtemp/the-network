<template>

<div class="d-flex">
    <div>
        <div class="row profile-page justify-content-center p-3" v-if="profile">
            <!-- SECTION profile details card -->
            <div class="card cover-img">
                <div v-if="profile.id == account.id">
                    <router-link class="btn square btn-warning" :to="{name: 'Account'}">Edit Account</router-link>
                </div>   
                <img class="img-fluid" :src="profile.coverImg" alt="" height="120">
                <img class="img-fluid" :src="profile.picture" alt="" height="50">
                <h3>{{profile.name}}</h3>
                <p>{{profile.email}}</p>
                <p>{{profile.class}}</p>
                <p>Graduated: <span>{{profile.graduated}}</span></p>
                <p>{{profile.bio}}</p>
                <a href="https://github.com/">GitHub</a>
                <!-- <a href="">{{profile.linkedin}}</a> -->
            </div>

            <!-- SECTION create post card -->
            <div class="row" v-if="profile.id == account.id">
                <div class="col-10">
                    <CreatePost />
                </div>
            </div>
            
            <!-- SECTION change page buttons -->
            <div class="row d-flex text-center mt-2">
                <div class="col-4">
                    <button @click="changePage(newerPage)" class="btn btn-outline-dark w-50" :disabled="!newerPage">Newer</button>
                </div>
                <div class="col-4">
                    <button @click="changePage(olderPage)" class="btn btn-outline-dark w-50">Older</button>
                </div>
            </div>

            <!-- SECTION posts card -->
            <div class="row">
                <div class="col-10" v-for="p in posts" :key="p.id">
                    <PostCard :post="p" />
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-3">
        <!-- FIXME ads should be in the AppVue - kind of looks broken from home page to profile page -->
        <Ads v-for="ad in ads" :key="ad.title" :ad="ad" />
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
import Ads from '../components/Ads.vue';
import { adsService } from '../services/AdsService.js';
import CreatePost from '../components/CreatePost.vue';


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
        async function getPostsByCreatorId() {
            try {
                await postsService.getPostsByCreatorId(route.params.profileId);
            }
            catch (error) {
                logger.error("[Getting profile posts]", error);
                Pop.error(error);
            }
        }
        async function getAds() {
            try {
                await adsService.getAds();
            }
            catch (error) {
                logger.error("[Getting Ads]", error);
                Pop.error(error);
            }
        }
        onMounted(() => {
            getProfileById();
            getPostsByCreatorId();
            getAds();
        });
        return {
            route,
            account: computed(() => AppState.account),
            profile: computed(() => AppState.activeProfile),
            cover: computed(() => `url(${AppState.activeProfile?.coverImg || "https://cdn.pixabay.com/photo/2017/07/16/17/33/background-2509983_1280.jpg"})`),
            posts: computed(() => AppState.profilePosts),
            ads: computed(() => AppState.ads),
            olderPage: computed(() => AppState.olderPage),
            newerPage: computed(() => AppState.newerPage),

            async changePage(url){
                try {
                    await postsService.changePage(url)
                } catch (error) {
                    logger.error(error)
                }
            }
        };
    },
    components: { CreatePost }
}
</script>


<style lang="scss" scoped>
</style>