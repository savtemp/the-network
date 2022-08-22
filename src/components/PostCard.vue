<template>
    <div class="row post-card card">
        <div class="col-12 post-creator p-3 d-flex justify-content-between" v-if="post.creator">
            <div class="d-flex">
                <router-link :to="{name: 'Profile', params: {profileId: post.creator.id}}">
                    <img class="img-fluid profile-img" :src="post.creator.picture" alt="" :title="post.creator.name">
                </router-link>
                <div class="px-4">
                    <p class="m-0"><b>{{post.creator.name}}</b></p>
                    <p class="m-0">{{new Date(post.createdAt).toLocaleDateString('en-US')}}</p>
                </div>
            </div>
            <div v-if="post.creator.id == account.id">
                <button class="btn btn-danger" @click="deletePost(post.id)">Delete Post</button>
            </div>
        </div>


        <div class="col-12 p-0">
            <div class="card-title">
                <div class="p-2 mx-4">
                    <h6>{{post.body}}</h6>
                </div>
                <div class="text-dark">
                    <img class="img-fluid" :src="post.imgUrl" alt="">
                    <div class="d-flex p-2 justify-content-end">
                        <!-- FIXME have to refresh to update like  -->
                        <div class="d-flex" v-if="user.name" @click="likePost(post.id)">
                            <i class="selectable no-select fs-4 mdi mdi-heart"></i>
                            <p class="fs-4 px-2 m-0">{{post.likes.length}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { popScopeId, ref } from 'vue';
import { AppState } from '../AppState.js';
import { Post } from '../models/Post.js';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
    props: {
        post: {type: Object, required: true},
    },

    setup(props){

        const deleting = ref(false)

        return{
            deleting,
            account: computed(() => AppState.account),
            user: computed(() => AppState.user),

// TODO add pop-confirm
            async deletePost(id){
                try {
                    await postsService.deletePost(id)
                } catch (error) {
                    logger.error('[Deleting Post]')
                    Pop.error(error)
                }
            },


            async likePost(id){
                try {
                    await postsService.likePost(id)
                } catch (error) {
                    logger.error('[liking a post]',error)
                    Pop.error(error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.post-card{
    min-height: 80px;
}

.post-creator{
    // position: absolute;
    bottom: 1rem;
    right: 1rem;
}

.profile-img{
    transition: all .15s linear;
    border-radius: 50px;
    height: 50px;
    width: 50px;
    object-fit: cover;
    object-position: center;

    &:hover{
        transform: translateY(-3px);
    }
}
</style>