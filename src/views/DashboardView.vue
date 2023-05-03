<template>
  <MainContent>
    <Spinner v-if="loading"/>
    <div v-else>
      <Breadcrumb :heading="dashboard.name" secondPath="/modules" :second="$t('views.modul_view.heading')"
      :third="dashboard.name" />
      <div class="container-fluid">
          <AlertError :message="$t('views.login_screen.login_invalid')" v-if="error"/>
          <div class="d-flex justify-content-start mt-3">
              <button class="btn btn-primary-blue p-2" data-bs-toggle="modal" data-bs-target="#addComponent" v-if="draggable">
                <i class="fas fa-plus-circle me-1"></i>
                {{$t('buttons.add_component')}}
              </button>
              <ModalBasicWindow identifier="addComponent" :title="$t('buttons.add_component')">
                  <ComponentPicker @pickComponent="addItem($event)"/>
            </ModalBasicWindow>
            <button class="btn btn-primary-blue p-2 ms-2" @click="editMode()" v-if="!draggable">
                <i class="fas fa-edit me-1"></i>
                {{$t('buttons.edit_mode')}}
            </button>

             <button class="btn btn-primary-blue p-2 ms-2" data-bs-toggle="modal" data-bs-target="#addTemplate" v-if="draggable">
                <i class="fa-solid fa-cubes me-1"></i>               
                {{$t('buttons.templates')}}
            </button>
            <ModalBasicWindow identifier="addTemplate" :title="$t('buttons.templates')">
                  <TemplatePicker @pickTemplate="template($event)" :dashboard="dashboard"/>
            </ModalBasicWindow>
            <button class="btn btn-primary-blue p-2 ms-2" @click="save()" v-if="draggable">
                <i class="fas fa-save me-1"></i>
                {{$t('buttons.save')}}
              </button>
              <button class="btn btn-primary-blue p-2 ms-2" @click="refresh()" v-if="draggable">
                <i class="fas fa-times me-1"></i>
                {{$t('buttons.cancel')}}
              </button>

            <button class="btn btn-primary-blue p-2 ms-2" data-bs-toggle="modal" data-bs-target="#manualControl">
                <i class="fa-solid fa-terminal me-1"></i>               
                     Manual Control 
            </button>
            <ModalBasicWindow identifier="manualControl" title="Manual Control">
                   <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation"  v-for="(command,index) in commands" :key="index">
                        <a class="nav-link" :class="index == 0 ? 'active': ''"  data-bs-toggle="tab" :href="'#panel' + index" role="tab" aria-selected="true">{{command.name}}</a>
                        </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade" :id="'panel' + index" role="tabpanel" aria-labelledby="home-tab"
                        v-for="(command, index) in commands" :key="index" :class=" index == 0 ? 'show active' : ''" >
                        <form submit.prevent>
                            <div class="row p-2">
                                <div class="col-lg-4 mb-2" v-for="(field, index) in command.fields" :key="index">
                                    <label class="fw-bolder">{{field.name}}</label>
                                    <input class="form-control" :type="field.type" :placeholder="field.name" v-model="field.value"/>
                                </div>
                            </div>
                            <input type="button" class="btn btn-primary-blue ms-2 mb-2" data-bs-dismiss="modal" value="Send" @click="control(command)">
                        </form>
                        </div>
                    </div>
            </ModalBasicWindow>
            <button class="btn btn-primary-blue p-2 ms-2" data-bs-toggle="modal" data-bs-target="#jobControl">
                <i class="fa-solid fa-terminal me-1"></i>               
                     Job 
            </button>
            <ModalBasicWindow identifier="jobControl" title="Job">
              <JobComponent :listOfcommands="commands"/>
            </ModalBasicWindow>
            
          </div>
          <grid-layout 
            v-model:layout="layout"
            :col-num="colNum"
            :row-height="30"
            :is-draggable="draggable"
            :is-resizable="resizable"
            :vertical-compact="true"
            :use-css-transforms="false"
          >
            <grid-item v-for="(item,index) in layout" :key="index"
              :static="item.static"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              :i="item.i"
              class="bg-white"
            >
              <span class="remove text-danger" style="cursor:pointer" @click="removeItem(item.i)" v-if="draggable">x</span>
              <RenderContent :content="item.layout" :id="index" :param1="item.param1" :param2="item.param2" />
            </grid-item>
          </grid-layout>
          
    </div>
   </div>
  </MainContent>
</template>
<script>
import { GridLayout, GridItem } from "vue3-grid-layout"
import { defineComponent } from '@vue/runtime-core'
import MainContent from '../components/MainContent.vue'
import ModalBasicWindow from '../components/modals/ModalBasicWindow.vue'
import ComponentPicker from '../components/DashboardComponents/ComponentPicker.vue'
import TemplatePicker from '../components/DashboardComponents/TemplatePicker.vue'

import AlertError from '../components/AlertError.vue'
import RenderContent from '../components/RenderContent.vue'
import DashboardService from "@/services/DashboardService"
import Spinner from '@/components/Spinner.vue';
import Breadcrumb from '../components/Breadcrumb.vue'
import DeviceTypeService from "@/services/DeviceTypeService"
// import ManualControl from '../components/DashboardComponents/ManualControl.vue'
import JobService from "@/services/JobService"
export default defineComponent({
    name: 'DashboardView',
    props: ['id'],
    components: {
      MainContent,
      RenderContent,
      GridLayout,
      GridItem,
      AlertError,
      ModalBasicWindow,
      ComponentPicker,
      TemplatePicker,
      Spinner,
      Breadcrumb
    },
    data: () => ({
      layout: [],
      draggable: false,
      resizable: false,
      colNum: 12,
      index: 0,
      error: false,
      dashboard: {},
      loading: true,
      permission: {},
      commands: {},
      manualControl: [],

    }),
    created() {
      let store = this.$store.getters.getLayout(this.id);
      let user = Object.assign({}, JSON.parse(sessionStorage.getItem('user') || '{}'));
      if(user.permissionEntity)
        this.permission = user.permissionEntity

      if(store.length > 0){
        this.layout = store.layout;
        this.loading = false
      }else {
        DashboardService.getDashboardById(this.id).then( (response) => { 
          this.layout = response.data.layout == null ? [] : JSON.parse(response.data.layout);
          this.dashboard = response.data
          if(this.layout.length > 0)
            this.dashboard.layout = this.layout
          else {
            this.dashboard.layout = []
          }
          this.$store.commit('addModule', response.data)

          DeviceTypeService.getTypeOfDeviceByName(response.data.type).then( ({data}) => {
            this.commands = data.commands;

            this.commands.forEach((element,index) => {
                this.commands[index].fields = JSON.parse(element.fields);
            });
          }).catch( (err) => {
            console.log(err)
          })
          this.loading = false
        }).catch( (err) => {
          console.log(err)
          this.error = true
        });
      }

    },
    methods: {
      removeItem(id){
          const index = this.layout.map(item => item.i).indexOf(id);
          this.layout.splice(index, 1);
      },
      mounted() {
        this.index = this.layout.length;
      },
      template(template){
        console.log(template)
        this.layout = template.layout;
      },
      getContent(content,id){
        return '<' + content + ' id="' + id + '" />';
      },
      addItem(data) {
         this.layout.push({
                x: (this.layout.length * 2) % (this.colNum || 12),
                y: this.layout.length + (this.colNum || 12), // puts it at the bottom
                w: 6,
                h: 10,
                i:  this.index,
                layout: data.layout
            });
            this.index++;
      },
      editMode(){
        this.draggable = !this.draggable;
        this.resizable = !this.resizable;
      },
      refresh(){
        window.location.reload();
      },
      save(){
        this.changeLayout()
        this.editMode();
      },
      changeLayout(){
          this.dashboard.layout = JSON.stringify(this.layout)
          DashboardService.addDashboard(this.dashboard).then( (response) => {
            this.dashboard = response.data
            this.layout = response.data.layout == null ? [] : JSON.parse(response.data.layout);
          }).catch( (err) => {
            console.log(err);
          })
      },
      control(command){
        let commandHelper = {}
        commandHelper.fields = JSON.stringify(command.fields);
        commandHelper.id = command.id;
        commandHelper.name = command.name;
        commandHelper.commandId = command.commandId;
        let jobHelper = {} 
        jobHelper.commandEntitySet = []
        jobHelper.commandEntitySet.push(commandHelper)
        jobHelper.periodic = false
        jobHelper.active = true
        JobService.addJob(jobHelper).then( () => {
          console.log("succes");
        }).catch( (err) => {
          console.log(err)
        })
      }
    }
})
</script>
