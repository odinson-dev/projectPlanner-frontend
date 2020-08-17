import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const board = { 'name': 'Trello Demo', 'columns': [] }

export default new Vuex.Store({
  state: {
    board
  },
  getters: {
    getTask (state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    }
  },
  mutations: {
    CREATE_TASK (state, { id, tasks, name }) {
      axios.post('/task/create', { 'name': name, 'listId': id })
        .then(response => {
          tasks.push({
            name,
            id: response.data.message.id,
            description: ''
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    CREATE_COLUMN (state, { name, id }) {
      axios.post('/list/create', { 'name': name })
        .then(response => {
          state.board.columns.push({
            name,
            id: response.data.message.id,
            tasks: []
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    UPDATE_TASK (state, { task, key, value }) {
      let jsonToSend = { 'id': task.id }
      jsonToSend[key] = value
      axios.put('/task/update', jsonToSend)
        .then(response => {
          let responseData = response.data.message
          let column = state.columns.filter((item) => { return item.id === responseData.listId })
          let columnIndex = state.columns.indexOf(column)
          let task = column.filter((item) => { return item.id === responseData.id })
          let taskIndex = column.indexOf(task)
          state.columns[columnIndex].tasks[taskIndex]['id'] = responseData['id']
          state.columns[columnIndex].tasks[taskIndex]['name'] = responseData['name']
          state.columns[columnIndex].tasks[taskIndex]['description'] = responseData['description']
          state.columns[columnIndex].tasks[taskIndex]['comments'] = responseData['comments']
        })
        .catch(err => {
          console.log(err)
        })
    },
    MOVE_TASK (state, { fromTasks, toTasks, fromTaskIndex, toTaskIndex, toColumnIndex }) {
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0]
      axios.put('task/update', { id: taskToMove.id, listId: toColumnIndex })
        .then(response => {
          toTasks.splice(toTaskIndex, 0, taskToMove)
        })
        .catch(err => {
          console.log(err)
        })
    },
    MOVE_COLUMN (state, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns

      const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
      columnList.splice(toColumnIndex, 0, columnToMove)
    }
  }
})
