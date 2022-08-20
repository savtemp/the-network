<template>
    <div class="row post-card card">
        <div class="col-12 post-creator" v-if="post.creator">
            <router-link :to="{name: 'Profile', params: {profileId: post.creator.id}}">
                <img class="img-fluid profile-img" :src="post.creator.picture" alt="" :title="post.creator.name">
            </router-link>
        </div>
        <div class="col-12 card-body">
            <div class="card-title">
                <div class="text-dark">
                    <h6>{{post.body}}</h6>
                    <p>{{new Date(post.createdAt).toLocaleDateString('en-US')}}</p>
                    <img class="img-fluid" :src="post.imgUrl" alt="">
                    <div class="d-flex m-3">
                        <p class="p-2">{{post.likes.length}}</p>
                        <!-- TODO make it so you cant see the lke button until you are logged in  -->
                        <button class="btn btn-dark" 
                        @click="likePost(post.id)">Like</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { Post } from '../models/Post.js';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
    props: {
        post: {type: Post, required: true},
    },

    setup(props){
        return{
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
    height: 45px;
    width: 45px;
    object-fit: cover;
    object-position: center;

    &:hover{
        transform: translateY(-3px);
    }
}
</style>