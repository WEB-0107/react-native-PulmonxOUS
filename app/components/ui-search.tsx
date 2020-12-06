import * as React from 'react'
import { ViewStyle } from 'react-native'
import { SearchBar } from 'react-native-elements'

interface UiSearchBarProps {
  onChangeText: (value: string) => void
  placeholder: string
  value: string
}

const containerStyle: ViewStyle = {
  backgroundColor: '#F2F2F2',
  borderBottomWidth: 0,
}

const inputStyle: ViewStyle = {
  backgroundColor: '#dee8ee',
}

export const UiSearchBar: React.FunctionComponent<UiSearchBarProps> = ({ onChangeText, placeholder, value }) => (
  <SearchBar
    containerStyle={containerStyle}
    inputStyle={inputStyle}
    inputContainerStyle={inputStyle}
    placeholder={placeholder}
    onChangeText={onChangeText}
    value={value}
    lightTheme
  />
)
