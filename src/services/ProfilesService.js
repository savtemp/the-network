import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class ProfilesService{
    async getProfileById(id){
        const res = await api.get(`api/profiles/${id}`)
        logger.log('get profile by id', res.data)
        AppState.activeProfile = new Profile(res.data)
    }
}


export const profilesService = new ProfilesService()