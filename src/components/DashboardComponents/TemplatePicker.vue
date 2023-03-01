<template lang="">
<div class="container">
    <div class="row">
        <div class="col-4 component mb-1" data-bs-dismiss="modal" @click="pickTemplate(all)">
            <div class="d-block">
                <i class="fas fa-cube fa-2x"></i>
                <h6 class="mt-1">All components</h6>
                <p>Displays all available components</p>
            </div>
        </div>
        <div class="col-4 component mb-1" data-bs-dismiss="modal" @click="pickTemplate(allCharts)">
            <div class="d-block">
                <i class="fas fa-cube fa-2x"></i>
                <h6 class="mt-1">All charts</h6>
                 <p>Displays all available charts</p>
            </div>
        </div>
        <div class="col-4 component mb-1" data-bs-dismiss="modal" @click="pickTemplate(informational)">
            <div class="d-block">
                <i class="fas fa-cube fa-2x"></i>
                <h6 class="mt-1">Informational components</h6>
                <p>Displays all informational components</p>
            </div>
        </div>
    </div>
</div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'ComponentPicker',
    props: ['dashboard'],
    data: () => ({
        all: [{ x: 0, y: 0, w: 6, h: 10, i:  0, layout: 'Table',  param1: null, param2: null  }, { x: 6, y: 0, w: 6, h: 10, i:  1, layout: 'PieChart',  param1: null, param2: null  }, { x: 0, y: 10, w: 6, h: 10, i:  2, layout: 'LineChart',  param1: null, param2: null },
            { x: 6, y: 10, w: 6, h: 10, i:  3, layout: 'BarChart', param1: null, param2: null  }, { x: 0, y: 20, w: 6, h: 10, i:  4, layout: 'AreaChart',  param1: null, param2: null  }],
        allCharts:[{ x: 0, y: 0, w: 6, h: 10, i:  0, layout: 'PieChart', param1: null, param2: null  }, { x: 6, y: 10, w: 6, h: 10, i:  1, layout: 'LineChart',  param1: null, param2: null  },
            { x: 0, y: 10, w: 6, h: 10, i:  2, layout: 'BarChart', param1: null, param2: null  }, { x: 6, y: 10, w: 6, h: 10, i:  3, layout: 'AreaChart',  param1: null, param2: null  }],
        informational: [{ x: 0, y: 0, w: 6, h: 10, i:  0, layout: 'Table', param1: null, param2: null  }, { x: 0, y: 0, w: 6, h: 10, i:  0, layout: 'SetupedValue', param1: null, param2: null }],
    }),
    emits: ["pickTemplate"],
    created(){
        this.informational[1].param1 = this.dashboard.id;
    },
    methods: {
        pickTemplate(layout: any){
            this.$emit('pickTemplate', {
                layout: layout
            })
        }
    }
})
</script>
<style scoped>
    .component {
        border: 1.5px solid var(--light-blue-bg-rgb);
        color: var(--blue-primary-color);
        display: flex;
        justify-content: center;
        padding-top: 3rem ;
        text-align: center;
        height: 15rem;
        transition: all 0.5s ease;
        cursor: pointer;
    }

    .component:hover {
        background-color: var(--blue-primary-color);
        color: white ;
    }
</style>
