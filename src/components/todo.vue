<template>
  <div>
    <h4>Todo List</h4>
    <ul>
      <li v-for="item in todos" :key="item.id">
        <div class="list-item">
          <p>{{ item.todo }}</p>
          <button class="delete-button" @click="deleteTodo(item.id)">X</button>
        </div>      
      </li>
    </ul>
    <input type="text" v-model="new_todo">
    <button @click="addNewTodo">Add New Todo</button>
  </div>
</template>

<script>
import axios from 'axios'
import CryptoJS from 'crypto-js'

export default {
  data: function() {
    return {
      todos: [],
      new_todo: "",
      decrypted_pass: localStorage.getItem('password') ? CryptoJS.AES.decrypt(localStorage.getItem('password'), "secret").toString(CryptoJS.enc.Utf8) : ''
    }
  },
  mounted: function() {
    axios.get("http://localhost:5000/todo",{
      headers: {
        username: localStorage.getItem('username'),
        password: this.decrypted_pass
      }
    }).then(result => {
      this.todos = result.data.data
    })
  },
  methods: {
    addNewTodo: function() {
      axios.post("http://localhost:5000/todo",{
        todo: this.new_todo,
      }, {
        headers: {
          username: localStorage.getItem('username'),
          password: this.decrypted_pass
        }
      }).then(result => {
        this.todos.push(result.data)
        this.new_todo = ""
      })
    },
    deleteTodo: function(id) {
      axios.delete("http://localhost:5000/todo/"+ id,{
        headers: {
          username: localStorage.getItem('username'),
          password: this.decrypted_pass
        }
      }).then(result => {
        this.todos = this.todos.filter(function(item) {
          return item.id != result.data.id
        })
      })
    }  
  }
}
</script>

<style scoped>
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
}
</style>
