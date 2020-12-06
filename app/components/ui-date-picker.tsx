import * as React from 'react'
import { useState, FC } from 'react'
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { formatIncomingDate } from './ui-form-field-datepicker'

export interface UiDatePickerProps {
  label: string
  currentDate: string
  saveDate: (date: string, reason?: string) => void
}

const textStyle: TextStyle = {
  fontSize: 16.5,
  fontFamily: 'System',
  paddingLeft: 16,
  paddingRight: 16,
}
const viewStyle: ViewStyle = {
  paddingBottom: 6,
  paddingTop: 6,
  height: 45,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}

export const UiDatePicker: FC<UiDatePickerProps> = (props) => {
  const [isVisible, setVisibility] = useState(false)
  const [dateValue, setDateValue] = useState<null | Date>(formatIncomingDate(props.currentDate))
  const onChange = (date) => {
    setDateValue(date)
    props.saveDate(date ? date.toISOString() : null)
    setVisibility(false)
  }

  const label = dateValue ? dateValue.toDateString() : `Filter by ${props.label}`

  return (
    <View style={viewStyle}>
      <TouchableOpacity onPress={() => setVisibility(true)}>
        <Text style={textStyle}>{label}</Text>
      </TouchableOpacity>
      {dateValue ? (
        <TouchableOpacity onPress={() => onChange(null)}>
          <Text style={textStyle}>Clear</Text>
        </TouchableOpacity>
      ) : null}
      <DateTimePickerModal
        isVisible={isVisible}
        date={dateValue || new Date()}
        mode="date"
        onConfirm={onChange}
        onCancel={() => setVisibility(false)}
      />
    </View>
  )
}
