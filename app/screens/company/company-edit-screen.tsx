import { cloneDeep } from 'lodash'
import { Text } from 'native-base'
import * as React from 'react'
import { useState } from 'react'
import { NavigationInjectedProps } from 'react-navigation'
import { LoadingCentered, UiForm } from '../../components'
import { UiFormView } from '../../components/ui-form-view'
import {
  InfusionsoftCustomFieldGroup,
  useCompanyFieldsQuery,
  useCompanyQuery,
  useUpdateCompanyMutation,
} from '../../sdk'
import { saveHandler } from '../../components/save-handler'

export interface CompanyEditScreenProps extends NavigationInjectedProps<{}> {}

export const CompanyEditScreen: React.FunctionComponent<CompanyEditScreenProps> = ({ navigation }) => {
  // @ts-ignore
  const refetch = navigation.getParam('refetch')
  // @ts-ignore
  const companyId = navigation.getParam('companyId')
  const [saving, setSaving] = useState(false)
  const [updateCompany] = useUpdateCompanyMutation()
  const { data, loading } = useCompanyFieldsQuery()
  const { data: dataCompany, error, loading: loadingCompany } = useCompanyQuery({
    variables: { id: companyId },
  })

  if (loading || loadingCompany) {
    return <LoadingCentered msg="Loading..." />
  }

  if (!companyId || error || !dataCompany.company) {
    navigation.navigate('CompanyList')
    return <Text>Error loading company</Text>
  }

  const { company } = dataCompany
  const fieldGroupItem: InfusionsoftCustomFieldGroup[] = []

  if (data && data.fields && data.fields.default) {
    fieldGroupItem.push({ fields: data.fields.default })
  }

  const onSave = async (val) => {
    setSaving(true)
    try {
      const { data, errors } = await updateCompany({
        variables: {
          id: companyId,
          input: {
            name: val.name,
            emailAddress: val.emailAddress,
            phone: val.phone,
            line1: val.line1,
            line2: val.line2,
            region: val.region,
            locality: val.locality,
            zipCode: val.zipCode,
            countryCode: val.countryCode,
          },
        },
      })

      await saveHandler(data, errors, refetch, null, setSaving, 'Account')
    } catch (e) {
      await saveHandler(null, e, null, null, setSaving, 'Account')
    }
  }

  return (
    <UiFormView saving={saving}>
      <UiForm groups={cloneDeep(fieldGroupItem)} model={company} onSave={onSave} />
    </UiFormView>
  )
}
