<template>
    <form @submit.prevent="handleSubmit">
        <h1>Create A Post!</h1>
        <input class="form-control" type="url" placeholder="Add Your Image ..." v-model="editable.imgUrl">
        <textarea class="form-control" name="body" cols="30" rows="10" placeholder="Whats on your mind ..." v-model="editable.body"></textarea>
        <button class="btn btn-dark" type="submit">Post</button>
    </form>
</template>


<script>
import { ref } from 'vue';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
    setup(){
        const editable = ref({})

        return{
            editable,

            async handleSubmit(){
                try {
                    await postsService.createPost(editable.value)
                } catch (error) {
                    logger.error('[Creating Post]', error)
                    Pop.error(error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
</style>