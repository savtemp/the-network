<template>
<div class="row home-page d-flex justify-content-center text-center mt-2">
    <div class="col-3">
        <button @click="changePage(newerPage)" class="btn btn-outline-dark w-50" :disabled="!newerPage">Newer</button>
    </div>
    <div class="col-3">
        <button @click="changePage(olderPage)" class="btn btn-outline-dark w-50">Older</button>
    </div>

</div>
    <div class="row home-page justify-content-center">
        <div class="col-10 my-2" v-for="p in post" :key="p.id">
            <PostCard :post="p" /> 
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
        onMounted(() => {
            getPosts();
        });
        return {
            post: computed(() => AppState.posts),
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
    components: { PostCard }
}
</script>

<style scoped lang="scss">
</style>
