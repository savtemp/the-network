import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class PostsService{
    async getPosts(page = 1){
        const res = await api.get('/api/posts', {
            params:{
                page: page
            }
        })
        logger.log(res.data)
        // AppState.posts = new Post(res.data) 
        // logger.log(res.data.posts)
        AppState.posts = res.data.posts.map(p => new Post(p))
        AppState.page = res.data.page
        AppState.newerPage = res.data.newer
        AppState.olderPage = res.data.older

    }

    async createPost(postData){
        const res = await api.post(`api/posts`, postData)
        AppState.posts.unshift(new Post(res.data))
    }

    async getPostsByCreatorId(creatorId){
        const res = await api.get(`api/posts`, {
            params: {
                creatorId
            }
        })
        AppState.profilePosts = new Post(res.data)
        AppState.profilePosts = res.data.posts.map(p => new Post(p))
    }

    async changePage(url){
        logger.log(url)
        const res = await api.get(url)
        logger.log(res.data)
        AppState.posts = res.data.posts.map(p => new Post(p))
        AppState.olderPage = res.data.older
        AppState.newerPage = res.data.newer
    }

    async likePost(id){
        const res = await api.post(`/api/posts/${id}/like`)
        logger.log(res.data)
    }

    // FIXME getting Vue warning, will search but won't let me go back to the home page??
    async searchPosts(searchTerm){
        const res = await api.get(`/api/posts`, {
            params: {
                query: searchTerm
            }
        })
        AppState.posts = res.data.posts
    }
}


export const postsService = new PostsService()