<template>
    <div class="dropdown">
        <a id="mainlang" class="nav-link dropdown-toggle arrow-none" href="#" role="button" data-bs-toggle="dropdown"  aria-expanded="false">
           <country-flag :country='selectedLang.flag' size='small'/>
           <span class="d-none d-sm-inline-block ms-2">{{selectedLang.name}}</span>
           <i class="fas fa-chevron-down fa-sm ms-2"></i>
        </a>

        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
            <li>
                <a class="dropdown-item" href="#" @click="handleLanguage('us', 'English')">
                    <country-flag country='us' size='small'/>
                    <span class="ms-2">English</span>
                </a>
           </li>
            <li>
                <a class="dropdown-item" href="#" @click="handleLanguage('sk', 'Slovenčina')">
                    <country-flag country='sk' size='small'/>
                    <span class="ms-2">Slovenčina</span>
                </a>
           </li>
            <li>
                <a class="dropdown-item" href="#" @click="handleLanguage('cz', 'Čeština')">
                    <country-flag country='cz' size='small'/>
                    <span class="ms-2">Čeština</span>
                </a>
           </li>
            <li>
                <a class="dropdown-item" href="#" @click="handleLanguage('fr', 'Français')">
                    <country-flag country='fr' size='small'/>
                    <span class="ms-2">Français</span>
                </a>
           </li>
        </ul>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core"
import CountryFlag from 'vue-country-flag-next'

export default defineComponent({
    name: "LanguageSwitcher",
    components: {
        CountryFlag
    },
    data() { 
        return { 
            lang: localStorage.getItem("language") || "en",
            selectedLang: { 
                flag: localStorage.getItem("language") || "us", 
                name: localStorage.getItem("languageName") || "English"
            }
        }
    },
    methods: {
        handleLanguage(value: string, name: string){
            localStorage.setItem('language', value)
            localStorage.setItem('languageName', name)
            location.reload();
        } 
    }
})
</script>
<style scoped>

 .nav-link {
    padding: 0;
    color: #98a6ad;
    min-width: 32px;
    display: block;
    text-align: center;
    margin: 0 10px;
    position: relative;
    font-size: 0.975rem;
}


.arrow-none:after {
    display: none;
}

</style>
