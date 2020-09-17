# Express To-do List

## Project setup
```
nodemon app
```

### Customize configuration

Create a keys.js file in the config folder and add the following with your credentials

```
module.exports = {
  google: {
    clientID: <your google client ID>,
    clientSecret: "<your google client key>"
  },
  mongodb: {
    dbURI: "<link to your MongoDB database>"
  },
  session: {
    cookieKey: "<your cookie key for auth>"
  }
};
```