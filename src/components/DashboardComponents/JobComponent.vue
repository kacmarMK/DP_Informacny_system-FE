<template lang="">
    <div class="p-2">
        <select class="form-select w-50 me-auto mb-2 ms-2" @change="setJob($event.target.value)">
            <option>Select Existing Job</option>
            <option v-for="(job, index) in jobs" :key="index" :value="job">{{job.name}}</option>
        </select>
        <div v-for="(command, index) in listOfcommands" :key="index" class="d-inline ms-2">
            <button class="btn btn-primary-blue" v-if="doesntContains(command)" @click="add(command)">{{command.name}}</button>
        </div>
        <form submit.prevent>
            <div v-for="(command, index) in job.commandEntitySet" :key="index">
                <h5>{{command.name}}</h5>
                <div class="row p-2">
                    <div class="col-lg-4 mb-2" v-for="(field, index) in command.fields" :key="index">
                        <label class="fw-bolder">{{field.name}}</label>
                        <input class="form-control" :type="field.type" :placeholder="field.name" v-model="field.value" @required="true"/>
                    </div>
                </div>
                <hr>
            </div>
            <hr>
            <div class="form-group ms-2">
                <label  class="fw-bolder">Periodic</label>
                <input type="checkbox" class="ms-2" v-model="job.periodic">   
            </div>
            <div class="row align-items-center p-2">
                <div class="form-group col-lg-4">
                    <label for="exampleInputEmail1" class="fw-bolder">Job Name</label>
                    <input type="text" class="form-control" v-model="job.name" placeholder="Job Name">
                </div>
                <div class="col-lg-2 mt-4">
                    <button class="btn btn-primary-blue mt-2 mb-2" @click="save()">Save</button>
                </div>
           </div>
            <input type="button" class="btn btn-primary-blue ms-2 mt-2 mb-2" data-bs-dismiss="modal" value="Execute Job" @click="execute()">
        </form>
    </div>
</template>
<script lang="ts">
import Command from "@/interfaces/Command";
import CommandHelper from "@/interfaces/CommandHelper";
import Job from "@/interfaces/Job";
import JobHelper from "@/interfaces/JobHelper";
import JobService from '@/services/JobService';
import ResponseData from "@/services/ResponseData";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'JobComponent',
    props: ['listOfcommands'],
    data: () => ({
        job: {} as Job,
        jobs: [] as Array<JobHelper>
    }),
    created(){
        this.job.commandEntitySet = [] as Array<Command>
        JobService.getAllJobs().then( (response: ResponseData<Array<JobHelper>>) => {
            this.jobs = response.data;
        }).catch( (err) => {
            console.log(err)
        })
    },
    methods: {
        doesntContains(command: Command){
            if(this.job.commandEntitySet.length > 0)
                return this.job.commandEntitySet.filter(c => c.id == command.id).length == 0;

            return true;
        },
        add(command: Command){
            console.log(this.job)
            this.job.commandEntitySet.push(command);
        },
        setJob(job: JobHelper){
            console.log(this.job);
            // this.job = job;
        },
        execute(){
            let jobHelper = {} as JobHelper;
            jobHelper.name = this.job.name
            jobHelper.periodic = this.job.periodic
            jobHelper.active = true
            jobHelper.commandEntitySet = [] as  Array<CommandHelper>
            this.job.commandEntitySet.forEach( (value) => {
                let command = {} as CommandHelper;
                command.name = value.name
                command.commandId = value.commandId
                command.fields = JSON.stringify(value.fields);
                jobHelper.commandEntitySet.push(command);
            })

            JobService.addJob(jobHelper).then( (response: ResponseData<Job>) => {
                // this.job = response.data
            }).catch( (err) => {
                console.log(err)
            })
        }
    }
})
</script>
<style lang="">
    
</style>