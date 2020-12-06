import { Formik } from 'formik'
import { Form, Input, Item, Label, Picker, Textarea, View } from 'native-base'
import * as React from 'react'
import { useState } from 'react'
import Toast from 'react-native-simple-toast'
import { NavigationInjectedProps } from 'react-navigation'
import * as Yup from 'yup'
import { formItem, LoadingCentered, SaveButton } from '../../components'
import { ErrorCentered } from '../../components/error'
import { pickerStyle } from '../../components/ui-form-field-dropdown'
import { UiFormView } from '../../components/ui-form-view'
import { useCreateNoteMutation, useNoteTemplatesQuery } from '../../sdk'

export interface NoteAddScreenProps extends NavigationInjectedProps<{}> {}

export const NoteCreateScreen: React.FunctionComponent<NoteAddScreenProps> = ({ navigation }) => {
  // @ts-ignore
  const itemId = navigation.getParam('itemId')
  // @ts-ignore
  const returnScreen = navigation.getParam('returnScreen')
  // @ts-ignore
  const refetch = navigation.getParam('refetch')
  const { data, loading } = useNoteTemplatesQuery()
  const [createNote] = useCreateNoteMutation()
  const [model, setModel] = useState<any>({ body: '', title: '', type: 'Other' })
  const [saving, setSaving] = useState(false)

  if (loading) {
    return <LoadingCentered msg="Loading Templates..." />
  }

  if (!data) {
    return <ErrorCentered msg="Error loading" />
  }

  const validationSchema = Yup.object().shape({
    type: Yup.string().demandOption,
    title: Yup.string().min(2).max(50).demandOption,
  })

  const onSave = async (val) => {
    setSaving(true)
    setModel({ ...val })

    try {
      await createNote({
        variables: {
          input: {
            contactId: itemId,
            body: val.body,
            title: val.title,
            type: 'Other',
          },
        },
      })

      // @ts-ignore
      await refetch()

      setSaving(false)
      Toast.show(`Created Note`)

      navigation.navigate(returnScreen)
    } catch (e) {
      console.log(e)
      Toast.show(`Note could not be saved.`)
      setSaving(false)
    }
  }

  const noteTypes = ['Appointment', 'Call', 'Email', 'Fax', 'Letter', 'Other']
  return (
    <UiFormView saving={saving}>
      <Formik
        initialValues={model}
        onSubmit={(val) => onSave(val)}
        validationSchema={validationSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, isValid }) => {
          return (
            <Form>
              <View>
                <Item stackedLabel style={formItem}>
                  <Label>Note Type</Label>
                  <View style={pickerStyle}>
                    <Picker
                      note
                      mode="dropdown"
                      selectedValue={values.type}
                      onValueChange={(val) => setFieldValue('type', val)}
                      placeholder="Select Type"
                      inlineLabel={true}
                    >
                      {noteTypes.map((template) => (
                        <Picker.Item key={template} label={template} value={template} />
                      ))}
                    </Picker>
                  </View>
                </Item>
                <Item stackedLabel style={formItem}>
                  <Label>Note Template</Label>
                  <View style={pickerStyle}>
                    <Picker
                      note
                      mode="dropdown"
                      selectedValue={values.template}
                      onValueChange={(val) => {
                        setFieldValue('template', val)
                        setFieldValue('title', val)
                      }}
                      placeholder="Select Template"
                      inlineLabel={true}
                    >
                      {data.infusionsoftNoteTemplates.map((template) => (
                        <Picker.Item key={template} label={template} value={template} />
                      ))}
                    </Picker>
                  </View>
                </Item>
                <Item stackedLabel style={formItem}>
                  <Label>Title</Label>
                  <Input value={values.title} onBlur={handleBlur('title')} onChangeText={handleChange('title')} />
                </Item>
                <Textarea
                  underline={true}
                  rowSpan={5}
                  bordered={false}
                  onBlur={handleBlur('body')}
                  onChangeText={handleChange('body')}
                  placeholder="Note Body"
                  value={values.body}
                />
                <SaveButton onPress={handleSubmit} disabled={!isValid} />
              </View>
            </Form>
          )
        }}
      </Formik>
    </UiFormView>
  )
}
