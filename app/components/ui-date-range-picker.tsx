import { Col, Grid } from 'native-base'
import * as React from 'react'
import { FC, useState } from 'react'
import { Modal, Text, TextStyle, TouchableOpacity, View } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import Calendar from 'rn-lightweight-date-picker'
import { uiModalStyles } from './ui-modal-styles'

export interface UiDateRangePickerProps {
  label: string
  currentDateRange: DateRange
  saveDateRange: (date: DateRange) => void
}

const textStyle: TextStyle = {
  fontSize: 16.5,
  fontFamily: 'System',
  paddingLeft: 16,
  paddingRight: 16,
  marginBottom: 10,
  marginTop: 10,
}

export interface DateRange {
  start: string | false
  end: string | false
}

export const UiDateRangePicker: FC<UiDateRangePickerProps> = (props) => {
  const [isVisible, setVisibility] = useState(false)
  const [dateRangeValue, setDateRangeValue] = useState<DateRange>(
    props.currentDateRange ? props.currentDateRange : null,
  )

  const formatDateRange = (range: DateRange) => `${range.start} - ${range.end}`

  const label = dateRangeValue ? formatDateRange(dateRangeValue) : `Filter by ${props.label}`

  const showModal = () => setVisibility(true)
  const hideModal = () => {
    setVisibility(false)
    props.saveDateRange(dateRangeValue)
  }

  const clearFilters = () => {
    setDateRangeValue(null)
    props.saveDateRange(null)
    hideModal()
  }
  const onSelectedItemsChange = (range: DateRange) => {
    setDateRangeValue(range)
  }

  return (
    <View style={{ width: '100%' }}>
      <TouchableOpacity onPress={showModal}>
        <Text style={textStyle}>{label}</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={uiModalStyles.centeredView}>
          <View style={uiModalStyles.modalView}>
            <View style={{ width: '70%' }}>
              <Calendar
                format="yyyy-mm-dd"
                showControls={true}
                userColors={{ title: '#4f2d7f' }}
                onDateChange={onSelectedItemsChange}
              />
            </View>
            <Grid>
              <Col>
                <TouchableHighlight
                  style={{ ...uiModalStyles.openButton, backgroundColor: '#4f2d7f', margin: 15 }}
                  onPress={() => hideModal()}
                >
                  <Text style={{ ...uiModalStyles.textStyle, color: 'white' }}>Select</Text>
                </TouchableHighlight>
              </Col>
              <Col>
                <TouchableHighlight
                  style={{ ...uiModalStyles.openButton, backgroundColor: '#4f2d7f', margin: 15 }}
                  onPress={() => clearFilters()}
                >
                  <Text style={{ ...uiModalStyles.textStyle, color: 'white' }}>Clear</Text>
                </TouchableHighlight>
              </Col>
            </Grid>
          </View>
        </View>
      </Modal>
    </View>
  )
}
