<template>

<div class="bg-white rounded elevation-2 d-flex justify-content-evenly">
    <div class="col-2 p-2 m-2">
        <img class="img-fluid profile-thumb" :src="account.picture" alt="" @click.stop="goToMyProfile">
    </div>
    <form class="col-9 p-2" @submit.prevent="handleSubmit">
        <textarea class="dashed form-control my-2" name="body" cols="20" rows="5" placeholder="Whats on your mind ..." v-model="editable.body"></textarea>
        <input class="form-control dashed my-2" type="url" placeholder="Add Your Image ..." v-model="editable.imgUrl">
        <div class="text-end">
            <button class="btn btn-secondary m-2 w-20" type="submit">
                <p class="my-2"><i class="send-post mdi mdi-send-outline"> <span> Post</span></i></p>
            </button>
        </div>
    </form>
</div>

</template>


<script>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { router } from '../router.js';
import { accountService } from '../services/AccountService.js';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
    setup(){
        const editable = ref({})

        return{
            account: computed(() => AppState.account),
            editable,

// FIXME this does not work 
            goToMyProfile(){
                router.push({
                    name: 'Profile',
                    params: {profileId}
                })
            },

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

.profile-thumb{
    object-fit: cover;
    border-radius: 50%;
    border-radius: 50%;
    height: 4rem;
    width: 4rem;
}

.dashed{
    border: dashed 1px rgb(26, 26, 65);
}

</style>