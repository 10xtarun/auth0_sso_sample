const express = require('express')
const { auth, requiresAuth } = require('express-openid-connect');

const app = express();

app.use(auth({
    authRequired: false,
    auth0Logout: true,
    secret: 'uI_5CmP3rzCol1znv3GpdOLhygzHUyAFYvaUZS3X7of2sFk9kYkflqPFi0FZougu',
    baseURL: 'http://localhost:3000',
    clientID: 'iYshkeg3cYyUzSIdr68wEDfGThk38BQH',
    issuerBaseURL: 'https://dev-pro-app.us.auth0.com'
}))

app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged In' : 'Logged out');
})

app.get('/home', (req, res) => {
    res.send("You just logged out.")
})

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
})

app.listen(3000, (err) => {
    if (err) console.log('Server not initialized, ' + err);
    console.log('Server running on port 3000.')
})