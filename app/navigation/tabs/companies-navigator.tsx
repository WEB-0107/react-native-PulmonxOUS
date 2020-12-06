import { createStackNavigator } from 'react-navigation-stack'

import { CompanyCreateScreen } from '../../screens/company/company-create-screen'
import { CompanyDetailScreen } from '../../screens/company/company-detail-screen'
import { CompanyEditScreen } from '../../screens/company/company-edit-screen'
import { CompanyListScreen } from '../../screens/company/company-list-screen'
import { CompanyNoteListScreen } from '../../screens/company/company-note-list-screen'
import { NoteCreateScreen } from '../../screens/notes/note-create-screen'
import { NoteDetailScreen } from '../../screens/notes/note-detail-screen'

export const CompaniesNavigator = createStackNavigator(
  {
    CompanyList: {
      screen: CompanyListScreen,
      navigationOptions: {
        headerTitle: 'Accounts',
      },
    },
    CompanyCreate: {
      screen: CompanyCreateScreen,
      navigationOptions: {
        headerTitle: 'Create Account',
      },
    },
    CompanyDetails: {
      screen: CompanyDetailScreen,
      navigationOptions: {
        headerTitle: 'Account Details',
      },
    },
    CompanyEdit: {
      screen: CompanyEditScreen,
      navigationOptions: {
        headerTitle: 'Edit Account',
      },
    },
    CompanyNoteList: {
      screen: CompanyNoteListScreen,
      navigationOptions: {
        headerTitle: 'Notes',
      },
    },
    CompanyNoteDetail: {
      screen: NoteDetailScreen,
      navigationOptions: {
        headerTitle: 'Note Details',
      },
    },
    CompanyNoteCreate: {
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
