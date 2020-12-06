// Welcome to the main entry point of the app.
import { ApolloProvider } from '@apollo/react-hooks'
//
// In this file, we'll be kicking off our app or storybook.
import { Root } from 'native-base'

import { contains } from 'ramda'
import React, { useEffect, useState } from 'react'
import { AppRegistry } from 'react-native'
import { LogBox } from 'react-native'
import { enableScreens } from 'react-native-screens'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'

import Icon from 'react-native-vector-icons/Ionicons'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import { rollbar } from './app-rollbar'
import { LoadingCentered } from './components'
import { apolloClient } from './graphql-client'

import './i18n'
import { RootStore } from './models/root-store/root-store'
import { RootStoreProvider } from './models/root-store/root-store-context'
import { setupRootStore } from './models/root-store/setup-root-store'
import { BackButtonHandler, StatefulNavigator } from './navigation'

Icon.loadFont().catch((e) => console.log(e))
IconFontAwesome.loadFont().catch((e) => console.log(e))
IconMaterialIcons.loadFont().catch((e) => console.log(e))

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
enableScreens()

/**
 * Ignore some yellowBox warnings. Some of these are for deprecated functions
 * that we haven't gotten around to replacing yet.
 */
LogBox.ignoreLogs([
  'componentWillMount is deprecated',
  'componentWillReceiveProps is deprecated',
  'VirtualizedLists should never be nested',
  'Animated: `useNativeDriver` was not specified.',
  'currentlyFocusedField is deprecated and will be removed in a future release. Use currentlyFocusedInput',
  // TODO: We need to figure out which warnings we should ignore and which to address
  // "DatePickerIOS",
  // "Unable to find module",
])

/**
 * Are we allowed to exit the app?  This is called when the back button
 * is pressed on android.
 *
 * @param routeName The currently active route name.
 */
const canExit = (routeName: string) => contains(routeName, ['Home'])

/**
 * This is the root component of our app.
 */
export const App: React.FunctionComponent = () => {
  const [client, setClient] = useState(null)
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined) // prettier-ignore
  useEffect(() => {
    setupRootStore().then(setRootStore)
  }, [])

  useEffect(() => setClient(apolloClient()), [rootStore])
  useEffect(() => {
    if (rootStore?.currentUser) {
      // const { id, name, email } = rootStore?.currentUser
      // rollbar.setPerson(id, name, email)
      // rollbar.info('App found a user in the RootStore')
    }
  }, [rootStore])

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  //
  // This step should be completely covered over by the splash screen though.
  //
  // You're welcome to swap in your own component to render if your boot up
  // sequence is too slow though.
  if (!rootStore) {
    return null
  }

  if (!client) {
    return <LoadingCentered />
  }

  // otherwise, we're ready to render the app
  return (
    <RootStoreProvider value={rootStore}>
      <ApolloProvider client={client}>
        <BackButtonHandler canExit={canExit}>
          <Root>
            <StatefulNavigator />
          </Root>
        </BackButtonHandler>
      </ApolloProvider>
    </RootStoreProvider>
  )
}

/**
 * This needs to match what's found in your app_delegate.m and MainActivity.java.
 */
const APP_NAME = 'PulmonxOUS'

AppRegistry.registerComponent(APP_NAME, () => App)

export const pretty = (obj: any) => (typeof obj === 'string' ? obj : JSON.stringify(obj, null, 2))
// export const prettyLog = (obj: any) => console.log(pretty(obj))
