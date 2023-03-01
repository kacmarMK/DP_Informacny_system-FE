<template lang="">
    <td>#{{index}}</td>
    <td>{{name}}</td>
    <td v-if="team">{{team}}</td>
    <td>
        <router-link :to="path" class="fw-bolder">
        Redirect<i class="fas fa-arrow-right ms-2"></i>
        </router-link>
    </td>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core"

export default defineComponent({
    name: "FavoriteList",
    props: {
        path: String,
        index: Number,
        name: String,
        team: String
    }
})
</script>
<style scoped>
        td {
        padding: 15px;
    }
    .table-hover tbody tr:hover td, .table-hover tbody tr:hover th {
        background-color: var(--light-blue-bg-rgb);
        color: var(--blue-primary-color);
    }
</style>