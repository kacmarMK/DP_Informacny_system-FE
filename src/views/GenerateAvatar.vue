<template>
<MainContent>
    <div class="container-fluid p-3">
        <div class="row">
            <div class="col-lg-3 d-flex justify-content-center align-items-center">
            <div class="w-75 h-75">
                <avataaars
                :clotheType="avatar.clotheType"
                :accessoriesType="avatar.accessoriesType"
                :clotheColor="avatar.clotheColor"
                :eyebrowType="avatar.eyebrowType"
                :eyeType="avatar.eyeType"
                :mouthType="avatar.mouthType"
                :facialHairColor="avatar.facialHairColor"
                :facialHairType="avatar.facialHairType"
                :hairColor="avatar.hairColor"
                :skinColor="avatar.skinColor"
                :topColor="avatar.topColor"
                :topType="avatar.topType"
                :graphicType="avatar.graphicType">
                </avataaars>
            </div>
            </div>
            <div class="col-lg-9">

                    <form submit.prevent>
                        <div class="row">
                            <div class="col-lg-4 mb-2">
                                <label class="fw-bolder form-label">{{$t('views.generate_avatar_view.accessories_type')}}</label>
                                <select v-model="avatar.accessoriesType" class="form-select">
                                    <option v-for="(item,index) in accessoriesType" :key="index" :value="item">{{item}}</option>
                                </select>
                            </div>
                            <div class="col-lg-4  mb-2">
                                <label class="fw-bolder form-label">{{$t('views.generate_avatar_view.clothe_type')}}</label>
                                <select v-model="avatar.clotheType" class="form-select">
                                    <option v-for="(item,index) in clotheType" :key="index" :value="item">{{item}}</option>
                                </select>
                            </div> 
                            <div class="col-lg-4  mb-2">
                                <label class="fw-bolder form-label">{{$t('views.generate_avatar_view.clothe_color')}}</label>
                                <select v-model="avatar.clotheColor" class="form-select">
                                    <option v-for="(item,index) in clotheColor" :key="index" :value="item">{{item}}</option>
                                </select>
                            </div>
                            <div class="col-lg-4  mb-2">
                                <label class="fw-bolder form-label">{{$t('views.generate_avatar_view.eye_type')}}</label>
                                <select v-model="avatar.eyeType" class="form-select">
                                    <option v-for="(item,index) in eyeType" :key="index" :value="item">{{item}}</option>
                                </select>
                            </div>
                            <div class="col-lg-4  mb-2">
                                <label class="fw-bolder form-label">{{$t('views.generate_avatar_view.eyebrow_type')}}</label>
                                <select v-model="avatar.eyebrowType" class="form-select">
                                    <option v-for="(item,index) in eyebrowType" :key="index" :value="item">{{item}}</option>
                                </select>
                            </div>
                            <div class="col-lg-4  mb-2">
                                <label class="fw-bolder form-label">{{$t('views.generate_avatar_view.facial_hair_type')}}</label>
                                <select v-model="avatar.facialHairType" class="form-select">
                                    <option v-for="(item,index) in facialHairType" :key="index" :value="item">{{item}}</option>
                                </select>
                            </div>
                            <div class="col-lg-4  mb-2">
                                <label class="fw-bolder form-label">{{$t('views.generate_avatar_view.facial_hair_color')}}</label>
                                <select v-model="avatar.facialHairColor" class="form-select">
                                    <option v-for="(item,index) in facialHairColor" :key="index" :value="item">{{item}}</option>
                                </select>
                            </div>
                            <div class="col-lg-4  mb-2">
                                <label class="fw-bolder form-label">{{$t('views.generate_avatar_view.graphic_type')}}</label>
                                <select v-model="avatar.graphicType" class="form-select">
                                    <option v-for="(item,index) in graphicType" :key="index" :value="item">{{item}}</option>
                                </select>
                            </div>
                            <div class="col-lg-4  mb-2">
                                <label class="fw-bolder form-label">{{$t('views.generate_avatar_view.skin_color')}}</label>
                                <select v-model="avatar.skinColor" class="form-select">
                                    <option v-for="(item,index) in skinColor" :key="index" :value="item">{{item}}</option>
                                </select>
                            </div>
                            <div class="col-lg-4  mb-2">
                                <label class="fw-bolder form-label">{{$t('views.generate_avatar_view.mouth_type')}}</label>
                                <select v-model="avatar.mouthType" class="form-select">
                                    <option v-for="(item,index) in mouthType" :key="index" :value="item">{{item}}</option>
                                </select>
                            </div>
                            <div class="col-lg-4  mb-2">
                                <label class="fw-bolder form-label">{{$t('views.generate_avatar_view.hair_color')}}</label>
                                <select v-model="avatar.hairColor" class="form-select">
                                    <option v-for="(item,index) in hairColor" :key="index" :value="item">{{item}}</option>
                                </select>
                            </div>
                            <div class="col-lg-4  mb-2">
                                <label class="fw-bolder form-label">{{$t('views.generate_avatar_view.top_type')}}</label>
                                <select v-model="avatar.topType" class="form-select">
                                    <option v-for="(item,index) in topType" :key="index" :value="item">{{item}}</option>
                                </select>
                            </div>
                           <div class="col-lg-4  mb-2">
                                <label class="fw-bolder form-label">{{$t('views.generate_avatar_view.top_color')}}</label>
                                <select v-model="avatar.topColor" class="form-select">
                                    <option v-for="(item,index) in topColor" :key="index" :value="item">{{item}}</option>
                                </select>
                            </div>
                        </div> 
                        <input class="btn btn-primary-blue mt-2" value="Save" @click="submit()"/>
                    </form>
                </div>
            </div>
        </div>
</MainContent>
</template>

<script lang="ts">
import User from '@/interfaces/User'
import UserService from '@/services/UserService'
import { defineComponent } from '@vue/runtime-core'
import Avataaars from 'vuejs-avataaars/src/Avataaars.vue'
import MainContent from '../components/MainContent.vue'
import Avatar from '../interfaces/Avatar'
export default defineComponent({
    name: 'GenerateAvatar',
    data: () => ({ 
        avatar: {} as Avatar,
        user: {} as User,
        accessoriesType: ['Blank',"Kurt","Prescription01","Prescription02","Round","Sunglasses","Wayfarers"],
        clotheType: ["BlazerShirt","BlazerSweater","CollarSweater","GraphicShirt","Hoodie","Overall",
        "ShirtCrewNeck","ShirtScoopNeck","ShirtVNeck"],
        clotheColor: ["Black","Blue01","Blue02","Blue03","Gray01","Gray02","Heather","PastelBlue","PastelGreen","PastelOrange",
        "PastelRed","PastelYellow","Pink","Red","White"],
        eyebrowType: ["Angry","AngryNatural","Default","DefaultNatural","FlatNatural","RaisedExcited",
        "RaisedExcitedNatural","SadConcerned","SadConcernedNatural","UnibrowNatural","UpDown","UpDownNatural"],
        eyeType: ["Close","Cry","Default","Dizzy","EyeRoll","Happy",
        "Hearts","Side","Squint","Surprised","Wink","WinkWacky"],
        facialHairColor: ["Auburn","Black","Blonde","BlondeGolden","Brown","BrownDark","PastelPink","Platinum",
                        "Red","SilverGray"],
        facialHairType: ["Blank","BeardMedium","BeardLight","BeardMagestic","MoustacheFancy","MoustacheMagnum"],     
        graphicType: ["Bat","Cumbia","Deer","Diamond","Hola","Pizza","Resist","Selena","Bear","SkullOutline","Skull"],
        skinColor: ["Tanned","Yellow","Pale","Light","Brown","DarkBrown","Black"],
        hairColor: ["Auburn","Black","Blonde","BlondeGolden","Brown","BrownDark","PastelPink","Platinum","Red","SilverGray"],
        mouthType: ["Concerned","Default","Disbelief","Eating","Grimace","Sad","ScreamOpen","Serious","Smile","Tongue","Twinkle","Vomit"],
        topType: ["NoHair","Eyepatch","Hat","Hijab","Turban","WinterHat1","WinterHat2","WinterHat3","WinterHat4","LongHairBigHair","LongHairBob","LongHairBun","LongHairCurly","LongHairCurvy","LongHairDreads",
            "LongHairFrida", "LongHairFro","LongHairFroBand","LongHairNotTooLong","LongHairShavedSides","LongHairMiaWallace","LongHairStraight","LongHairStraight2","LongHairStraightStrand","ShortHairDreads01",
            "ShortHairDreads02","ShortHairFrizzle","ShortHairShaggyMullet","ShortHairShortCurly","ShortHairShortFlat","ShortHairShortRound","ShortHairShortWaved", "ShortHairSides","ShortHairTheCaesar","ShortHairTheCaesarSidePart"],
        topColor: ["Black", "Blue01", "Blue02", "Blue03","Gray01","Gray02","Heather","PastelBlue","PastelGreen","PastelOrange","PastelRed","PastelYellow","Pink","Red","White","Blue01",
           "Blue02","Blue03","Gray01","Gray02","Heather","PastelBlue","PastelGreen","PastelOrange","PastelRed","PastelYellow","Pink","Red","White"]


    }),
    components: {
        Avataaars,
        MainContent
    },
    created() {
        let user: User = Object.assign({}, JSON.parse(sessionStorage.getItem('user') || '{}'));
        this.user = user
        if(user.avatar == undefined){
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
            user.avatar = JSON.stringify(json)
        }

        this.avatar = Object.assign(JSON.parse(user.avatar));

    },
    methods: {
        submit(){
            this.user.avatar = JSON.stringify(this.avatar);
            sessionStorage.setItem('user', JSON.stringify(this.user))
            UserService.addUser(this.user).then( () => {
                console.log("user added")
            }).catch( (err) => {
                console.log(err)
            })
        }
    }

})
</script>