import { ActionSheet, Label, List, ListItem, Picker, Text } from 'native-base'
import * as React from 'react'
import { useState } from 'react'
import { NavigationInjectedProps } from 'react-navigation'
import { AppConfig } from '../../app-config'
import { ErrorCentered } from '../../components/error'
import { LoadingCentered, PageDetailHeader, PageHeader, UiForm } from '../../components/index'
import { UiFormView } from '../../components/ui-form-view'
import {
  InfusionsoftCustomFieldGroup,
  useContactsQuery,
  useOpportunityFieldsQuery,
  useOpportunityQuery,
  useOpportunityStagesQuery,
  useUpdateOpportunityMutation,
} from '../../sdk'
import { saveHandler } from '../../components/save-handler'

export enum OpportunityDetailActions {
  EditOpportunity = 'EditOpportunity',
}
export interface OpportunityDetailScreenProps extends NavigationInjectedProps<{}> {}

export const OpportunityDetailScreen: React.FunctionComponent<OpportunityDetailScreenProps> = ({ navigation }) => {
  // @ts-ignore
  const opportunityId = navigation.getParam('opportunityId')
  // @ts-ignore
  const listFetch = navigation.getParam('refetch')
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<any>({})
  const [updateOpportunity] = useUpdateOpportunityMutation()
  const { data: fieldsData, error: fieldsError, loading: fieldsLoading } = useOpportunityFieldsQuery()
  const { data: stagesData, error: stagesError, loading: stagesLoading } = useOpportunityStagesQuery()
  const { data: contactsData, error: contactsError, loading: contactsLoading } = useContactsQuery()
  const refetchVars = {variables: { id: opportunityId }}
  const { data, error, loading, refetch } = useOpportunityQuery(refetchVars)

  if (loading || fieldsLoading || stagesLoading || contactsLoading || !data?.opportunity) {
    return <LoadingCentered msg="Loading..." />
  }

  if (!opportunityId || error) {
    return <ErrorCentered msg="Error loading case details" report={error} />
  }

  if (stagesError) {
    return <ErrorCentered msg="Error loading stages" report={stagesError} />
  }

  if (fieldsError) {
    return <ErrorCentered msg="Error loading custom fields" report={fieldsError} />
  }

  if (contactsError) {
    return <ErrorCentered msg="Error loading contacts" report={contactsError} />
  }

  const { opportunity } = data
  const { opportunityStages: stages } = stagesData

  const handler = ({ action }) => {
    switch (action) {
      case OpportunityDetailActions.EditOpportunity:
        navigation.navigate('OpportunityEdit', { refetch: refetch, opportunityId: opportunity?.id })
        break
    }
  }

  const saveStage = async (stage, reason?: string) => {
    setSaving(true)
    const input = {
      variables: {
        id: opportunity?.id?.toString(),
        input: {
          stageId: stage?.id?.toString(),
          reasons: reason ? [reason] : null,
        },
      },
    }
    try {
      const { data, errors } = await updateOpportunity(input)
      await saveHandler(data, errors, refetch, refetchVars, setSaving, 'Case Stage')
    } catch (e) {
      await saveHandler(null, e, null, null, setSaving, 'Case Stage')
    }
  }

  const openReasons = (stage, reasons) =>
    ActionSheet.show(
      // Config
      {
        options: reasons,
        title: 'Select Reason',
      },
      async (buttonIndex) => {
        await saveStage(stage, reasons[buttonIndex])
      },
    )

  const selectNewStage = async (stageId: string) => {
    const stage = stages.find((stage) => stage?.id === stageId)
    let reasons: string[] = null

    if (stage.name === AppConfig.lostStateName) {
      reasons = AppConfig.lostReasons
    }
    if (stage.name === AppConfig.wonStateName) {
      reasons = AppConfig.wonReasons
    }

    // eslint-disable-next-line no-async-promise-executor
    await new Promise(async (resolve) => {
      if (!reasons) {
        await saveStage(stage)
        return resolve()
      }
      setTimeout(() => {
        openReasons(stage, reasons)
        resolve()
      }, 100)
    })
  }
  const convertVal = (val) => {
    if (typeof val !== 'string') {
      return val.toString()
    }
    return val
  }

  const onSave = async (val): Promise<any> => {
    setSaving(true)
    const cleanVals = Object.keys(val).reduce((curr, key) => {
      return { ...curr, [key]: convertVal(val[key]) }
    }, {})

    setFormData({ ...formData, ...cleanVals })

    const customFields = Object.keys(cleanVals).map((id) => ({ id, content: cleanVals[id] }))
    try {
      const { data, errors } = await updateOpportunity({
        variables: {
          id: opportunity.id,
          input: {
            contactId: val.contactId,
            estimatedCloseDate: val.estimatedCloseDate,
            customFields,
          },
        },
      })
      await saveHandler(data, errors, refetch, refetchVars, setSaving, 'Case')
    } catch (e) {
      await saveHandler(null, e, null, null, setSaving, 'Case')
    }
  }
  const onChangeDate = async (val): Promise<void> => {
    console.log('ock', val)
    let value = val
    if (val.estimatedCloseDate === '') {
      value.estimatedCloseDate = 'null'
    }
    console.log('onchangedate', value)
    setTimeout(async () => {
      setSaving(true)
      await onSave(value)
    }, 1)
  }

  const onChangeContact = async (val): Promise<void> => {
    setTimeout(async () => {
      setSaving(true)
      await onSave({ contactId: val })
    }, 1)
  }

  const currentStageId = opportunity?.stage?.id?.toString() || null
  const filteredStages = stages.map((stage) => <Picker.Item key={stage?.id} label={stage.name} value={stage?.id} />)

  if (fieldsError) {
    return <ErrorCentered msg={'Error loading custom fields'} report={fieldsError} />
  }
  const { fields } = fieldsData

  // console.log(JSON.stringify(fields, null, 2))

  // We figure the index of the 'special' group that needs to become first
  // const firstFieldSet = fields.default.filter(f => f.hidden)
  // We then make a new array containing only this group
  const firstGroup: InfusionsoftCustomFieldGroup[] = [
    {
      label: 'Case Information',
      fields: fields.default?.filter((f) => f.hidden),
    },
  ]

  const page: PageHeader = {
    title: opportunity?.title,
    description: `Owner: ${opportunity?.user.name}`,
    cols: [],
    buttons: [
      {
        action: OpportunityDetailActions.EditOpportunity,
        imagePath: require('../../assets/Write-Color.png'),
      },
    ],
  }

  const { contacts } = contactsData
  const restGroup = fields.custom
  const model = opportunity?.customFieldMap || {}
  return (
    <UiFormView saving={saving}>
      <PageDetailHeader header={page} onPress={handler} />
      <UiForm groups={firstGroup} onChangeDate={(val) => onChangeDate(val)} model={opportunity} hideButton={true} />
      <List>
        <ListItem>
          <Label>Contact</Label>
          <Picker
            note
            mode="dropdown"
            selectedValue={opportunity.contact.id}
            onValueChange={(val) => onChangeContact(val)}
            placeholder="Select Contact"
            inlineLabel={true}
          >
            {contacts.map((contact) => (
              <Picker.Item key={contact.name} label={contact.name} value={contact.id} />
            ))}
          </Picker>
        </ListItem>
        <ListItem>
          <Picker
            inlineLabel={true}
            placeholder="Case Stage"
            mode="dropdown"
            iosHeader="Select Stage"
            selectedValue={currentStageId}
            onValueChange={(stage) => selectNewStage(stage)}
          >
            {filteredStages}
          </Picker>
        </ListItem>
        {opportunity?.stage?.reasons?.length ? (
          <Text style={{ padding: 20, fontSize: 12, paddingLeft: 50 }}>
            Stage Reason: {opportunity.stage.reasons[0]}
          </Text>
        ) : null}
      </List>
      <UiForm groups={restGroup} onSave={onSave} model={model} />
    </UiFormView>
  )
}
