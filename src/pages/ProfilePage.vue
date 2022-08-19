<template>
    <div class="profile-page">
        <div class="cover-img">
            <div>
                <img :src="profile.picture" alt="">
                <h3>{{profile.name}}</h3>
                <p>{{profile.bio}}</p>
            </div>
        </div>
    </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { profilesService } from '../services/ProfilesService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
    setup(){
        const route = useRoute

        async function getProfileById(){
            try {
                await profilesService.getProfileById(route.params.profileId)
            } catch (error) {
                logger.error('[Getting profile by Id]', error)
                Pop.error(error)
            }
        }

        onMounted(() => {
            getProfileById()
        })

        return{
            profile: computed(() => AppState.activeProfile),
            cover: computed(() => `url(${AppState.activeProfile?.coverImg})`)
        }
    }
}
</script>


<style lang="scss" scoped>
</style>