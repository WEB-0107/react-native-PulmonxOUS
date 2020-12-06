export class AppConfig {
  static customFieldIdsCompany = {
    AccountRep: '241',
    Champion: '181',
    Region: '243',
    Territory: '245',
  }

  static customFieldIdsContact = {
    AccountRep: '239',
    Champion: '87',
    Region: '235',
    Territory: '237',
  }

  static customFieldIdsOpportunity = {
    StratXReportDate: '23',
  }

  static readonly tabMapping = {
    Companies: 'Accounts',
    Contacts: 'Contacts',
    Opportunities: 'Cases',
    Profile: 'My Profile',
  }

  static readonly iconMapping = {
    // Contacts: "ios-people",
    // Companies: "ios-business",
    // Profile: "ios-person",
  }

  static readonly imageMapping = {
    OpportunitiesGray: require('./assets/Valve-Gray.png'),
    Opportunities: require('./assets/Valve-Color.png'),
    CompaniesGray: require('./assets/Accounts-Gray.png'),
    Companies: require('./assets/Accounts-Color.png'),
    ProfileGray: require('./assets/Profile-Gray.png'),
    Profile: require('./assets/Profile-Color.png'),
    NotesGray: require('./assets/Page-Gray.png'),
    Notes: require('./assets/Page-Color.png'),
    ContactsGray: require('./assets/Contacts-Gray.png'),
    Contacts: require('./assets/Contacts-Color.png'),
    EditGray: require('./assets/Write-Gray.png'),
    Edit: require('./assets/Write-Color.png'),
  }

  // This is the key that represents the 'list' state
  static lostStateName = 'Ruled Out'

  // This is the key that represents the 'won' state
  static wonStateName = 'Procedure Complete'

  // These are the reasons a user needs to pick when the select the `lost` state
  static lostReasons = [
    'Patient Not Interested',
    'CT Findings',
    'Cardiac/Other Comorbidities',
    'PFTs',
    'Patient Too Healthy',
    'Patient Treated with Surgery',
    'Patient Treated with SVS',
    'Patient Unstable',
    'Patient Died',
    'Patient Chose to Postpone',
    'No Answer from Patient',
  ]

  // These are the reasons a user needs to pick when the select the `won` state
  static wonReasons = ['CV+ Chartis Only', 'Zephyr Case', 'Valve Replacement / Re-bronchoscopy']

  static apiBaseUrl = 'https://ous.pulmonx.com'
  // static apiBaseUrl = 'http://localhost:3000'
  static apiUrl = `${AppConfig.apiBaseUrl}/graphql`
  static authPrefix = `/api/auth/infusionsoft-mobile-login`
  static authUrl = `${AppConfig.apiBaseUrl}${AppConfig.authPrefix}`
  // static authUrl = `https://my-deeplink-url.web.app`

  static rollbarToken = '38ff9cb09c0a4cf3bc7032bcfa9ad6ac'
}
