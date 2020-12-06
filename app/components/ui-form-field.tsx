import { Input, View, Text } from 'native-base'
import * as React from 'react'
import { UiContactPicker } from './ui-contact-picker'
import { UiFormFieldDatepicker } from './ui-form-field-datepicker'
import { UiFormFieldDropdown } from './ui-form-field-dropdown'
import { UiFormFieldMultiSelect } from './ui-form-field-multiselect'

export interface UiFormFieldProps {
  onBlur?: (val?: any) => void
  onChangeText?: (val?: any) => void
  onChangeDate?: (val?: any) => void
  fieldKey: string
  type: UiFormFieldType
  label: string
  value: string
  options?: any[]
}

export enum UiFormFieldType {
  Contact = 'Contact',
  DateTime = 'DateTime',
  Date = 'Date',
  Dropdown = 'Dropdown',
  Email = 'Email',
  ListBox = 'ListBox',
  Phone = 'Phone',
  TextArea = 'TextArea',
  Text = 'Text',
  WholeNumber = 'WholeNumber',
  YesNo = 'YesNo',
}

const getAutoCapitalize = (type: UiFormFieldType) => (type === 'Email' ? 'none' : 'words')
const getKeyboardType = (type: UiFormFieldType) => {
  switch (type) {
    case UiFormFieldType.DateTime:
      return 'default'
    case UiFormFieldType.Date:
      return 'default'
    case UiFormFieldType.Dropdown:
      return 'default'
    case UiFormFieldType.ListBox:
      return 'default'
    case UiFormFieldType.TextArea:
      return 'default'
    case UiFormFieldType.Text:
      return 'default'
    case UiFormFieldType.Email:
      return 'email-address'
    case UiFormFieldType.Phone:
      return 'phone-pad'
    case UiFormFieldType.WholeNumber:
      return 'number-pad'
    default:
      console.log('Using default keyboard type for', type)
      return 'default'
  }
}

export const UiFormField: React.FunctionComponent<UiFormFieldProps> = ({
  type,
  label,
  fieldKey,
  value,
  onBlur,
  onChangeDate,
  onChangeText,
  options,
}) => {
  switch (type) {
    case UiFormFieldType.Contact:
      return (
        <UiContactPicker
          addEmptyItem={true}
          currentContactId={value}
          saveContact={async (val) => await onChangeText(val)}
        />
      )
    case UiFormFieldType.Date:
    case UiFormFieldType.DateTime:
      return (
        <UiFormFieldDatepicker
          label={label}
          onChangeText={(val) => {
            if (onChangeDate) {
              onChangeDate({ [fieldKey]: val })
            }
            onChangeText(val)
          }}
          value={value}
        />
      )
    case UiFormFieldType.Dropdown:
      return (
        <UiFormFieldDropdown
          label={label}
          value={value}
          items={options?.map((opt) => opt)}
          onChangeText={onChangeText}
        />
      )
    case UiFormFieldType.ListBox:
      return (
        <UiFormFieldMultiSelect
          label={label}
          onChangeText={onChangeText}
          value={value?.split(',')}
          options={options?.map((option) => ({ key: option.id, id: option.id, name: option.label }))}
        />
      )
    case UiFormFieldType.WholeNumber:
      const autoCapitalize = getAutoCapitalize(type)
      const keyboardType = getKeyboardType(type)
      return (
        <Input
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          value={value?.toString()}
          onBlur={(val) => {
            onChangeText(val?.nativeEvent?.text.toString())
          }}
          onChangeText={(val) => {
            onChangeText(val.toString())
          }}
        />
      )
    case UiFormFieldType.YesNo:
      return (
        <View>
          <Text>Yes / No</Text>
        </View>
      )
  }

  const autoCapitalize = fieldKey === '931' ? 'sentences' : getAutoCapitalize(type)
  const keyboardType = getKeyboardType(type)
  return (
    <Input
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
      value={value}
      onBlur={onBlur}
      onChangeText={onChangeText}
    />
  )
}
