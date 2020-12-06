import { observer } from 'mobx-react-lite'
import { Container } from 'native-base'
import React from 'react'
import { ViewStyle } from 'react-native'
import { NavigationInjectedProps } from 'react-navigation'
// import { rollbar } from '../../app-rollbar'
import { LoadingCentered } from '../../components'
import { useStores } from '../../models/root-store/root-store-context'
import { useInfusionsoftUserQuery } from '../../sdk'
import { pageContainer } from '../shared-styles'

export interface MainScreenProps extends NavigationInjectedProps<{}> {}

const main: ViewStyle = {
  ...pageContainer,
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'center',
  height: 100,
}
export const AuthLoadingScreen: React.FunctionComponent<MainScreenProps> = observer((props) => {
  const rootStore = useStores()
  const { data, loading, error } = useInfusionsoftUserQuery()

  const redirect = () => {
    // rollbar.debug(`redirect: loggedIn ${rootStore.loggedIn}`, rootStore.currentUser)
    props.navigation.navigate(rootStore.loggedIn ? 'Dashboard' : 'Login')
    // props.navigation.navigate('Dashboard')
  }

  if (data && data.infusionsoftUser) {
    const { id, username, name, avatar } = data.infusionsoftUser
    if (!rootStore.loggedIn) {
      console.log('User is not logged in...', rootStore.accessToken)
      rootStore.loginUser({ id, email: username, name, avatar })
      redirect()
    } else {
      console.log('User is logged in to', data.infusionsoftUser.username)
      redirect()
    }
  }

  if (error) {
    console.log('You are not logged in')
    console.log(error)

    setTimeout(() => redirect(), 0)
    return <LoadingCentered msg="Loading..." />
  }

  if (loading) {
    return <LoadingCentered msg="Loading..." />
  }

  return <Container style={main}>{error ? <LoadingCentered /> : <LoadingCentered />}</Container>
})
