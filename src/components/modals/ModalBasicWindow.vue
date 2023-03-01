<template lang="">
<div class="modal fade" :id="identifier" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title text-primary-blue" id="exampleModalLabel">{{title}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <slot></slot>
    </div>
  </div>
</div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
        name: 'ModalWindow',
        props: {
            identifier: String,
            title: String
        },
})
</script>
