import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class ProfilesService{
    async getProfileById(id){
        const res = await api.get(`api/profiles/${id}`)
        logger.log('what is a profile', res.data)
        AppState.activeProfile = new Profile(res.data)
    }

    async changePage(url){
        logger.log(url)
        const res = await api.get(url)
        logger.log('changing page', res.data)
        AppState.posts = res.data.posts
        AppState.olderPage = res.data.older
        AppState.newerPage = res.data.newer

        AppState.page = res.data.page
        AppState.totalPages = res.data.totalPages
    }
}


export const profilesService = new ProfilesService()