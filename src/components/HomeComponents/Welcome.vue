<template>

    <div class="card profile-greeting">
        <div class="text-center p-t-0">
            <h3 class="font-light">{{$t('views.home_view.welcome_back')}}, {{user.name}} {{user.surname}}</h3>
        </div>
    </div>

</template>
<script lang="ts">
import User from "@/interfaces/User";
import { defineComponent } from "@vue/runtime-core";
export default defineComponent({
    name: 'Welcome',
    data: () => ({
        user: {} as User
    }), 
    created(){
        this.user = Object.assign({}, JSON.parse(sessionStorage.getItem('user') || '{}'));
    }
})
</script>
<style scoped>
    .profile-greeting {
        height: 12rem;
        background-image: linear-gradient(rgb(22, 142, 234, 0.5), rgb(22, 142, 234,0.8)), url('../../assets/images/bg.jpg');
        background-size: cover !important;
        background-repeat: no-repeat;
        background-position: center center;
        position: relative;
        color: white;
        padding: 30px;
        border: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>