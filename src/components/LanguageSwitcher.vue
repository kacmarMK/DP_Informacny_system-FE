<template>
    <div className="dropdown">
        <a id="mainlang" className="nav-link dropdown-toggle arrow-none" href="#" role="button" data-bs-toggle="dropdown"  aria-expanded="false">
           <country-flag :country='selectedLang.flag' size='small'/>
           <span className="d-none d-sm-inline-block ms-2">{{selectedLang.name}}</span>
           <i className="fas fa-chevron-down fa-sm ms-2"></i>
        </a>

        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
            <li>
                <a className="dropdown-item" href="#" @click="handleLanguage('gb', 'English')">
                    <country-flag country='gb' size='small'/>
                    <span className="ms-2">English</span>
                </a>
           </li>
            <li>
                <a className="dropdown-item" href="#" @click="handleLanguage('sk', 'Slovenčina')">
                    <country-flag country='sk' size='small'/>
                    <span className="ms-2">Slovenčina</span>
                </a>
           </li>
            <li>
                <a className="dropdown-item" href="#" @click="handleLanguage('cz', 'Čeština')">
                    <country-flag country='cz' size='small'/>
                    <span className="ms-2">Čeština</span>
                </a>
           </li>
            <li>
                <a className="dropdown-item" href="#" @click="handleLanguage('fr', 'Français')">
                    <country-flag country='fr' size='small'/>
                    <span className="ms-2">Français</span>
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
            lang: localStorage.getItem("language") || "gb",
            selectedLang: { 
                flag: localStorage.getItem("language") || "gb", 
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
