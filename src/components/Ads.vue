<template>
   <img class="img-fluid p-3" :src="ad.tall" alt="">
</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';

export default {
    props: {
        ad: {type: Object, required: true}
    },
    
    setup(props){
        return{
            ads: computed(() => AppState.ads)
        }
    }
}
</script>


<style lang="scss" scoped>
</style>