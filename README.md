# MIS tool

A tool to **MAKE MARKETING GREAT AGAIN!** And by the way MIS stands for Marketing International Sync.

## Getting Started

Setup a database. You can use a service such as mlab.com or mongodb.com. Both offer free databases for development. Mongodb.com has an easy to follow wizard for getting set up. Add the url to the .env file.

To start developing run:

```
npm i
npm run watch
```

## Setting up authentication with Google

For the authentication to work you will have to setup OAuth 2.0 with Google. You need access to Google Cloud and it has to have a domain setup. Steps:

1. Create a new project.
2. Add credentials:

- Choose `Internal` project
- Add the origin uri to Authorized JavaScript origins e.g. `http://localhost:3000`, `https://mysuperapp.com`
- Add the Authorized redirect URIs. Make sure it has the path `/auth/callback`. e.g. `http://localhost:3000/auth/callback`, `https://mysuperapp.com/auth/callback`

3. You will get a client id and a secret.

Add the ID, secret to the .env file. Add the allowed domain in the env file also. This is original domain name of the Google account.

Note! To start the app with authentication, remember to set in the .env file GOOGLE_AUTH_ENABLED to true.
