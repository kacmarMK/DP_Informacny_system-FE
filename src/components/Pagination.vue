<template>
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="previousPage">Previous</button>
      <button @click="nextPage">Next</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Pagination',
    props: {
      currentPage: {
        type: Number,
        required: true,
      },
    },
    methods: {
      previousPage() {
        this.$emit('page-changed', this.currentPage - 1);
      },
      nextPage() {
        this.$emit('page-changed', this.currentPage + 1);
      },
      goToPage(pageNumber) {
        this.$emit('page-changed', pageNumber);
      },
    },
  };
  </script>
  
  <style>
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  button {
    margin: 0 5px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;
  }
  
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
  
  button.active {
    background-color: #ccc;
  }
  </style>
  