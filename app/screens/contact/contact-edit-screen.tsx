import { cloneDeep } from 'lodash'
import { Text } from 'native-base'
import * as React from 'react'
import { useState } from 'react'
import { NavigationInjectedProps } from 'react-navigation'
import { LoadingCentered, UiForm } from '../../components'
import { UiFormView } from '../../components/ui-form-view'
import {
  InfusionsoftCustomFieldGroup,
  useCompaniesQuery,
  useContactFieldsQuery,
  useContactQuery,
  useUpdateContactMutation,
} from '../../sdk'
import { saveHandler } from '../../components/save-handler'

export interface ContactEditScreenProps extends NavigationInjectedProps<{}> {}

export const ContactEditScreen: React.FunctionComponent<ContactEditScreenProps> = ({ navigation }) => {
  // @ts-ignore
  const contactId = navigation.getParam('contactId')
  // @ts-ignore
  const listFetch = navigation.getParam('refetch')
  const [saving, setSaving] = useState(false)
  const [updateContact] = useUpdateContactMutation()
  const { data, loading } = useContactFieldsQuery()
  const { data: dataCompanies, error: errorCompanies, loading: loadingCompanies } = useCompaniesQuery()
  const refetchVars = {
    variables: { id: contactId },
  }
  const { data: dataContact, error, loading: loadingContact, refetch } = useContactQuery(refetchVars)

  if (loading || loadingContact || loadingCompanies) {
    return <LoadingCentered msg="Loading..." />
  }

  if (!contactId || error || errorCompanies || !dataContact.contact) {
    navigation.navigate('ContactList')
    return <Text>Error loading contact</Text>
  }

  const { contact } = dataContact
  const fieldGroupItem: InfusionsoftCustomFieldGroup[] = []

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
    console.log('##########', val)
    setSaving(true)
    try {
      const { data, errors } = await updateContact({
        variables: {
          id: contactId,
          input: {
            firstName: val.firstName,
            lastName: val.lastName,
            email: val.email,
            phone: val.phone,
            line1: val.line1,
            line2: val.line2,
            region: val.region,
            locality: val.locality,
            zipCode: val.zipCode,
            countryCode: val.countryCode,
            companyId: val.companyId,
          },
        },
      })
      await saveHandler(data, errors, refetch, refetchVars, setSaving, 'Contact')
    } catch (e) {
      await saveHandler(null, e, null, null, setSaving, 'Contact')
    }
  }

  return (
    <UiFormView saving={saving}>
      <UiForm groups={cloneDeep(fieldGroupItem)} model={contact} onSave={onSave} />
    </UiFormView>
  )
}
