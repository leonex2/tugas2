<template>
    <div>
        <p>Status : {{ status }}</p>
        <div class="form-control">
            <label for="username">Username </label>
            <input type="text" v-model="username">
        </div>
        <div class="form-control">
            <label for="password">Password </label>
            <input type="password" v-model="password">
        </div>

        <div class="buttons">
            <button @click="save">Save</button>
            <button @click="clear">Clear</button>
        </div>
        
    </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {

    data: function() {
        return {
            username: '',
            password: '',
            status: ''
        }
    },
    mounted: function() {
        const username = localStorage.getItem('username')
        const password = localStorage.getItem('password') ? CryptoJS.AES.decrypt(localStorage.getItem('password'), "secret").toString(CryptoJS.enc.Utf8) : ''

        this.password = password
        this.username = username

        if(username && password) {
            if(username != "" && password != "") {
                this.status = "Auth Data Saved!"
            }else {
                this.status = "No Auth Creden Saved"
            }
        }else {
            this.status = "No Auth Creden Saved"
        }
    },
    methods: {
        save: function() {
            localStorage.setItem('username', this.username)
            localStorage.setItem('password', CryptoJS.AES.encrypt(this.password, "secret").toString())
            this.status = "Auth Data Saved!"
        },
        clear: function() {
            localStorage.removeItem('username')
            localStorage.removeItem('password')
            this.status = "No Auth Creden Saved"

            this.username = ''
            this.password = ''
        }
    }
}
</script>

<style>
.form-control {
    display: flex;
    width: 200px;
    flex-direction: column;
}
.buttons {
    margin-top: 20px;
}
</style>