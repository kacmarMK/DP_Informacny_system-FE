<template lang="">
<div id="register" >
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-xxl-5 col-lg-6">
                <div class="card">
                    <div class="card-header bg-white pt-4">
                        <h4>{{$t('views.register_view.heading')}}</h4>      
                        <h6 class="mt-2">{{$t('views.register_view.description')}}</h6>
                    </div>
                    <div class="card-body ">
                        <form @submit.prevent="submit()">
                            <div class="row">
                                <div class="col-6">
                                    <div class="form-group mb-3">
                                        <label for="username" class="fw-bolder">{{$t('views.login_screen.username')}}</label>
                                        <div class="input-group mt-2">
                                            <span class="input-group-text"><i class="fas fa-user"></i></span>
                                            <input type="text" :placeholder="$t('views.login_screen.username')"  id="username" class="form-control" v-model="user.nickName" required autocomplete="off" autofill="off"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group mb-3">
                                        <label for="email" class="fw-bolder">{{$t('views.profile_view.details_form.email')}}</label>
                                        <div class="input-group mt-2">
                                            <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                            <input type="email" :placeholder="$t('views.profile_view.details_form.email')"  id="email" class="form-control" v-model="user.email" required/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <div class="form-group mb-3">
                                        <label for="name" class="fw-bolder">{{$t('views.profile_view.details_form.name')}}</label>
                                        <div class="input-group mt-2">
                                            <span class="input-group-text"><i class="fas fa-address-card"></i></span>
                                            <input type="text" :placeholder="$t('views.profile_view.details_form.name')"  id="name" class="form-control" v-model="user.name" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group mb-3">
                                        <label for="surname" class="fw-bolder">{{$t('views.profile_view.details_form.surname')}}</label>
                                        <div class="input-group mt-2">
                                            <span class="input-group-text"><i class="fas fa-address-card"></i></span>
                                            <input type="text" :placeholder="$t('views.profile_view.details_form.surname')"  id="surname" class="form-control" v-model="user.surname" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6">
 
                                    <div class="form-group mb-3">
                                        <label for="password" class="fw-bolder">{{$t('views.login_screen.password')}}</label>
                                        <div class="input-group mt-2">
                                            <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                            <input type="password" :placeholder="$t('views.login_screen.password')" id="password" class="form-control" v-model="user.password" required/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6">
 
                                    <div class="form-group mb-3">
                                        <label for="password" class="fw-bolder">{{$t('views.profile_view.password_form.repeat_password')}}</label>
                                        <div class="input-group mt-2">
                                            <span class="input-group-text"><i class="fas fa-repeat"></i></span>
                                            <input type="password" :placeholder="$t('views.profile_view.password_form.repeat_password')" id="password_repeat" class="form-control" v-model="repeat" required/>
                                        </div>
                                    </div>
                                </div>
                                <p v-if="passwordIncorrect" class="text-danger">{{$t('views.profile_view.password_form.password_dont_match')}}</p>
                            </div>
                            <div class="d-flex justify-content-center">
                             <input type="submit" :value="$t('views.login_screen.register')" class="btn btn-primary-blue d-flex justify-content-center w-50" />
                            </div>
                        </form>
                        <div class="mt-4 text-center"> 
                            <span class="me-2">{{$t('views.register_view.already_have_account')}}</span><router-link :to="{path: 'login'}" class="text-decoration-none">{{$t('views.login_screen.login')}}</router-link>
                         </div>
                    </div>
                    <div class="d-flex justify-content-center mt-2 mb-4">
                        <LanguageSwitcher/>
                    </div>
                </div>
            </div>
        </div>    
    </div>
</div>
</template>
<script lang="ts">
import Favorite from "@/interfaces/Favorite";
import User from "@/interfaces/User";
import ResponseData from "@/services/ResponseData";
import UserService from "@/services/UserService";
import { defineComponent} from "@vue/runtime-core";
import LanguageSwitcher from '../components/LanguageSwitcher.vue';

export default defineComponent ({
    components: {    
        LanguageSwitcher 
    },
    data: () => ({
        user: {} as User,
        repeat: '' as string,
        passwordIncorrect: false as boolean
    }),
    methods: {
        submit(){
            if(this.repeat === this.user.password){
                this.user.favoriteEntityList = new Array<Favorite>();
                let json = {
                    clotheType: "GraphicShirt",
                    accessoriesType:"Round",
                    clotheColor:"Red",
                    eyebrowType:"Angry",
                    eyeType:"Cry",
                    mouthType:"Eating",
                    facialHairColor:"Blonde",
                    facialHairType:"BeardLight",
                    hairColor:"Auburn",
                    skinColor:"Pale",
                    topColor:"PastelBlue",
                    topType:"WinterHat3",
                    graphicType:"Cumbia",
                }
                this.user.avatar = JSON.stringify(json)
                UserService.addUser(this.user).then( (response: ResponseData<User>) => {
                    sessionStorage.setItem('user', JSON.stringify(response.data))
                    sessionStorage.setItem('jwt', 'true')
                    this.$router.push({path: 'home'})
                }).catch( (err) => {
                    console.log(err)
                })
            } else {
                this.passwordIncorrect = true;
            }
        }
    }
})
</script>
<style scoped>
    .card-header {
        border: 0;
    }
</style>