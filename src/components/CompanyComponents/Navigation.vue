<template>
    <div class="card">
        <div class="card-body">
            <h4 class="mt-2 ms-2">{{name}}</h4>
            <p class="mt-2 ms-2 fw-bolder"># {{companyId}}</p>
            <ul class="navbar-nav sidebar sidebar-dark mt-3">
                <li class="nav-item">
                    <a class="nav-link fw-bolder" type="button" data-bs-toggle="modal" data-bs-target="#infoCompany">
                        <i class="fas fa-info-circle"></i>
                        <span class="ps-2">{{$t('views.company_view.change_company_info')}}</span>
                    </a>
                </li>
                <NavLink :path="'/permissions/' + companyId" :label="$t('views.company_view.manage_permission')" icon="fas fa-user-lock"/>
                <li class="nav-item">
                    <a class="nav-link fw-bolder text-danger" @click="leaveCompany()">
                        <i class="fas fa-times"></i>
                        <span class="ps-2">Leave Company</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import NavLink from '../Sidebar/NavLink.vue'
export default {
    name: 'Navigation',
    props: {
        name: String,
        companyId: Number
    },
    components: {
        NavLink
    },
    emits: ['leaveCompany'],
    methods: {
        leaveCompany(){
            this.$emit('leaveCompany', {});
        }
    }
}
</script>
