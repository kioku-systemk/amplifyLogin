<template>
    <div>
        <p>AWSAmplify</p>
        <div v-if="this.user==null">
            <amplify-authenticator></amplify-authenticator>
        </div>
        <div v-if="this.user!=null">
            <p>User: {{user.username}}</p>
            <button @click="singout()">Logout</button>


            <button @click="uploadBtn()">Upload</button>
            <button @click="downloadBtn()">Download</button>
        </div>

        <!--<amplify-sign-up v-bind:signUpConfig="signUpConfig"></amplify-sign-up>-->
        <!--amplify-photo-picker></amplify-photo-picker>-->
<!--<amplify-s3-album path="uploads"></amplify-s3-album>-->



    </div>
</template>

<script>

import { components } from 'aws-amplify-vue'
import { AmplifyEventBus } from 'aws-amplify-vue';
import { Auth, Storage } from 'aws-amplify';

export default {
    name: "ampLogin",
    components: {
        ...components
    },
    data () {
        return {
            user: null
        }
    },
    beforeMount() {
        AmplifyEventBus.$on('authData', data => {
            console.log(data);
        });
        AmplifyEventBus.$on('authState', info => {
            Auth.currentAuthenticatedUser().then(user => {
                console.log(user);
                this.user = user;
            });
            console.log(`Here is the auth event that was just emitted by an Amplify component: ${info}`)
        });
    },
    mounted() 
    {
        Auth.currentAuthenticatedUser().then(user => {
            console.log(user);
            this.user = user;
            Auth.currentCredentials().then( (credentials) => {
                console.log("credentials", credentials)
            }).catch(err => console.error(err));
            
        });
    },
    
    methods: {
        singout() {
            Auth.signOut().then(()=>{
               this.user = null 
            });
        },
        uploadBtn() {
            
            Storage.put('test.txt', 'Hello2',{ level: 'public', contentType: 'text/plain'})
                .then (result => console.log(result))
                .catch(err => console.error(err));
        },
        downloadBtn() {
            Storage.configure({ level: 'public' });
            Storage.get('test.txt')
                .then(result => console.log(result))
                .catch(err => console.error(err));
        }
    }

}
</script>

<style>

</style>
