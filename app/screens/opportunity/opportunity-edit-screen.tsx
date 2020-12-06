import { cloneDeep } from 'lodash'
import { Text } from 'native-base'
import * as React from 'react'
import { useState } from 'react'
import { LoadingCentered, UiForm } from '../../components'
import { UiFormView } from '../../components/ui-form-view'
import {
  InfusionsoftCustomFieldGroup,
  useDeleteOpportunityMutation, useOpportunitiesQuery,
  useOpportunityFieldsQuery,
  useOpportunityQuery,
  useUpdateOpportunityMutation,
} from '../../sdk'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { Button } from 'react-native'
import { saveHandler } from '../../components/save-handler'

export const OpportunityEditScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const opportunityId = navigation.getParam('opportunityId')
  const refetch = navigation.getParam('refetch')

  const { refetch: refetchList } = useOpportunitiesQuery()
  const [updateOpportunity] = useUpdateOpportunityMutation()
  const [deleteOpportunity] = useDeleteOpportunityMutation()
  const [saving, setSaving] = useState(false)
  const { data, loading } = useOpportunityFieldsQuery()
  const refetchVars = {variables: { id: opportunityId }}
  const { data: dataOpportunity, error, loading: loadingOpportunity } = useOpportunityQuery(refetchVars)

  if (loading || loadingOpportunity) {
    return <LoadingCentered msg="Loading..." />
  }

  if (!opportunityId || error || !dataOpportunity?.opportunity || !refetch) {
    return <Text>Error loading opportunity</Text>
  }

  const { opportunity } = dataOpportunity
  const fieldGroupItem: InfusionsoftCustomFieldGroup[] = []

  if (data && data.fields && data.fields.default) {
    fieldGroupItem.push({ fields: data.fields.default })
  }

  const onSave = async (val): Promise<any> => {
    setSaving(true)
    if (val.estimatedCloseDate === '') {
      val.estimatedCloseDate = 'null'
    }
    const input = {
      title: val.title,
      estimatedCloseDate: val.estimatedCloseDate,
    }

    try {
      const { data, errors } = await updateOpportunity({ variables: { id: opportunity.id, input } })
      await saveHandler(data, errors, refetch, refetchVars, setSaving, 'Opportunity')
    } catch (e) {
      await saveHandler(null, e, null, null, setSaving, 'Opportunity')
    }
  }

  const onDelete = async () => {
    setSaving(true)
    await deleteOpportunity({ variables: { id: opportunity.id } })
    await refetchList()
    navigation.navigate('OpportunityList')
  }

  return (
    <>
      <UiFormView saving={saving}>
        <UiForm groups={cloneDeep(fieldGroupItem)} model={opportunity} onSave={onSave} />
      </UiFormView>
      <Button title="Delete Opportunity" onPress={onDelete}>
        Delete Opportunity
      </Button>
    </>
  )
}
