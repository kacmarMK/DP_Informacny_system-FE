
<template>
    <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" id="general-tab" aria-current="page" data-bs-toggle="tab" role="tab" 
            href="#general" aria-controls="general" aria-selected="true">{{t('tabs.general')}}</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="preparation-tab"  data-bs-toggle="tab" role="tab"  href="#preparation" 
            aria-controls="preparation" aria-selected="false">{{t('tabs.preparation')}}</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="regeneration-tab" data-bs-toggle="tab" role="tab" href="#regeneration" 
            aria-controls="regeneration" aria-selected="false">{{t('tabs.regeneration')}}</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="measurement-tab"  data-bs-toggle="tab" role="tab" href="#measurement" 
            aria-controls="measurement" aria-selected="false">{{t('tabs.measurement')}}</a>
        </li>
        <li class="nav-item">
            <a class="nav-link " id="calibration-tab" data-bs-toggle="tab" role="tab" href="#calibration" 
            aria-controls="calibration" aria-selected="false">{{t('tabs.calibration')}}</a>
        </li>
        <li class="nav-item">
            <a class="nav-link " id="calculation-tab"  data-bs-toggle="tab" role="tab" href="#calculation"
             aria-controls="calculation" aria-selected="false">{{t('tabs.calculation')}}</a>
        </li>
        <li class="nav-item">
            <a class="nav-link " id="samples-tab" data-bs-toggle="tab" role="tab" href="#samples" 
            aria-controls="samples" aria-selected="false">{{t('tabs.samples')}}</a>
        </li>
    </ul>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: 'Tabs',
  setup() {
    const { t } = useI18n();
    return {
        t,
    };
  },
})
</script>
<style cope>

    .nav-link a {
        color: black;
    }
    .active{
        color: #109CF1;
    }
</style>