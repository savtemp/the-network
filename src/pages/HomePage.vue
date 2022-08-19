<template>
  <div class="row home-page">
    <div class="col-10" v-for="p in post" :key="p.id">
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
        };
    },
    components: { PostCard }
}
</script>

<style scoped lang="scss">
</style>
