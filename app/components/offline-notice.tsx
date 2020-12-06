import React, { FC } from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import { PageHeaderProps } from './ui-page-header'

const { width } = Dimensions.get('window')

export const OfflineNotice: FC<PageHeaderProps> = () => {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 30,
  },
  offlineText: {
    color: '#fff',
  },
})
