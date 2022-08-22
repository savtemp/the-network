<template>

<div class="d-flex">

    <div>
        <div class="row justify-content-center">
            <div class="col-md-11 my-5 hide-this">
                <!-- FIXME add v-if for account.id -->
                <CreatePost v-if="user.name" />
            </div>
        </div>
    
        <div class="row justify-content-center px-2">
            <div class="col-12 col-md-10 my-2" v-for="p in post" :key="p.id">
                <PostCard :post="p" /> 
            </div>
        </div>

        <div class="row d-flex justify-content-center text-center mt-2">
            <div class="col-5 col-md-4">
                <button @click="changePage(newerPage)" class="btn btn-outline-dark w-50" :disabled="!newerPage">Newer</button>
            </div>

            <div class="col-2 col-md-3">
                <p>page: {{page}}</p>
            </div>

            <div class="col-5 col-md-4">
                <button @click="changePage(olderPage)" class="btn btn-outline-dark w-50">Older</button>
            </div>
        </div>
    
    </div>

    <div class="col-md-3 hide-this">
        <!-- FIXME ads should be in the AppVue - kind of looks broken from home page to profile page -->
        <Ads v-for="ad in ads" :key="ad.title" :ad="ad" />
    </div>

</div>





</template>

<script>
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import {postsService} from '../services/PostsService.js'
import { onMounted } from 'vue';
import { computed } from '@vue/reactivity';
import { AppState } from "../AppState.js"
import PostCard from '../components/PostCard.vue';
import CreatePost from '../components/CreatePost.vue';
import Ads from '../components/Ads.vue';
import { adsService } from '../services/AdsService.js';

export default {
    setup() {
        async function getPosts() {
            try {
                await postsService.getPosts();
            }
            catch (error) {
                logger.log("[Getting Posts]", error);
                Pop.error(error);
            }
        }

        async function getAds(){
            try {
                await adsService.getAds()
            } catch (error) {
                logger.error('[Getting Ads]', error)
                Pop.error(error)
            }
        }

        onMounted(() => {
            getPosts()
            getAds()

        });
        return {
            post: computed(() => AppState.posts),
            olderPage: computed(() => AppState.olderPage),
            newerPage: computed(() => AppState.newerPage),
            page: computed(() => AppState.page),
            totalPages: computed(() => AppState.totalPages),
            ads: computed(() => AppState.ads),
            user: computed(() => AppState.user),

            async changePage(url){
                try {
                    await postsService.changePage(url)
                } catch (error) {
                    logger.error(error)
                }
            }
        };
    },
}
</script>

<style scoped lang="scss">

@media (max-width: 768px){
    .hide-this{
    display: none;
    }
}
</style>
