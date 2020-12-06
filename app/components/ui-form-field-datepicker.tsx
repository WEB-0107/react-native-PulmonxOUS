import { Grid, Text, View, Col } from 'native-base'
import * as React from 'react'
import { useState } from 'react'
import { ViewStyle } from 'react-native'
import moment from 'moment-timezone'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

const setToNoon = (date: string): Date => {
  const todayNoon = new Date(date)
  todayNoon.setDate(todayNoon.getDate() + 1)
  return todayNoon
}

export const formatIncomingDate = (date?: string): Date => {
  if (!date?.trim().length) {
    return null
  }
  return setToNoon(date.includes('T') ? date.split('T')[0] : date)
}

export const datePickerStyle: ViewStyle = {
  width: '100%',
}

export const UiFormFieldDatepicker = ({
  label,
  onChangeText,
  value,
}: {
  label: string
  onChangeText: (val: string | Date) => void
  value: string
}) => {
  const [isVisible, setVisibility] = useState(false)
  const [dateValue, setDateValue] = useState<null | Date>(formatIncomingDate(value))

  const onChange = (date) => {
    setDateValue(date)
    if (date) {
      const ESTDate = moment(date).tz('America/New_York').format('YYYY-MM-DD')
      onChangeText(ESTDate)
    }
    setVisibility(false)
  }
  const textLabel = dateValue?.toDateString() || ``
  return (
    <View style={datePickerStyle}>
      <Grid>
        <Col style={{ width: '80%' }}>
          <Text onPress={() => setVisibility(true)} style={{ marginTop: 10, color: dateValue ? '#000' : '#999' }}>
            {textLabel}
          </Text>
        </Col>
        <Col style={{ width: '20%' }}>
          <Text
            onPress={() => {
              onChangeText('')
              setDateValue(null)
            }}
            style={{ padding: 12, backgroundColor: '#ededed', textAlign: 'center' }}
          >
            Clear
          </Text>
        </Col>
      </Grid>

      <DateTimePickerModal
        isVisible={isVisible}
        date={dateValue || new Date()}
        mode="date"
        onConfirm={onChange}
        onCancel={() => setVisibility(false)}
        timeZoneOffsetInMinutes={-7 * 60}
      />
    </View>
  )
}
