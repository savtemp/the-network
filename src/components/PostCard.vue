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
                </div>
            </div>
        </div>
    </div>
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