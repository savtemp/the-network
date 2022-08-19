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
        // logger.log(res.data)
        AppState.posts = new Post(res.data) 
        // logger.log(res.data.posts)
        AppState.posts = res.data.posts.map(p => new Post(p))
        AppState.page = res.data.page
        
    }
}


export const postsService = new PostsService()