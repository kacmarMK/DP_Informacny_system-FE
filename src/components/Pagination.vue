<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item">
            <a class="page-link" href="#" @click="nextPrev(-1)" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
            </a>
            </li>
            <li class="page-item"><a class="page-link" @click="changePage(1)" href="#">1</a></li>
            <li class="page-item"><a class="page-link" @click="changePage(2)" href="#">2</a></li>
            <li class="page-item"><a class="page-link" @click="changePage(3)" href="#">3</a></li>
            <li class="page-item">
            <a class="page-link" href="#" @click="nextPrev(1)" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
            </a>
            </li>
        </ul>
    </nav>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core"

export default defineComponent({
    name: 'Pagination',
    data: () => ({
        pageNumber: 1
    }),
    emits: ['handlePaging'],
    methods: {
        changePage(num:number){
            this.pageNumber = num
            this.$emit('handlePaging', {
                page: num,
            })
        },
        nextPrev(num: number){
            let newNum = this.pageNumber + num 
            this.pageNumber = newNum
            this.$emit('handlePaging', {
                page: newNum,
            })
        }
    }
})
</script>
<style lang="">
    
</style>