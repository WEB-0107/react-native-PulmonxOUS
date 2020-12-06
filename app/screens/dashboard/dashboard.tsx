import React from 'react'
import { Text } from 'native-base'
import { Image, ImageStyle, SafeAreaView, TouchableOpacity, ViewStyle } from 'react-native'
import { AppConfig } from '../../app-config'
const headerLogo = require('../../assets/Logo-RGB.png')

const headerStyle: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom: 0,
  paddingTop: 20,
}

const imageStyle: ImageStyle = {
  height: 75,
  width: 75,
}

export const Dashboard = ({ navigation }) => {
  return (
    <SafeAreaView style={headerStyle}>
      <Image source={headerLogo} style={{ width: 250, resizeMode: 'contain' }} />
      <TouchableOpacity onPress={() => navigation.navigate('Opportunities')} style={headerStyle}>
        <Image source={AppConfig.imageMapping['Opportunities']} style={imageStyle} />
        <Text>Cases</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Companies')} style={headerStyle}>
        <Image source={AppConfig.imageMapping['Companies']} style={imageStyle} />
        <Text>Accounts</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Contacts')} style={headerStyle}>
        <Image source={AppConfig.imageMapping['Contacts']} style={imageStyle} />
        <Text>Contacts</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={headerStyle}>
        <Image source={AppConfig.imageMapping['Profile']} style={imageStyle} />
        <Text>Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
