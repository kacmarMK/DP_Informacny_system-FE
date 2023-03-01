<template>
<div id="login">
    <div class="container-fluid">
        <div class="row g-0">
            <div class="col-xl-6 p-0 order-lg-0 order-1">
                                        
                  <div class="login-card">

                        <div class="row justify-content-center">

                            <div class="login-form">
          
                                <AlertError :message="$t('views.login_screen.login_invalid')" v-if="error"/>
                                <h4>{{$t('views.login_screen.login_top')}}</h4>
                                <h6 class="mt-2">{{$t('views.login_screen.login_message')}}</h6>
                                <form @submit.prevent> 
                                    <div class="form-group">
                                        <label for="username" class="fw-bolder">{{$t('views.login_screen.username')}}</label>
                                        <div class="input-group mt-2">
                                            <span class="input-group-text"><i class="fas fa-user"></i></span>
                                            <input type="text" v-model="user.nickName" class="form-control" id="username" :placeholder="$t('views.login_screen.username')" required/>
                                        </div>
                                    </div>

                                    <div class="form-group mt-3">
                                        <label for="password" class="fw-bolder">{{$t('views.login_screen.password')}}</label>
                                        <div class="input-group mt-2">
                                            <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                            <input type="password" v-model="user.password" class="form-control" id="password" :placeholder="$t('views.login_screen.password')" required/>
                                        </div>
                                    </div>


                                    <div class="form-group mt-2">
                                        <div class="checkbox d-inline">
                                            <input id="remember" v-model="remember" type="checkbox">
                                            <label class="text-muted ms-2" for="remember">{{$t('views.login_screen.remember')}}</label>
                                        </div>
                                    </div>

                
                                    <input class="btn w-100 btn-primary-blue mt-4 fw-bolder" id="login-btn" @click="submit()" :value="$t('views.login_screen.login')" />
                                </form>

                                <span class="d-block text-center my-4 text-muted">— {{$t('views.login_screen.or')}} —</span>
                                <GoogleAuth />
                                <div class="text-center mt-3">
                                    <h6>{{$t('views.login_screen.no_account')}} <router-link to="/register" class="text-decoration-none ms-2"> {{$t('views.login_screen.signup')}}</router-link></h6>
                                    
                                </div>
                                <div class="d-flex justify-content-center mt-2">
                                    <LanguageSwitcher/>
                                </div>
                               
                        </div>
                        </div>
                    </div>
            </div>
            <div class="col-xl-6 order-lg-1 order-0 d-none d-lg-block" >
               <img src="../assets/images/modulo.png" class="img-responsive" style="background-size: cover;background-position: center center;"/> 
            </div>
        </div>
    </div>
</div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import LanguageSwitcher from '../components/LanguageSwitcher.vue';
import User from "../interfaces/User"
import UserService from "../services/UserService"
import AlertError from "../components/AlertError.vue"
import GoogleAuth from '../components/GoogleAuth.vue'
import ResponseData from "@/services/ResponseData";
import Favorite from "@/interfaces/Favorite";
export default defineComponent ({
    name: "LoginView",
    data: () => ({
        user: {} as User,
        remember: false as boolean,
        error: false as boolean,
    }),
    methods: {

        submit() {
            this.user.favoriteEntityList = new Array<Favorite>();
            UserService.login(this.user).then( (response: ResponseData<User>) => {
                sessionStorage.setItem('user', JSON.stringify(response.data))
                if(this.remember == true){
                    localStorage.setItem('user', JSON.stringify(response.data))
                }
                this.redirect()
            }).catch( (error: any) => {
                console.log(error)
                this.error = true;
            })

        }, 
        redirect()  {
            this.$router.push({ path: 'home' })
            sessionStorage.setItem("jwt", "true");
        }

    },
    components: {    
        LanguageSwitcher ,
        AlertError,
        GoogleAuth
    }
})
</script>
<style>

#login .container-fluid{
  padding-left: 0rem;
  padding-right: 0rem;
  overflow: hidden;
}

.img-responsive {
    width: 100%;
    height: 100vh;
}
#login .login-card,
#register {
    height: 100vh;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    min-height: 100vh;
    margin: 0 auto;
    padding: 30px 12px;
}

#login .login-form .input-group-text,
#register .input-group-text{
    background-color: var(--light-blue-bg-rgb);
    color: var(--blue-primary-color);
    border-top: 1px solid #e6edef;
    border-bottom: 1px solid #e6edef;
    border-left: 1px solid #e6edef;
    border-right: none;
}

#login .login-form .form-control,
#register .form-control {
    border-top: 1px solid #e6edef;
    border-right:1px solid #e6edef;
    border-bottom: 1px solid #e6edef;
    border-left: none;
}

#login .link{
    float:right;
}

#login .login-form {
  padding: 30px;
  width: 450px;
  background-color: white;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}
 #login .login-form h4,
#register h4{
    text-transform: capitalize;
    font-weight:600;
    margin-bottom:5px;
    font-size:22px;
  }

  #login .login-form h6,
  #register h6 {
    font-size: 14px;
    margin-bottom: 10px;
    color: rgb(153, 153, 153);
  }

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active{
    box-shadow: 0 0 0 30px white inset !important;
    -webkit-box-shadow: 0 0 0 30px white inset !important;
}

</style>