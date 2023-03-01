<template lang="">
    <MainContent>
		<Breadcrumb :heading="$t('views.profile_view.breadcrumb.heading')" :third="$t('views.profile_view.breadcrumb.link')" />
		<div class="container-fluid">
			<div class="row gutters mt-4">
				<div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
					<div class="card h-100">
						<div class="card-body">
							<div class="account-settings">
								<div class="user-profile">
									<h6 class="user-name">#{{user.id}} {{user.username}}</h6>
									<div class="user-avatar" @click="route()" style="cursor:pointer">
										<avataaars
											:clotheType="avatar.clotheType"
											:accessoriesType="avatar.accessoriesType"
											:clotheColor="avatar.clotheColor"
											:eyebrowType="avatar.eyebrowType"
											:eyeType="avatar.eyeType"
											:mouthType="avatar.mouthType"
											:facialHairColor="avatar.facialHairColor"
											:facialHairType="avatar.facialHairType"
											:hairColor="avatar.hairColor"
											:skinColor="avatar.skinColor"
											:topColor="avatar.topColor"
											:topType="avatar.topType"
											:graphicType="avatar.graphicType">
										</avataaars>
									</div>
									<h5 class="user-name">{{user.name}} {{user.surname}}</h5>
									<h6 class="user-email">{{user.email}}</h6>
									<h6 class="user-email mt-2">{{user.phone}}</h6>
									<h5 class="user-name mt-5" v-if="user.company != null">
										<i class="fas fa-building me-2"></i>{{company.name}}
										<h6 class="user-email mt-2"> # {{user.company}} </h6>
									</h5>
							
								</div>

							</div>
						</div>
					</div>
				</div>
				<div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
					<div class="card h-100">
						<div class="card-body">
							<form @submit.prevent>
								<div class="row gutters">
									<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
										<h6 class="mb-2 fw-bolder text-primary-blue">{{$t('views.profile_view.personal')}}</h6>
									</div>
									<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div class="form-group">
											<label for="name" class="fw-bolder">{{$t('views.profile_view.details_form.name')}}</label>
											<input type="text" class="form-control" v-model="user.name" id="name" :placeholder="$t('views.profile_view.details_form.name_placeholder')">
										</div>
									</div>
									<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div class="form-group">
											<label for="surname" class="fw-bolder">{{$t('views.profile_view.details_form.surname')}}</label>
											<input type="text" class="form-control" id="surname" v-model="user.surname" :placeholder="$t('views.profile_view.details_form.surname_placeholder')">
										</div>
									</div>
									<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-3">
										<div class="form-group">
											<label for="email" class="fw-bolder">{{$t('views.profile_view.details_form.email')}}</label>
											<input type="email" class="form-control" id="email" v-model="user.email" :placeholder="$t('views.profile_view.details_form.email_placeholder')">
										</div>
									</div>
									<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-3">
										<div class="form-group">
											<label for="phone" class="fw-bolder">{{$t('views.profile_view.details_form.phone')}}</label>
											<input type="text" class="form-control" id="phone" v-model="user.phoneNumber" :placeholder="$t('views.profile_view.details_form.phone_placeholder')">
										</div>
									</div>
								</div>
								<div class="row gutters">
									<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
										<h6 class="mt-3 mb-2 fw-bolder text-primary-blue">{{$t('views.profile_view.change_password')}}</h6>
									</div>
									<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div class="form-group">
											<label for="password" class="fw-bolder">{{$t('views.profile_view.password_form.password')}}</label>
											<input type="password" class="form-control" id="password" v-model="user.password" :placeholder="$t('views.profile_view.password_form.password_placeholder')">
											<div id="passwordHelp" class="form-text text-danger" v-if="password_err">{{$t('views.profile_view.password_form.password_dont_match')}}</div>
										</div>
									</div>
									<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div class="form-group">
											<label for="repeat" class="fw-bolder">{{$t('views.profile_view.password_form.repeat_password')}}</label>
											<input type="password" class="form-control" id="reapeat" v-model="repeat" :placeholder="$t('views.profile_view.password_form.repeat_placeholder')">
											<div id="repeatHelp" class="form-text text-danger" v-if="password_err">{{$t('views.profile_view.password_form.password_dont_match')}}</div>
										</div>
									</div>
								</div>
								<div class="row gutters">
									<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-2">
										<div class="text-right">
											<button type="button" id="submit" name="submit" @click="submit()" class="btn btn-primary-blue mt-3">{{$t('views.profile_view.update_button')}}</button>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>

    </MainContent>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import MainContent from "../components/MainContent.vue";
import User from "../interfaces/User";
import UserService from "../services/UserService";
import Breadcrumb from "../components/Breadcrumb.vue";
import ResponseData from "@/services/ResponseData";
import CompanyService from "@/services/CompanyService";
import Company from "@/interfaces/Company";
import Avataaars from 'vuejs-avataaars/src/Avataaars.vue'
import Avatar from "@/interfaces/Avatar";


export default defineComponent({
  name: "ProfileView",
  components: { MainContent, Breadcrumb, Avataaars },
  data: () => ({
    user: {} as User,
    repeat: "" as string,
    old_password: "" as string,
    password_err: false as boolean,
    company: {} as Company,
	avatar: {} as Avatar
  }),
  created() {
    let user: User = Object.assign({},JSON.parse(sessionStorage.getItem("user") || "{}"));
    this.user = user;

	if(this.user.avatar){
		this.avatar = JSON.parse(this.user.avatar);
	}

    this.old_password = user.password == undefined ? "" : user.password;
    let company = user.company != undefined ? user.company : "";

    if (company != "") {
      CompanyService.getCompany(company)
        .then((response: ResponseData<Company>) => {
          this.company = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  methods: {
    submit() {
      this.password_err = false;

      if (this.user.password == this.old_password) {
        this.updateUser();
      } else {
        if (this.user.password === this.repeat) {
          this.updateUser();
        } else {
          this.password_err = true;
        }
      }
    },
	route(){
		this.$router.push({ path: "/avatar"})
	},
    updateUser() {
      UserService.addUser(this.user)
        .then((response: ResponseData<User>) => {
          if (response.data != undefined)
            sessionStorage.setItem("user", JSON.stringify(this.user));
        })
        .catch((error: any) => {
          console.log(error);
        });
    },
  },
});
</script>

<style scoped>
.account-settings .user-profile {
  margin: 0 0 1rem 0;
  padding-bottom: 1rem;
  text-align: center;
}
.account-settings .user-profile .user-avatar {
  margin: 0 0 1rem 0;
}
.account-settings .user-profile .user-avatar img {
  width: 90px;
  height: 90px;
  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
  border-radius: 100px;
}
.account-settings .user-profile h5.user-name {
  margin: 0 0 0.5rem 0;
}

.account-settings .user-profile h5.user-name i {
  color: var(--blue-primary-color);
}
.account-settings .user-profile h6.user-email {
  margin: 0;
  font-size: 0.8rem;
  font-weight: 400;
  color: #9fa8b9;
}
.account-settings .about {
  margin: 2rem 0 0 0;
  text-align: center;
}
.account-settings .about h5 {
  margin: 0 0 15px 0;
  color: #007ae1;
}
.account-settings .about p {
  font-size: 0.825rem;
}
.form-control {
  border: 1px solid #cfd1d8;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  font-size: 0.825rem;
  background: #ffffff;
  color: #2e323c;
}

.card {
  background: #ffffff;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  border: 0;
  margin-bottom: 1rem;
}
</style>
