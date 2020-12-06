import * as React from 'react'
import { useState } from 'react'
import { NavigationInjectedProps } from 'react-navigation'
import { AppConfig } from '../../app-config'
import { LoadingCentered, PageDetailHeader, PageHeader, UiForm } from '../../components'
import { ErrorCentered } from '../../components/error'
import { UiFormView } from '../../components/ui-form-view'
import { useCompanyFieldsQuery, useCompanyQuery, useUpdateCompanyMutation } from '../../sdk'
import { saveHandler } from '../../components/save-handler'

export interface CompanyDetailScreenProps extends NavigationInjectedProps<{}> {}

export enum CompanyDetailActions {
  EditCompany = 'EditCompany',
  ViewNotes = 'ViewNotes',
}

export const CompanyDetailScreen: React.FunctionComponent<CompanyDetailScreenProps> = ({ navigation }) => {
  // @ts-ignore
  const companyId = navigation.getParam('companyId')
  const [updateCompany] = useUpdateCompanyMutation()
  const [saving, setSaving] = useState(false)
  const { data: fieldsData, loading: fieldsLoading, error: fieldsError } = useCompanyFieldsQuery()
  const refetchVars = {
    variables: { id: companyId },
  }
  const { data, loading, refetch, error } = useCompanyQuery(refetchVars)

  if (loading || fieldsLoading) {
    return <LoadingCentered msg="Loading..." />
  }

  if (error || fieldsError) {
    return <ErrorCentered msg="An error occurred" report={error || fieldsError} />
  }

  if (!data || !data?.company) {
    return <ErrorCentered msg="Error loading Account Details" />
  }

  const onSave = async (val): Promise<any> => {
    setSaving(true)
    const customFields = Object.keys(val).map((id) => ({ id, content: val[id] }))
    console.log('companyCustomFields', customFields)
    try {
      const { data, errors } = await updateCompany({
        variables: {
          id: companyId,
          input: {
            customFields,
          },
        },
      })
      await saveHandler(data, errors, refetch, refetchVars, setSaving, 'Account')
    } catch (e) {
      await saveHandler(null, e, null, null,setSaving, 'Account')
    }
  }
  const handler = ({ action }) => {
    switch (action) {
      case CompanyDetailActions.EditCompany:
        navigation.navigate('CompanyEdit', { refetch, companyId })
        break
      case CompanyDetailActions.ViewNotes:
        navigation.navigate('CompanyNoteList', { companyId })
        break
    }
  }

  const company = data?.company

  // Left columns of the page header
  const leftCols = [company.line1, company.line2, [company.locality, company.region].join(' ')]

  // Right columns of the page header
  const repField = company.customFieldMap[AppConfig.customFieldIdsCompany.AccountRep]
  const championField = company.customFieldMap[AppConfig.customFieldIdsCompany.Champion]
  const regionField = company.customFieldMap[AppConfig.customFieldIdsCompany.Region]
  const territoryField = company.customFieldMap[AppConfig.customFieldIdsCompany.Territory]

  const rightCols = [
    `Region: ${regionField || 'none'}`,
    `Rep: ${repField || 'none'}`,
    `Territory: ${territoryField || 'none'}`,
    `Champion: ${championField || 'none'}`,
  ]

  const page: PageHeader = {
    title: company.name,
    description: company.website,
    buttons: [
      {
        action: CompanyDetailActions.EditCompany,
        imagePath: require('../../assets/Write-Color.png'),
      },
      // {
      //   action: CompanyDetailActions.ViewContact,
      //   imagePath: require("../../assets/Profile-Color.png"),
      // },
      {
        action: CompanyDetailActions.ViewNotes,
        imagePath: require('../../assets/Page-Color.png'),
      },
    ],
    cols: [leftCols, rightCols],
  }

  const model = company.customFieldMap || {}

  return (
    <UiFormView saving={saving}>
      <PageDetailHeader header={page} onPress={handler} />
      <UiForm groups={fieldsData?.fields?.custom} onSave={onSave} model={model} />
    </UiFormView>
  )
}
