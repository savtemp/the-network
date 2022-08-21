<template>
    <form class="card account-form" @submit.prevent="handleSubmit()">
        <div class="card-body">
            <div>
                <label for="Name:"></label>
                <input class="form-control" type="text" required name="name" placeholder="Name..." v-model="editable.name">
            </div>

            <div>
                <label for="Picture:"></label>
                <input class="form-control" type="url" required name="picture" placeholder="Picture..." v-model="editable.picture">
            </div>

            <div>
                <label for="Cover Image:"></label>
                <input class="form-control" type="url" required name="coverImg" placeholder="Cover Image..." v-model="editable.coverImg">
            </div>

            <div>
                <label for="Bio:"></label>
                <textarea class="form-control" name="bio" required rows="8" style="resize:none" v-model="editable.bio"></textarea>
            </div>

            <div>
                <label for="Email:"></label>
                <input class="form-control" type="text" required name="email" placeholder="Email..." v-model="editable.email">
            </div>

            <div>
                <label for="Class:"></label>
                <input class="form-control" type="text" required name="class" placeholder="Class..." v-model="editable.class">
            </div>

            <div>
                <button class="btn btn-primary w-100 mt-2" type="submit">Save</button>
            </div>
        </div>
    </form>
</template>


<script>
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { router } from '../router.js';
import { accountService } from '../services/AccountService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
    setup(){

        const editable = ref({})

        watchEffect(() => {
            if (!AppState.account){return}
            editable.value = {...AppState.account}
        })

        return{
            editable,
            async handleSubmit(){
                try {
                    await accountService.editAccount(editable.value)
                    router.push({name: 'Profile', params: {profileId: editable.value.id}})
                } catch (error) {
                    logger.error('[Editing Account]', error)
                    Pop.error(error)
                }
            }
        }
    }
}


</script>
<style lang="scss" scoped>
</style>