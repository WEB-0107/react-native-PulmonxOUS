import React, { FunctionComponent, useState } from 'react'
import Toast from 'react-native-simple-toast'
import { NavigationInjectedProps } from 'react-navigation'
import { LoadingCentered, UiForm } from '../../components'
import { ErrorCentered } from '../../components/error'
import { UiFormView } from '../../components/ui-form-view'
import {
  InfusionsoftCustomFieldGroup,
  useCompaniesQuery,
  useContactFieldsQuery,
  useCreateContactMutation,
} from '../../sdk'

export interface ContactCreateScreenProps extends NavigationInjectedProps<{}> {}

export const ContactCreateScreen: FunctionComponent<ContactCreateScreenProps> = ({ navigation }) => {
  // @ts-ignore
  const refetch = navigation.getParam('refetch')
  const [createContact] = useCreateContactMutation()
  const { data, error, loading } = useContactFieldsQuery()
  const { data: dataCompanies, error: errorCompanies, loading: loadingCompanies } = useCompaniesQuery()

  const [saving, setSaving] = useState(false)
  const fieldGroupItem: InfusionsoftCustomFieldGroup[] = []

  if (!refetch) {
    navigation.goBack()
    return <ErrorCentered msg={'No save handler found'} />
  }

  if (loading || loadingCompanies) {
    return <LoadingCentered msg="Loading..." />
  }

  if (error || errorCompanies) {
    return <ErrorCentered msg={`An error occurred`} report={error} />
  }

  if (data && data.fields && data.fields.default) {
    fieldGroupItem.push({
      label: 'Contact Information',
      fields: data.fields.default.map((f) => {
        if (f.key === 'companyId') {
          return {
            ...f,
            options: [...dataCompanies?.companies?.map((c) => ({ id: c.id, label: c.name }))],
          }
        }
        return f
      }),
    })
  }

  const onSave = async (val) => {
    setSaving(true)
    try {
      const { data, errors } = await createContact({
        variables: {
          input: {
            ...val,
          },
        },
      })
      if (data) {
        // @ts-ignore
        await refetch()
        setSaving(false)
        navigation.navigate('ContactDetails', { contactId: data?.contact?.id })
        return Promise.resolve()
      }
      if (errors) {
        Toast.show(`Error saving contact`)
        setSaving(false)
        return <ErrorCentered msg="Error saving data" report={errors} />
      }
    } catch (e) {
      return <ErrorCentered msg="Error saving data" report={e} />
    }
  }

  return (
    <UiFormView saving={saving}>
      <UiForm groups={fieldGroupItem} model={{}} onSave={onSave} />
    </UiFormView>
  )
}
