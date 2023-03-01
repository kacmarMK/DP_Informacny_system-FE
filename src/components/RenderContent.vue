<template lang="">
    <v-runtime-template :template="content2" v-if="test()"></v-runtime-template>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import VRuntimeTemplate from "vue3-runtime-template";
export default defineComponent({
    name: 'RenderContent',
    components: {
        VRuntimeTemplate
    },
    props: {
        content: String,
        id: Number,
        param1: String,
        param2: String
    },
    data: () => ({
        content2: '' as string
    }),
    created() {
        this.content2 = '<' + this.content + ' id="' + this.id + '" param1="' + this.param1 + '" param2="' + this.param2 +'"  />'
    },
    methods: {
        test(){
            console.log(this.content2);
            return true;
        }
    }
})
</script>
<style lang="">
    
</style>