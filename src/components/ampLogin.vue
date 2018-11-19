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

            <button @click="googleLogin()">Google Login</button>
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
        components
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
            })
        },
        googleLogin() {
            const config = Auth.configure();
            console.log(config)
            if (!config.hasOwnProperty("oath")) {
                console.error("Not set configure.Auth.oath")
                return;
            }
            const { 
                domain,  
                redirectSignIn, 
                redirectSignOut,
                responseType } = config.oauth;

            const clientId = config.userPoolWebClientId;
            // The url of the Cognito Hosted UI
            const url = 'https://' + domain + '/login?redirect_uri=' + redirectSignIn + '&response_type=' + responseType + '&client_id=' + clientId;
            // If you only want to log your users in with Google or Facebook, you can construct the url like:
            const url_to_google = 'https://' + domain + '/oauth2/authorize?redirect_uri=' + redirectSignIn + '&response_type=' + responseType + '&client_id=' + clientId + '&identity_provider=Google';
            const url_to_facebook = 'https://' + domain + '/oauth2/authorize?redirect_uri=' + redirectSignIn + '&response_type=' + responseType + '&client_id=' + clientId + '&identity_provider=Facebook';
            console.log(domain, url_to_google);
            
            //window.location.assign(url);
            window.location.assign(url_to_google);
        },
        uploadBtn() {
            Auth.currentSession().then(info => {
                console.log("Auth:", info);
            }).catch(err => {
                console.error("Auth:", err)
            });
            Storage.configure({
                bucket: 's3test.kashika.io',
                region: 'ap-northeast-1',
                identityPoolId: 'ap-northeast-1:c0e62441-eaa2-4489-a66f-cd27fcbe4dc0'
            });
            Storage.put('test.txt', 'Hello2',{ level: 'private', contentType: 'text/plain'})
                .then (result => console.log(result))
                .catch(err => console.error(err));
        },
        downloadBtn() {
            Storage.configure({ level: 'private' });
            Storage.get('test.txt')
                .then(result => console.log(result))
                .catch(err => console.error(err));
        }
    }

}
</script>

<style>

</style>
