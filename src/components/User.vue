<template>
  <div>
    <h4>User List</h4>
    <ul>
      <li v-for="item in users" :key="item.id">
        <div class="list-item">
          <p>{{ item.username }}</p>
          <button class="delete-button" @click="deleteUser(item.id)">X</button>
        </div>      
      </li>
    </ul>
    <input type="text" v-model="username">
    <input type="text" v-model="password">
    <button @click="addNewUser">Add</button>
  </div>
</template>

<script>
import axios from 'axios'
import CryptoJS from 'crypto-js'

export default {
  data: function() {
    return {
      users: [],
      username: "",
      password: "",
      decrypted_pass: localStorage.getItem('password') ? CryptoJS.AES.decrypt(localStorage.getItem('password'), "secret").toString(CryptoJS.enc.Utf8) : ''
    }
  },
  mounted: function() {
    axios.get("http://localhost:5000/user",{
      headers: {
        username: localStorage.getItem('username'),
        password: this.decrypted_pass 
      }
    }).then(result => {
      this.users = result.data.data
    })
  },
  methods: {
    addNewUser: function() {
      axios.post("http://localhost:5000/user",{
        headers: {
            username: localStorage.getItem('username'),
            password: this.decrypted_pass
        }
      }).then(result => {
        this.users.push(result.data)
        this.username = ""
        this.password = ""
      })
    },
    deleteUser: function(id) {
      axios.delete("http://localhost:5000/user/"+ id,{
        headers: {
            username: localStorage.getItem('username'),
            password: this.decrypted_pass
        }
      }).then(result => {
            this.users = this.users.filter(function(item) {
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
