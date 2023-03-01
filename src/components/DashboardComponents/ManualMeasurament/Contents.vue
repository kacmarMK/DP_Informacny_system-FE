<template lang="">
    <div class="tab-content text-dark" id="nav-tabContent">
        <div  role="tabpanel" class="tab-pane fade show " id="general" aria-labelledby="general-tab"> 
            <GeneralForm :data="data" />
        </div>
        <div role="tabpanel" class="tab-pane fade" id="preparation" aria-labelledby="preparation-tab">
            Change Static Network settings
        </div>
        <div role="tabpanel" class="tab-pane fade" id="regeneration" aria-labelledby="regeneration-tab">
            Change DHCP Network settings
        </div>
        <div role="tabpanel" class="tab-pane fade" id="measurement" aria-labelledby="measurement-tab">
            Change DHCP Network settings.
        </div>
        <div role="tabpanel" class="tab-pane fade" id="calculation" aria-labelledby="calculation-tab">
            Change DHCP Network settings.
        </div>
        <div role="tabpanel" class="tab-pane fade" id="samples" aria-labelledby="samples-tab">
            Change DHCP Network settings.
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import GeneralForm from "./contents/GeneralForm.vue"
export default defineComponent({
    name: 'Contents',
    components: {GeneralForm},
    props: ['data']
})
</script>
<style lang="">
    
</style>