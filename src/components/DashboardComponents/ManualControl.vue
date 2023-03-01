<template lang="">
<div v-if="commands.length > 0">

</div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import Command from '@/interfaces/Command';
export default defineComponent({
    name: 'ManualControl',
    props: ['commands1'],
    emits: ['control'],
    data: () => ({
        commands: [] as Array<Command>
    }),
    created(){  

        this.commands = this.commands1;
       
    },
    methods: {
        control(command: Command){
            this.$emit('control',command);
        }
    }
})
</script>
<style lang="">
    
</style>