# Getting Started

>**Note**: Make sure you have completed the [Expo - Environment Setup](https://docs.expo.dev/get-started/set-up-your-environment/)

## Step 1: Start your Application

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: launch on virtual device or physical device

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from your andorid or iOS device respectively.

# Third party libraries used
- @tanstack/react-query => this is used for efficiently quering the remote endpoint with caching and refetch capabilities and progess info on the request like loading and error status.
- aws-amplify => to connect to graphQL endpoint.
- react-native-safe-area-context => for dynamically identifying the safe area to display components under, has full support for iOS and Android.
- react-native-ui-lib => ui library of choice
- @react-navigation/native and @react-navigation/native-stack => navigation library of choice
- @react-native-async-storage/async-storage => dependency of aws-amplify
- @react-native-community/netinfo => dependency of aws-amplify

