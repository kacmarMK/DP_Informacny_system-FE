<template>
    <div class="container-fluid">
        <div class="page-header">
        <div class="row">
            <div class="col-sm-6">
            <h3>{{heading}}</h3>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/home">{{$t('main_content.home_breadcrumb')}}</router-link></li>
                <li class="breadcrumb-item" v-if="second"><router-link :to="secondPath">{{second}}</router-link></li>
                <li class="breadcrumb-item active">{{third}}</li>
            </ol>
            </div>
        </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'Breadcrumb',
    props: ['heading', 'second', 'secondPath', 'third']
})
</script>
<style scoped>
    .page-header {
    padding: 30px 10px 20px 10px;
}
.page-header .row h3 {
    font-size: 24px;
    margin-bottom: 0;
    font-weight: 600;
    text-transform: capitalize;
}

 .page-header .breadcrumb {
    background-color: transparent;
    padding: 0;
    margin-top: 5px;
    margin-bottom: 0;
}

.breadcrumb-item.active {
    text-transform: capitalize;
}

.page-header .breadcrumb li {
    color: #717171;
    font-size: 13px;
    letter-spacing: 1px;
    font-weight: 500;
}
</style>