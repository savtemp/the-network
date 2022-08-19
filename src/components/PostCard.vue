<template>
    <div class="row post-card card">
        <router-link :to="{name: 'Post', params: {postId: post.id}}">
            <div class="card-body">
                <div class="card-title">
                    <div class="text-dark">
                        <h6>{{post.body}}</h6>
                        <p>{{new Date(post.createdAt).toLocaleDateString('en-US')}}</p>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
    <!-- <div class="post-creator" v-if="post.creator">
        <router-link :to="{name: 'Profile', params: {profileId: post.creator.id}}">
            <img class="img-fluid" :src="post.creator.picture" alt="" :title="post.creator.name">
        </router-link>
    </div> -->
</template>


<script>
import { Post } from '../models/Post.js';

export default {
    props: {
        post: {type: Post, required: true}
    },
    setup(props){
        return{}
    }
}
</script>


<style lang="scss" scoped>
</style>