<template lang="">
    <div>
        <button class="btn btn-primary-blue me-2" @click="updateData('ten_min',Math.floor(new Date(new Date().getTime() + 10*60000)), Math.floor(new Date().getTime() / 1000) )" :class="{active: selection==='ten_min'}">
            10 min
        </button>
        <button class="btn btn-primary-blue me-2" @click="updateData('one_hour',Math.floor(new Date(new Date().getTime() + 60*60000)),Math.floor(new Date().getTime() / 1000))" :class="{active: selection==='one_hour'}">
            1h
        </button>
        <button  class="btn btn-primary-blue me-2" @click="updateData('six_hours',Math.floor(new Date(new Date().getTime() + 360*60000)),Math.floor(new Date().getTime() / 1000))" :class="{active: selection==='six_hours'}">
            6h
        </button>
        <button  class="btn btn-primary-blue me-2" @click="updateData('twelve_hours',Math.floor(new Date(new Date().getTime() + 720*60000)),Math.floor(new Date().getTime() / 1000))" :class="{active: selection==='twelve_hours'}">
            12h
        </button>
        <button  class="btn btn-primary-blue me-2" @click="updateData('one_day',Math.floor(new Date(new Date().setDate(new Date().getDate()-1))),Math.floor(new Date().getTime() / 1000))" :class="{active: selection==='one_day'}">
            1d
        </button>
        <button  class="btn btn-primary-blue me-2" @click="updateData('one_week')" :class="{active: selection==='one_week'}">
            1w
        </button>
        <button  class="btn btn-primary-blue me-2" @click="updateData('one_month')" :class="{active: selection==='one_month'}">
            1m
        </button>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core"

export default defineComponent({
    name: 'Buttons',
    data: () => ({
        selection: '' as string
    }),
    emits: ['changeTimeLine'],
    methods: {
        updateData(name: string, millisFrom: number, millisTo: number){
            this.selection = name
            this.$emit('changeTimeLine', {
                from: millisFrom,
                to: millisTo
            })
        }
    }
})
</script>
<style scoped>
    .active {
        background: var(--blue-primary-color);
        color: white;
    }
</style>