<template lang="">
    <div>
     <button class="btn w-100 btn-danger" @click="google()"><i class="fab fa-google me-2"></i><span class="fw-bolder"> {{$t('views.login_screen.google')}}</span></button>
    </div>
</template>
<script>
import UserService from '@/services/UserService';

export default {
    name: 'GoogleAuth',
    methods: {
        async google(){
            const googleUser = await this.$gAuth.signIn()


            UserService.googleLogin(googleUser.getBasicProfile().getEmail()).then( (response) => {
                sessionStorage.setItem('user', JSON.stringify(response.data))
                this.$router.push({ path: 'home' })
                sessionStorage.setItem("jwt", "true");
            })

        }
    }
}
</script>
<style lang="">
    
</style>