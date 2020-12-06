import { Picker } from 'native-base'
import * as React from 'react'
import { InfusionsoftContact, useContactsQuery } from '../sdk'
import { ErrorCentered } from './error'
import { LoadingCentered } from './loading'

export interface UiContactPickerProps {
  addEmptyItem: boolean
  currentContactId: string
  saveContact: (contact: InfusionsoftContact, reason?: string) => void
}

export const UiContactPicker: React.FunctionComponent<UiContactPickerProps> = (props) => {
  const { data, error, loading } = useContactsQuery()

  if (loading) {
    return <LoadingCentered msg="Loading..." />
  }

  if (error) {
    return <ErrorCentered msg="Error loading contacts" />
  }

  const { contacts } = data

  const selectNewContact = (contactId: string) => {
    const contact = contacts.find((contact) => contact?.id === contactId)

    return props.saveContact(contact)
  }

  const pickerItems = contacts.map((contact) => (
    <Picker.Item key={contact?.id} label={contact.name} value={contact?.id} />
  ))

  if (props.addEmptyItem) {
    pickerItems.unshift(
      <Picker.Item key={null} label={props.currentContactId ? 'No filter' : 'Filter by contact'} value={null} />,
    )
  }

  return (
    <Picker
      inlineLabel={true}
      placeholder="Case Contact"
      mode="dropdown"
      iosHeader="Select Contact"
      selectedValue={props.currentContactId}
      onValueChange={(contact) => selectNewContact(contact)}
    >
      {pickerItems}
    </Picker>
  )
}
