import * as React from 'react'
import { Picker, View} from 'native-base'
import { ViewStyle } from 'react-native'

export const pickerStyle: ViewStyle = {
  width: '100%',
  marginLeft: -20,
}

export const UiFormFieldDropdown = ({
  label,
  items = [],
  onChangeText,
  value,
}: {
  items: any[]
  label: string
  onChangeText: (val: string) => void
  value: string
}) => {
  const placeholder = `Choose a ${label}`
  return (
    <View style={pickerStyle} >
      <Picker
        inlineLabel={true}
        mode="dialog"
        iosHeader={placeholder}
        placeholder={placeholder}
        selectedValue={value}
        onValueChange={(stage) => onChangeText(stage)}
      >
        {items.map((item) => (
          <Picker.Item label={item.label} value={item.id} key={item.id} />
        ))}
      </Picker>
    </View >
  )
}
