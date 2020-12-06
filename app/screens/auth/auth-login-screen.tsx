import { observer } from 'mobx-react-lite'
import { Button, Container, Text, View } from 'native-base'

import * as React from 'react'
import { useState } from 'react'
import { Alert, SafeAreaView, TouchableOpacity, ViewStyle } from 'react-native'
import InAppBrowser from 'react-native-inappbrowser-reborn'
import { NavigationInjectedProps } from 'react-navigation'
import { getCredentials, setCredentials, setToken } from '../../app-auth'
import { AppConfig } from '../../app-config'
// import { rollbar } from '../../app-rollbar'
import { Loading, LoginHeader } from '../../components'
import { useStores } from '../../models/root-store/root-store-context'
import { getDeepLink } from '../../navigation/utilities'
import { KeyboardAvoidingView } from '../3rd-party'
import { pageContainer } from '../shared-styles'

const authorize = async () => {
  const deepLink = getDeepLink('callback')
  console.log('deeplink ==> ', deepLink, AppConfig.authUrl + `?redirect_uri=${deepLink}`)
  try {
    if (await InAppBrowser.isAvailable()) {
        // const url = `${AppConfig.authUrl}?redirect_url=${encodeURIComponent(deepLink)}`;
      return InAppBrowser.openAuth(AppConfig.authUrl, deepLink, {
      // return InAppBrowser.openAuth(url, deepLink, {
        showTitle: false,
        enableUrlBarHiding: true,
        enableDefaultShare: true,
      }).then((response) => {
        console.log('response ===> ', response)
        if (response.type === 'success' && response.url) {
          const token = response.url.split('token=')

          return token.length ? token[1] : false
        }
        return false
      })
    } else {
      // rollbar.error('Error: InAppBrowser is not available')
      Alert.alert(JSON.stringify('Error: InAppBrowser is not available'))
      return false
    }
  } catch (error) {
    console.log(JSON.stringify(error, null, 2))
    // rollbar.error('Error logging in', error)
    Alert.alert(error.message)
    throw new Error(error.message)
  }
}

export interface LoginScreenProps extends NavigationInjectedProps<{}> {}

const pageIcon: ViewStyle = {
  alignItems: 'center',
  height: 100,
}

const pageHeader: ViewStyle = {
  marginTop: 50,
}

const pageFooter: ViewStyle = {
  marginBottom: 50,
}

const pageLayout: ViewStyle = {
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: 100,
  flex: 1,
}

const pageButtons: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
}
const submitButton: ViewStyle = {
  justifyContent: 'center',
  backgroundColor: '#4f2d7f',
  width: '100%',
}
export const AuthLoginScreen: React.FunctionComponent<LoginScreenProps> = observer((props) => {
  const rootStore = useStores()
  const [loading, setLoading] = useState(false)

  const redirectToLoading = () => {
    setTimeout(() => {
      props.navigation.navigate('AuthLoading')
    }, 500)
  }

  const onSignInButtonPress = async () => {
    setLoading(true)
    try {
      let credentials = await getCredentials()
      // Do login
      try {
        const accessToken = await authorize()
        console.log('credentials ==> ', accessToken, credentials)
        if (accessToken) {
          credentials = { accessToken }
          await setCredentials(credentials)
        } else {
          console.log('No credentials')
        }
      } catch (e) {
        console.log('Error logging in', JSON.stringify(e, null, 2))
        Alert.alert(e)
      }

      if (credentials && credentials.accessToken) {
        rootStore.setAccessToken(credentials.accessToken)
        // console.log("credentials", credentials)
        await setToken(credentials.accessToken)
      }

      setLoading(false)
      redirectToLoading()
    } catch (e) {
      // rollbar.error('An error occurred', e)
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView>
      <Container style={pageContainer}>
        <View padder style={pageLayout}>
          <View style={pageHeader}>
            <TouchableOpacity key="headerBtn" onPress={() => redirectToLoading()}>
              <LoginHeader />
            </TouchableOpacity>
            <View style={pageIcon} key="loading">
              <Loading size={100} isVisible={loading} color="#4f2d7f" />
            </View>
          </View>
          <View style={pageFooter}>
            <SafeAreaView>
              <View style={pageButtons}>
                <Button success style={submitButton} onPress={onSignInButtonPress}>
                  <Text>Sign in with Infusionsoft</Text>
                </Button>
              </View>
            </SafeAreaView>
          </View>
        </View>
      </Container>
    </KeyboardAvoidingView>
  )
})
