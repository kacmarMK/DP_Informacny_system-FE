<template>
    <div>
      <div class="card profile-greeting alert alert-success" role="alert" v-if="showWelcome">
        <div class="text-center p-t-0">
          <h3 class="font-light">
            {{ $t('views.home_view.welcome_back') }}, {{ user.name }}
          </h3>
        </div>
      </div>
    </div>
</template>
  
<script lang="ts">
  import User from "@/interfaces/User";
  import { defineComponent } from "@vue/runtime-core";
  
  export default defineComponent({
    name: "Welcome",
    data: () => ({
      user: {} as User,
      showWelcome: false,
    }),
    created() {
        this.user = Object.assign({}, JSON.parse(sessionStorage.getItem("user") || "{}"));
        const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
        if (hasSeenWelcome) {
            this.showWelcome = false;
        } else {
            this.showWelcome = true;
            setTimeout(() => {
                this.showWelcome = false;
            }, 5000);
            localStorage.setItem('hasSeenWelcome', 'true');
        }

      }
    },
);
</script>
<style scoped>
    .profile-greeting {
        background-image: linear-gradient(rgba(20, 211, 160, 0.5), rgba(3, 102, 76, 0.8)), url('../../assets/images/bg.jpg');
        background-size: cover !important;
        background-repeat: no-repeat;
        background-position: center center;
        position: relative;
        color: white;
        padding: 20px;
        border: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
</style>