<template lang="">
       <ModalBasicWindow :identifier="id" :title="title">
            <form @submit.prevent>
                <div class="modal-body">
                <div class="form-group">
                    <label for="email" class="fw-bolder">E-mail</label>
                    <input type="email" class="form-control" id="email" placeholder="E-mail">
                </div>
                </div>
                <div class="modal-footer bg-light">
                    <input type="submit" class="btn btn-primary-blue" data-bs-dismiss="modal" @click="submitData()" :value="title"/>
                </div>
            </form>
        </ModalBasicWindow>

</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core"
import ModalBasicWindow from '../modals/ModalBasicWindow.vue'

export default defineComponent({
    props: ['id', 'title'],
    name: 'AddMemberForm',
    components: {
        ModalBasicWindow
    }
})
</script>
