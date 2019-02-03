# Trivia APP
A trivia app containing a React web client and a React Native mobile client.

**Commands assume you're in the root directory**

# Installing dependencies

Install graphQL dependencies
```
cd gql-server && yarn
```

Install client dependencies
```
cd client && yarn
```

# Starting the app
Start the graphQL server
```
cd gql-server && yarn start
```

Start the web client
```
cd client/web && yarn start
```

Start the RN client
```
cd client/native && yarn start
```
*Android requires running `yarn android` instead

# Tests

gql tests
```
cd gql-server
yarn test
```

client tests
```
cd client
yarn workspaces run test
```
*you can also run `yarn test` in respective client workspace to run tests specific to a workspace