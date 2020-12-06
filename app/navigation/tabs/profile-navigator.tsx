import { createStackNavigator } from 'react-navigation-stack'
import { AuthUserScreen } from '../../screens/auth/auth-user-screen'

export const ProfileNavigator = createStackNavigator(
  {
    Profile: {
      screen: AuthUserScreen,
      navigationOptions: {
        headerTitle: 'My Profile',
      },
    },
  },
  {
    headerMode: 'screen',
  },
)
