import { createStackNavigator } from 'react-navigation-stack'

import { ContactCreateScreen } from '../../screens/contact/contact-create-screen'
import { ContactDetailScreen } from '../../screens/contact/contact-detail-screen'
import { ContactEditScreen } from '../../screens/contact/contact-edit-screen'
import { ContactListScreen } from '../../screens/contact/contact-list-screen'
import { ContactNoteListScreen } from '../../screens/contact/contact-notes-list-screen'
import { NoteCreateScreen } from '../../screens/notes/note-create-screen'
import { NoteDetailScreen } from '../../screens/notes/note-detail-screen'

export const ContactsNavigator = createStackNavigator(
  {
    ContactList: {
      screen: ContactListScreen,
      navigationOptions: {
        headerTitle: 'Contacts',
      },
    },
    ContactCreate: {
      screen: ContactCreateScreen,
      navigationOptions: {
        headerTitle: 'Create Contact',
      },
    },
    ContactDetails: {
      screen: ContactDetailScreen,
      navigationOptions: {
        headerTitle: 'Contact Details',
      },
    },
    ContactEdit: {
      screen: ContactEditScreen,
      navigationOptions: {
        headerTitle: 'Edit Contact',
      },
    },
    ContactNoteList: {
      screen: ContactNoteListScreen,
      navigationOptions: {
        headerTitle: 'Notes',
      },
    },
    ContactNoteDetail: {
      screen: NoteDetailScreen,
      navigationOptions: {
        headerTitle: 'Note Details',
      },
    },
    ContactNoteCreate: {
      screen: NoteCreateScreen,
      navigationOptions: {
        headerTitle: 'Add Note',
      },
    },
  },
  {
    headerMode: 'screen',
  },
)
