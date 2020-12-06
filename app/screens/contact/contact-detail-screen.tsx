import * as React from 'react'
import { useState } from 'react'
import Toast from 'react-native-simple-toast'
import { NavigationInjectedProps } from 'react-navigation'
import { AppConfig } from '../../app-config'
import { LoadingCentered, PageDetailHeader, PageHeader, UiForm } from '../../components'
import { ErrorCentered } from '../../components/error'
import { UiFormView } from '../../components/ui-form-view'
import { useContactFieldsQuery, useContactQuery, useUpdateContactMutation } from '../../sdk'
import { saveHandler } from '../../components/save-handler'

export interface ContactDetailScreenProps extends NavigationInjectedProps<{}> {}

export enum ContactDetailActions {
  EditContact = 'EditContact',
  ViewNotes = 'ViewNotes',
  ViewCompany = 'ViewCompany',
  ViewOpportunity = 'ViewOpportunity',
}

export const ContactDetailScreen: React.FunctionComponent<ContactDetailScreenProps> = ({ navigation }) => {
  // @ts-ignore
  const contactId = navigation.getParam('contactId')
  // @ts-ignore
  const listFetch = navigation.getParam('refetch')
  const [updateContact] = useUpdateContactMutation()
  const [saving, setSaving] = useState(false)
  const { data: fieldsData, loading: fieldsLoading, error: fieldsError } = useContactFieldsQuery()
  const refetchVars = {
    variables: { id: contactId },
  }
  const { data, error, loading, refetch } = useContactQuery(refetchVars)

  if (loading || fieldsLoading) {
    return <LoadingCentered msg="Loading..." />
  }

  if (error || fieldsError || !data) {
    return <ErrorCentered msg={`An error occurred`} report={error || fieldsError} />
  }

  if (!data?.contact) {
    return <ErrorCentered msg="Error loading Contact Details" />
  }

  const contact = data.contact

  const onSave = async (val): Promise<any> => {
    setSaving(true)
    const customFields = Object.keys(val).map((id) => ({ id, content: val[id] }))
    try {
      const { data, errors } = await updateContact({
        variables: {
          id: contactId,
          input: {
            customFields,
          },
        },
      })
      await saveHandler(data, errors, refetch, refetchVars, setSaving, 'Contact')
    } catch (e) {
      await saveHandler(null, e, null, null, setSaving, 'Contact')
    }
  }

  const handler = ({ action }) => {
    switch (action) {
      case ContactDetailActions.EditContact:
        navigation.navigate('ContactEdit', { refetch: listFetch, contactId })
        break
      case ContactDetailActions.ViewCompany:
        if (contact?.company?.id) {
          navigation.navigate('CompanyDetails', { companyId: contact.company.id })
        } else {
          Toast.show(`This contact has no Account`)
        }
        break
      case ContactDetailActions.ViewNotes:
        navigation.navigate('ContactNoteList', { contactId })
        break
      case ContactDetailActions.ViewOpportunity:
        navigation.navigate('OpportunityList', { contactId })
        break
    }
  }

  const repField = contact.customFieldMap[AppConfig.customFieldIdsContact.AccountRep]
  const championField = contact.customFieldMap[AppConfig.customFieldIdsContact.Champion]
  const regionField = contact.customFieldMap[AppConfig.customFieldIdsContact.Region]
  const territoryField = contact.customFieldMap[AppConfig.customFieldIdsContact.Territory]

  const page: PageHeader = {
    title: [contact.firstName, contact.lastName].join(' '),
    description: contact.company ? contact?.company?.name : contact.email || '',
    buttons: [
      {
        action: ContactDetailActions.EditContact,
        imagePath: require('../../assets/Write-Color.png'),
      },
      {
        action: ContactDetailActions.ViewCompany,
        imagePath: contact?.company?.id
          ? require('../../assets/Accounts-Color.png')
          : require('../../assets/Accounts-Gray.png'),
      },
      {
        action: ContactDetailActions.ViewOpportunity,
        imagePath: require('../../assets/Valve-Color.png'),
      },
      {
        action: ContactDetailActions.ViewNotes,
        imagePath: require('../../assets/Page-Color.png'),
      },
    ],
    cols: [
      [
        contact.company ? contact.company.name : '',
        contact.email,
        contact.phone,
        contact.line1,
        contact.line2,
        [contact.locality, contact.region].join(' '),
      ],
      [
        `Account Champion: ${championField ? 'yes' : 'no'}`,
        `Rep: ${repField || 'none'}`,
        `Region: ${regionField || 'none'}`,
        `Territory: ${territoryField || 'none'}`,
      ],
    ],
  }

  const model = contact.customFieldMap || {}
  return (
    <UiFormView saving={saving}>
      <PageDetailHeader header={page} onPress={handler} />
      <UiForm groups={fieldsData?.fields?.custom} onSave={(val) => onSave(val)} model={model} />
    </UiFormView>
  )
}
