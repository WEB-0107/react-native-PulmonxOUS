import { Formik } from 'formik'
import { ActionSheet, Form, Input, Item, Label, Picker, View } from 'native-base'
import * as React from 'react'
import { useState } from 'react'
import Toast from 'react-native-simple-toast'
import { NavigationInjectedProps } from 'react-navigation'
import { formItem, LoadingCentered, SaveButton } from '../../components'
import { ErrorCentered } from '../../components/error'
import { UiFormView } from '../../components/ui-form-view'

import { useContactsQuery, useCreateOpportunityMutation, useOpportunityStagesQuery } from '../../sdk'
import { AppConfig } from '../../app-config'

export interface OpportunityCreateScreenProps extends NavigationInjectedProps<{}> {}

export const OpportunityCreateScreen: React.FunctionComponent<OpportunityCreateScreenProps> = ({ navigation }) => {
  // @ts-ignore
  const refetch = navigation.getParam('refetch')
  const [createOpportunity] = useCreateOpportunityMutation()
  const [reason, setReason] = useState('')
  const { data: dataContacts, loading: loadingContacts } = useContactsQuery()
  const { data: dataStages, loading: loadingStages } = useOpportunityStagesQuery()

  const [saving, setSaving] = useState(false)

  if (loadingContacts || loadingStages) {
    return <LoadingCentered msg="Loading..." />
  }

  const openReasons = (stage, reasons) =>
    ActionSheet.show(
      // Config
      {
        options: reasons,
        title: 'Select Reason',
      },
      (buttonIndex) => {
        setReason(reasons[buttonIndex])
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

    if (reasons) {
      await new Promise(async (resolve) => {
        setTimeout(() => {
          openReasons(stage, reasons)
          resolve()
        }, 100)
      })
    }
  }

  const onSave = async (val) => {
    if (!val.contactId) {
      Toast.show('Please select contact')
      return
    }
    setSaving(true)
    try {
      const { data, errors } = await createOpportunity({
        variables: {
          input: {
            title: val.title,
            stageId: val.stageId,
            contactId: val.contactId,
            reasons: reason ? [reason] : null,
          },
        },
      })
      if (data) {
        setSaving(false)
        // @ts-ignore
        await refetch()
        navigation.navigate('OpportunityDetails', { opportunityId: data?.opportunity?.id })
        return Promise.resolve()
      }
      if (errors) {
        Toast.show(`Error saving case`)
        setSaving(false)
        return <ErrorCentered msg="Error saving data" report={errors} />
      }
    } catch (e) {
      console.log(JSON.stringify(e))
      setSaving(false)
    }
  }

  const contacts = dataContacts?.contacts?.map((contact) => ({
    id: contact.id,
    name: contact.name,
  }))
  const stages = dataStages?.opportunityStages?.map((stage) => ({
    id: stage.id,
    name: stage.name,
  }))

  return (
    <UiFormView>
      {saving ? (
        <LoadingCentered msg="Saving..." />
      ) : (
        <Formik
          initialValues={{
            title: null,
            contactId: null,
            stageId: '81',
          }}
          onSubmit={(val) => onSave(val)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, isValid }) => {
            return (
              <Form>
                <View>
                  <Item stackedLabel style={formItem}>
                    <Label>Title</Label>
                    <Input value={values.title} onBlur={handleBlur('title')} onChangeText={handleChange('title')} />
                  </Item>
                  <Item picker style={formItem}>
                    <Label>Contact</Label>
                    <Picker
                      note
                      mode="dropdown"
                      selectedValue={values.contactId}
                      onValueChange={(val) => setFieldValue('contactId', val)}
                      placeholder="Select Contact"
                      inlineLabel={true}
                    >
                      {contacts?.map((contact) => (
                        <Picker.Item key={contact.name} label={contact.name} value={contact.id} />
                      ))}
                    </Picker>
                  </Item>
                  <Item picker style={formItem}>
                    <Label>Stage</Label>
                    <Picker
                      note
                      mode="dropdown"
                      selectedValue={values.stageId}
                      onValueChange={(val) => {
                        setFieldValue('stageId', val)
                        selectNewStage(val)
                      }}
                      placeholder="Select Stage"
                      inlineLabel={true}
                    >
                      {stages?.map((stage) => (
                        <Picker.Item key={stage.name} label={stage.name} value={stage.id} />
                      ))}
                    </Picker>
                  </Item>

                  <SaveButton onPress={handleSubmit} disabled={!isValid} />
                </View>
              </Form>
            )
          }}
        </Formik>
      )}
    </UiFormView>
  )
}
