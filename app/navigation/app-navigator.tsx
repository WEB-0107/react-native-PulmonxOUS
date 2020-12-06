import React from 'react'
import { Image, ImageStyle } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { AppConfig } from '../app-config'
import { CompaniesNavigator } from './tabs/companies-navigator'
import { ContactsNavigator } from './tabs/contacts-navigator'
import { OpportunitiesNavigator } from './tabs/opportunities-navigator'
import { ProfileNavigator } from './tabs/profile-navigator'

const imageStyle: ImageStyle = {
  height: 25,
  width: 25,
}

export const AppNavigator = createBottomTabNavigator(
  {
    Opportunities: {
      screen: OpportunitiesNavigator,
      navigationOptions: {
        tabBarLabel: AppConfig.tabMapping.Opportunities,
      },
    },
    Companies: {
      screen: CompaniesNavigator,
      navigationOptions: {
        tabBarLabel: AppConfig.tabMapping.Companies,
      },
    },
    Contacts: {
      screen: ContactsNavigator,
      navigationOptions: {
        tabBarLabel: AppConfig.tabMapping.Contacts,
      },
    },
    Profile: {
      screen: ProfileNavigator,
      navigationOptions: {
        tabBarLabel: AppConfig.tabMapping.Profile,
      },
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      // TODO: onSave used to get passed here?
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state

        if (AppConfig.iconMapping[routeName]) {
          return <Ionicons name={AppConfig.iconMapping[routeName]} size={25} color={tintColor} />
        }

        if (AppConfig.imageMapping[routeName]) {
          return <Image source={AppConfig.imageMapping[routeName]} style={imageStyle} />
        }

        return <Ionicons name={'unknown'} size={25} color={tintColor} />
      },
    }),
  },
)
