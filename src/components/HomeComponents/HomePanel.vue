<template>
  <div class="panel-container">
    <div class="panel-wrapper">
      <Vue3DraggableResizable class="panel"
        :initW="310"
        :initH="320"
        v-model:x="x"
        v-model:y="y"
        v-model:w="w"
        v-model:h="h"
        v-model:active="active"
        :draggable="true"
        :resizable="true"
        @activated="print('activated')"
        @deactivated="print('deactivated')"
        @drag-start="print('drag-start')"
        @resize-start="print('resize-start')"
        @dragging="print('dragging')"
        @resizing="print('resizing')"
        @drag-end="print('drag-end')"
        @resize-end="print('resize-end')"
      >
      <div class="panel-header">Notifications</div>
        <div class="panel-body">
          <!-- Panel content goes here -->
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </Vue3DraggableResizable>
    </div>

  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Vue3DraggableResizable from 'vue3-draggable-resizable'
//default styles
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'

export default defineComponent({
  components: { Vue3DraggableResizable },
  data() {
    return {
      x: 300,
      y: 300,
      h: 300,
      w: 300,
      active: false
    }
  },
  props: {
         heading: {type: String}
     },
  methods: {
    print(val) {
      console.log(val)
    }
  }
})
</script>
<style>
.panel {
  width: 320px;
  height: 320px;
  position: absolute;
  top: 300px;
  left: 300px;
  border: 1px solid #000;
  user-select: none;
  background-color: #272c33;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  line-height: 1.4;
  overflow: hidden;
}
.panel-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;
}

.panel-wrapper {
  flex: 1 1 200px;
  margin: 0 10px;
}
.panel-header {
  background-color: #1f2328;
  padding: 10px;
}

.panel-body {
  padding: 10px;
}

/* Draggable and resizable styles */
.v3draggable-resizable {
  cursor: move;
  position: absolute;
  z-index: 999;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
}

.v3draggable-resizable-handle {
  cursor: pointer;
  position: absolute;
  z-index: 999;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
  width: 10px;
  height: 10px;
  background-color: #fff;
  border: 1px solid #999;
  border-radius: 2px;
}

.v3draggable-resizable-handle-top-left {
  top: -5px;
  left: -5px;
}

.v3draggable-resizable-handle-top-right {
  top: -5px;
  right: -5px;
}

.v3draggable-resizable-handle-bottom-left {
  bottom: -5px;
  left: -5px;
}

.v3draggable-resizable-handle-bottom-right {
  bottom: -5px;
  right: -5px;
}

.v3draggable-resizable-active {
  box-shadow: 0px 0px 4px #fff;
}
</style>

