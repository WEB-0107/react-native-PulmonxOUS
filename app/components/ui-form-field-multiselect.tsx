import { Text, View } from 'native-base'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { Modal, Alert, Button } from 'react-native'
import MultiSelect from 'react-native-multiple-select'

export const UiFormFieldMultiSelect = ({
  label,
  options,
  onChangeText,
  value,
}: {
  label: string
  onChangeText: (val: string | Date) => void
  value: string[]
  options: { key: string; id: string; name: string }[]
}) => {
  const [isVisible, setVisibility] = useState(false)
  const [selected, setSelected] = useState([])

  useEffect(() => {
    setSelected(value)
  }, [])

  const cleanCSV = (value) => {
    const arrFiltered = value.filter((el) => {
      return el != null && el != ''
    })
    return arrFiltered
  }

  const onSelectedItemsChange = (selectedItems: { id: string; name: string }[]) => {
    setSelected(cleanCSV(selectedItems))
  }

  const onChange = () => {
    onChangeText(selected.join(','))
    setVisibility(false)
  }

  const itemList = value?.map((item) => (
    <Text key={item} onPress={() => setVisibility(true)}>
      {item}
    </Text>
  ))
  return (
    <View style={{ width: '100%', marginTop: 10, marginBottom: 10 }}>
      {itemList}
      <Modal
        animationType="slide"
        transparent={false}
        visible={isVisible}
        presentationStyle="formSheet"
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
        }}
      >
        <View style={{ padding: 20, flex: 1 }}>
          <MultiSelect
          hideTags
            items={options ? options : null}
            uniqueKey="id"
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selected?.every((el) => el === '') ? [] : selected}
            selectText="Pick Items"
            searchInputPlaceholderText="Search Items..."
            displayKey="name"
            hideSubmitButton={true}
          />
          <View style={{ marginTop: 30 }}>
            <Button title="Click to Finish" onPress={() => onChange()} />
          </View>
        </View>
      </Modal>
    </View>
  )
}
