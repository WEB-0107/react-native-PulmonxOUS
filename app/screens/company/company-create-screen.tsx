import React, { FunctionComponent, useState } from 'react'
import Toast from 'react-native-simple-toast'
import { NavigationInjectedProps } from 'react-navigation'
import { LoadingCentered, UiForm } from '../../components'
import { ErrorCentered } from '../../components/error'
import { UiFormView } from '../../components/ui-form-view'
import { InfusionsoftCustomFieldGroup, useCompanyFieldsQuery, useCreateCompanyMutation } from '../../sdk'

export interface CompanyCreateScreenProps extends NavigationInjectedProps<{}> {}

export const CompanyCreateScreen: FunctionComponent<CompanyCreateScreenProps> = ({ navigation }) => {
  // @ts-ignore
  const refetch = navigation.getParam('refetch')
  const [createCompany] = useCreateCompanyMutation()
  const { data, error, loading } = useCompanyFieldsQuery()

  const [saving, setSaving] = useState(false)
  const fieldGroupItem: InfusionsoftCustomFieldGroup[] = []

  if (!refetch) {
    navigation.goBack()
    return <ErrorCentered msg={'No save handler found'} />
  }

  if (loading) {
    return <LoadingCentered msg="Loading..." />
  }

  if (error) {
    return <ErrorCentered msg={`An error occurred`} report={error} />
  }

  if (data && data.fields && data.fields.default) {
    fieldGroupItem.push({ label: 'Account Information', fields: data.fields.default })
  }

  const onSave = async (input) => {
    setSaving(true)
    try {
      const { data, errors } = await createCompany({
        variables: {
          input: {
            name: input.name,
            phone: input.phone,
            line1: input.line1,
            line2: input.line2,
            zipCode: input.zipCode,
            countryCode: input.countryCode,
          },
        },
      })
      if (data) {
        // @ts-ignore
        await refetch()
        setSaving(false)
        navigation.navigate('CompanyDetails', { companyId: data?.company?.id })
        return Promise.resolve()
      }
      if (errors) {
        Toast.show(`Error saving account`)
        setSaving(false)
        console.log(errors)
      }
    } catch (e) {
      Toast.show(`Error saving account`)
      setSaving(false)
      console.log(e)
    }
  }
  return (
    <UiFormView saving={saving}>
      <UiForm groups={fieldGroupItem} model={{}} onSave={onSave} />
    </UiFormView>
  )
}
