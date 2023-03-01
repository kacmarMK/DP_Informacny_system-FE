<template lang="">
    <div class="card  card-primary">                                 
        <div class="card-body d-flex justify-content-center align-items-center flex-column">                                  
            <div class="round-box">
              <i :class="icon" class="fa-2x"></i>
            </div>
            <h5>{{title}}</h5>
            <router-link :to="path" class="btn btn-primary-blue" style="cursor:pointer;">
                {{ $t('views.home_view.redirect') }}         
                <i class="fas fa-arrow-right ms-2"></i> 
            </router-link>
            <div class="parrten">
                <i :class="icon" class="fa-5x"></i>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'YourCompany',
    props: {
        title: String, 
        icon: String,
        path: String
    }
})
</script>
<style scoped>
    .card { 
        height: 12rem;
        overflow: hidden;
    }
    .parrten {
        position: absolute;
        top: -44px;
        right: -9px;
    }
    .parrten i {
    color: var(--light-blue-bg-rgb);
    width: 100px;
    height: 100px;
    -webkit-transform: rotate(-135deg);
    transform: rotate(-135deg);
    }

    .card:hover .round-box {
        color: white;
        background-color: var(--blue-primary-color);
    }
</style>