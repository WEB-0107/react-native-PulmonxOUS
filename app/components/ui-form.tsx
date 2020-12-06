import { Formik } from 'formik'
import { Form, Item, Label, Text, View } from 'native-base'
import * as React from 'react'
import { TextStyle, ViewStyle } from 'react-native'
import { InfusionsoftCustomFieldGroup } from '../sdk'
import { SaveButton } from './save-button'
import { UiFormField, UiFormFieldType } from './ui-form-field'

export const formItem: ViewStyle = {
  paddingLeft: 10,
  paddingRight: 10,
}
const pageSection: ViewStyle = {
  padding: 20,
  backgroundColor: '#dedede',
  marginBottom: 20,
}
const pageSectionTitle: TextStyle = {
  fontVariant: [],
}

export interface UiFormProps {
  onSave?: (val?: any) => void
  onChangeDate?: (val?: any) => void
  saving?: boolean
  model: any
  hideButton?: boolean
  groups: InfusionsoftCustomFieldGroup[]
}

export const UiForm: React.FunctionComponent<UiFormProps> = ({
  groups,
  model = {},
  hideButton,
  onChangeDate,
  onSave = (val) => console.log('val', val),
  saving,
}) => {
  return (
    <View>
      <Formik initialValues={model} onSubmit={(val) => onSave(val)}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <Form>
            <View>
              {groups
                ? groups.map((group, idx) => {
                    return (
                      <View key={idx}>
                        {group?.label ? (
                          <View style={pageSection} key={group.label}>
                            <Text style={pageSectionTitle}>{group.label}</Text>
                          </View>
                        ) : null}
                        {group.fields.map((field, idx) => {
                          const key = field.key || field.id.toString() || idx.toString()
                          return (
                            <Item stackedLabel key={idx} style={formItem} picker={field.label === 'State'}>
                              <Label>{field.label}</Label>
                              <UiFormField
                                type={field.type as UiFormFieldType}
                                value={values[key]}
                                fieldKey={key}
                                label={field.label}
                                options={field.options}
                                onBlur={handleBlur(key)}
                                onChangeDate={onChangeDate}
                                onChangeText={handleChange(key)}
                              />
                            </Item>
                          )
                        })}
                      </View>
                    )
                  })
                : null}
              {hideButton ? null : <SaveButton onPress={handleSubmit} disabled={saving} />}
            </View>
          </Form>
        )}
      </Formik>
    </View>
  )
}
