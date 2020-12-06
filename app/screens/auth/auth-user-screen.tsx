import { observer } from 'mobx-react-lite'
import { Button, Container, Text, View } from 'native-base'
import * as React from 'react'
import { useState } from 'react'
import { TextStyle, ViewStyle } from 'react-native'
import { Avatar } from 'react-native-elements'
import { NavigationInjectedProps } from 'react-navigation'
import { clearCredentials, removeToken } from '../../app-auth'
// import { rollbar } from '../../app-rollbar'
import { LoadingCentered, primaryButtonStyle } from '../../components'
import { useStores } from '../../models/root-store/root-store-context'
import { useClearCacheMutation, useCompaniesQuery, useContactsQuery, useOpportunitiesQuery } from '../../sdk'

import Toast from 'react-native-simple-toast'

export interface AuthUserScreenProps extends NavigationInjectedProps<{}> {}
const userName: TextStyle = {
  fontSize: 20,
  margin: 5,
}
const userEmail: TextStyle = {
  fontSize: 16,
  color: '#555',
  margin: 5,
}
const fullHeight: ViewStyle = {
  height: 100,
}
const userAvatar: ViewStyle = {
  marginRight: 10,
}
const userDetails: ViewStyle = {
  flexDirection: 'row',
  flex: 1,
  padding: 20,
}
const pageButton: ViewStyle = {
  padding: 10,
  alignContent: 'center',
}
const main: ViewStyle = {
  flex: 1,
  justifyContent: 'space-between',
  height: 100,
}

export const AuthUserScreen: React.FunctionComponent<AuthUserScreenProps> = observer((props) => {
  const [loading, setLoading] = useState(false)
  const [resetInfusionsoftCache] = useClearCacheMutation()
  const { refetch: contactRefetch } = useContactsQuery()
  const { refetch: accountRefetch } = useCompaniesQuery()
  const { refetch: caseRefetch } = useOpportunitiesQuery()
  const rootStore = useStores()
  const user = rootStore.currentUser

  const logout = async () => {
    setLoading(true)
    await removeToken()
    await clearCredentials()
    await rootStore.logoutUser()
    // rollbar.clearPerson()
    props.navigation.navigate('Login')
  }

  const resetCache = async () => {
    await resetInfusionsoftCache()
    await contactRefetch()
    await accountRefetch()
    await caseRefetch()
    Toast.show(`Cache Cleared`)
  }

  if (loading) {
    return <LoadingCentered msg="Loading..." />
  }

  return (
    <Container style={fullHeight}>
      <View style={main}>
        {user ? (
          <View style={userDetails}>
            {user.avatar ? (
              <Avatar
                size="large"
                rounded
                source={{ uri: user.avatar }}
                activeOpacity={0.7}
                containerStyle={userAvatar}
              />
            ) : (
              <View />
            )}
            <View>
              <Text style={userName}>{user.name}</Text>
              <Text style={userEmail}>{user.email}</Text>
            </View>
          </View>
        ) : null}
        <View style={{ padding: 10 }}>
          <Button onPress={() => resetCache()} style={primaryButtonStyle}>
            <Text style={{ flex: 1, textAlign: 'center' }}>Reload All Data</Text>
          </Button>
        </View>
        <View style={{ padding: 10 }}>
          <Button onPress={() => props.navigation.navigate('Dashboard')} style={primaryButtonStyle}>
            <Text style={{ flex: 1, textAlign: 'center' }}>Back to Dashboard</Text>
          </Button>
        </View>
        <View style={pageButton}>
          <Button onPress={() => logout()} style={primaryButtonStyle}>
            <Text style={{ flex: 1, textAlign: 'center' }}>Log out</Text>
          </Button>
        </View>
      </View>
    </Container>
  )
})
