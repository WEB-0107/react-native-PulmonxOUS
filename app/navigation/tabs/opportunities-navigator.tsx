import { createStackNavigator } from 'react-navigation-stack'
import { OpportunityCreateScreen } from '../../screens/opportunity/opportunity-create-screen'
import { OpportunityDetailScreen } from '../../screens/opportunity/opportunity-detail-screen'
import { OpportunityEditScreen } from '../../screens/opportunity/opportunity-edit-screen'
import { OpportunityListScreen } from '../../screens/opportunity/opportunity-list-screen'

export const OpportunitiesNavigator = createStackNavigator(
  {
    OpportunityList: {
      screen: OpportunityListScreen,
      navigationOptions: {
        headerTitle: 'Cases',
      },
    },
    OpportunityCreate: {
      screen: OpportunityCreateScreen,
      navigationOptions: {
        headerTitle: 'Create Case',
      },
    },
    OpportunityDetails: {
      screen: OpportunityDetailScreen,
      navigationOptions: {
        headerTitle: 'Case Details',
      },
    },
    OpportunityEdit: {
      screen: OpportunityEditScreen,
      navigationOptions: {
        headerTitle: 'Edit Case',
      },
    },
  },
  {
    headerMode: 'screen',
  },
)
