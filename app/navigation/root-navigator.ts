import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { AuthLoadingScreen } from '../screens/auth/auth-loading-screen'
import { AuthLoginScreen } from '../screens/auth/auth-login-screen'
import { AppNavigator } from './app-navigator'
import { Dashboard } from '../screens/dashboard/dashboard'

const AuthStack = createStackNavigator(
  {
    Login: AuthLoginScreen,
  },
  {
    defaultNavigationOptions: { headerShown: false },
  },
)

const DashboardStack = createStackNavigator(
  {
    Dashboard: Dashboard,
  },
  {
    defaultNavigationOptions: { headerShown: false },
  },
)
export const RootNavigator = createAppContainer(
  createSwitchNavigator(
    {
      App: AppNavigator,
      Dashboard: DashboardStack,
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
)
