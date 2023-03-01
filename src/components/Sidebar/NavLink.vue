<template lang="">
    <li class="nav-item">
        <router-link :to="path" class="nav-link  fw-bolder" href="#">
            <i :class="icon"></i>
            <span class="ps-2">{{label}}</span>
        </router-link>
    </li>
</template>
<script>
import { defineComponent } from "@vue/runtime-core"

export default defineComponent({
    name: 'NavLink',
    props: {
        icon: String,
        path: String,
        label: String
    }
})
</script>
