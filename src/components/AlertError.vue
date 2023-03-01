<template lang="">
    <div class="alert alert-danger mt-2" role="alert">
        {{message}}
    </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core"

export default defineComponent({
    name: 'AlertError',
    props: {
        message: String
    }
})
</script>
