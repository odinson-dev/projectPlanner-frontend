<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <span class="font-bold text-xl">Name</span>
      <input
        type="text"
        class="p-2 w-full mr-2 block text-l font-bold"
        :value="task.name"
        @change="updateTaskProperty($event, 'name')"
        @keydown.enter.prevent="updateTaskProperty($event, 'name')"
      >
      <span class="font-bold text-xl">Description</span>
      <textarea
        class="relative w-full bg-transparent px-2 border mt-2 h-10 border-solid leading-normal"
        :value="task.description"
        @change="updateTaskProperty($event, 'description')"
        @keydown.enter.prevent="updateTaskProperty($event, 'description')"
      />
      <span class="font-bold text-xl">Comments</span>
      <textarea
          class="relative w-full bg-transparent px-2 border mt-2 h-8 border-solid leading-normal"
          placeholder="Add Comment"
          @keydown.enter.prevent="updateTaskProperty($event, 'comments')"
        ></textarea>
      <div class="overflow-auto h-32">
        <div v-for="(comment, $commentIndex) of task.comments"
          :key="$commentIndex">
        <textarea
          class="relative w-full bg-transparent px-2 border mt-2 h-8 border-solid leading-normal"
          :value="comment"
          @keydown.enter.prevent="updateTaskProperty($event, 'comments')"
        >
        </textarea>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  title: 'Trello Assignment',
  computed: {
    ...mapGetters(['getTask']),
    task () {
      return this.getTask(this.$route.params.id)
    }
  },
  methods: {
    updateTaskProperty (e, key) {
      this.$store.commit('UPDATE_TASK', {
        task: this.task,
        key,
        value: e.target.value
      })
    },

    archiveList (e, id) {
      console.log(id)
    }
  }
}
</script>

<style>
.task-view {
  @apply relative flex flex-row bg-white pin mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>
