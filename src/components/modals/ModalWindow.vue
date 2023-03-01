<template>

<div class="modal fade" :id="identifier" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{title}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form class="tab-content">
        <div class="modal-body">
            <Tabs />
            <Contents />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core"
import Tabs from "./MeasuramentModal/Tabs.vue";
import Contents from "./MeasuramentModal/Contents.vue";

    export default defineComponent({
        name: 'ModalWindow',
        components: {Tabs, Contents},
        props: {
            identifier: String,
            title: String
        }
    })
</script>

