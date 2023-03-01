import GAuth from 'vue3-google-oauth2'

function setGoogleApi(app){
    const gAuthOptions = { clientId: '628101230191-nn5d3qr7f8fljre49p29jthukdrhegtc.apps.googleusercontent.com', scope: 'email profile', prompt: 'consent', fetch_basic_profile: false }
    app.use(GAuth, gAuthOptions)
}



export default setGoogleApi;