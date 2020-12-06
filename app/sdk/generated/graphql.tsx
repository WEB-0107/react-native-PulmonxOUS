import gql from 'graphql-tag'
import * as ApolloReactCommon from '@apollo/react-common'
import * as ApolloReactHooks from '@apollo/react-hooks'
export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
  /** Date scalar type */
  Date: any
}

export type Query = {
  __typename?: 'Query'
  status: CoreStatus
  authProviders: Array<AuthProvider>
  me: User
  auth: Auth
  providers: Array<UserIdentityProvider>
  adminUsers?: Maybe<Array<User>>
  adminUsersCount?: Maybe<CorePagingCounter>
  adminUser?: Maybe<User>
  integrations: Array<Integration>
  integration: Integration
  infusionsoftCompanies?: Maybe<Array<InfusionsoftCompany>>
  infusionsoftCompany?: Maybe<InfusionsoftCompany>
  infusionsoftCompanyFields?: Maybe<InfusionsoftModelFieldGroup>
  infusionsoftContacts?: Maybe<Array<InfusionsoftContact>>
  infusionsoftContact?: Maybe<InfusionsoftContact>
  infusionsoftContactFields?: Maybe<InfusionsoftModelFieldGroup>
  infusionsoftNotes?: Maybe<Array<InfusionsoftNote>>
  infusionsoftNote?: Maybe<InfusionsoftNote>
  infusionsoftNoteTemplates?: Maybe<Array<Scalars['String']>>
  infusionsoftOpportunities?: Maybe<Array<InfusionsoftOpportunity>>
  infusionsoftOpportunity?: Maybe<InfusionsoftOpportunity>
  infusionsoftOpportunityFields?: Maybe<InfusionsoftModelFieldGroup>
  infusionsoftOpportunityStages?: Maybe<Array<InfusionsoftOpportunityStage>>
  infusionsoftUser?: Maybe<User>
  settingsEmails?: Maybe<Array<UserEmail>>
  settingsIdentities?: Maybe<Array<UserIdentity>>
  settingsProfile?: Maybe<User>
}

export type QueryAuthProvidersArgs = {
  input?: Maybe<ListAuthProviderInput>
}

export type QueryAdminUsersArgs = {
  input?: Maybe<CorePagingInput>
}

export type QueryAdminUsersCountArgs = {
  input?: Maybe<CorePagingInput>
}

export type QueryAdminUserArgs = {
  userId: Scalars['String']
}

export type QueryIntegrationArgs = {
  provider: IntegrationProvider
}

export type QueryInfusionsoftCompanyArgs = {
  companyId: Scalars['String']
}

export type QueryInfusionsoftContactArgs = {
  contactId: Scalars['String']
}

export type QueryInfusionsoftNotesArgs = {
  contactId: Scalars['String']
}

export type QueryInfusionsoftNoteArgs = {
  noteId: Scalars['String']
}

export type QueryInfusionsoftOpportunityArgs = {
  opportunityId: Scalars['String']
}

export type CoreStatus = {
  __typename?: 'CoreStatus'
  app?: Maybe<CoreStatusApp>
  resources?: Maybe<CoreStatusResources>
  system?: Maybe<CoreStatusSystem>
  time?: Maybe<Scalars['Date']>
}

export type CoreStatusApp = {
  __typename?: 'CoreStatusApp'
  pid: Scalars['Float']
  title: Scalars['String']
  node_env: Scalars['String']
  argv: Array<Scalars['String']>
  versions: Scalars['JSON']
}

export type CoreStatusResources = {
  __typename?: 'CoreStatusResources'
  cpu: Array<CoreStatusResourcesCpu>
  load: Array<CoreStatusResourcesLoad>
  mem: CoreStatusResourcesMem
  nics: Array<CoreStatusResourcesNic>
}

export type CoreStatusResourcesCpu = {
  __typename?: 'CoreStatusResourcesCpu'
  model: Scalars['String']
  speed: Scalars['Float']
  user: Scalars['Float']
  nice: Scalars['Float']
  sys: Scalars['Float']
  idle: Scalars['Float']
  irq: Scalars['Float']
}

export type CoreStatusResourcesLoad = {
  __typename?: 'CoreStatusResourcesLoad'
  interval: Scalars['Float']
  load: Scalars['Float']
}

export type CoreStatusResourcesMem = {
  __typename?: 'CoreStatusResourcesMem'
  rss: Scalars['Float']
  heapTotal: Scalars['Float']
  heapUsed: Scalars['Float']
  external: Scalars['Float']
}

export type CoreStatusResourcesNic = {
  __typename?: 'CoreStatusResourcesNic'
  name: Scalars['String']
  address: Scalars['String']
  netmask: Scalars['String']
  family: Scalars['String']
  mac: Scalars['String']
  internal: Scalars['Boolean']
  cidr: Scalars['String']
}

export type CoreStatusSystem = {
  __typename?: 'CoreStatusSystem'
  arch: Scalars['String']
  platform: Scalars['String']
  type: Scalars['String']
  release: Scalars['String']
  hostname: Scalars['String']
  uptime: Scalars['Float']
  cores: Scalars['Float']
  memory: Scalars['Float']
}

export type ListAuthProviderInput = {
  accountLink?: Maybe<Scalars['Boolean']>
  accountLogin?: Maybe<Scalars['Boolean']>
}

export type AuthProvider = {
  __typename?: 'AuthProvider'
  id: Scalars['String']
  name: Scalars['String']
  settingsUrl?: Maybe<Scalars['String']>
  icon?: Maybe<Scalars['String']>
  /** When enabled, this AuthProvider can be used to link to existing accounts. */
  accountLink?: Maybe<Scalars['Boolean']>
  /** When enabled, this AuthProvider can be used to log in and and register for new accounts. */
  accountLogin?: Maybe<Scalars['Boolean']>
}

export type User = {
  __typename?: 'User'
  id: Scalars['String']
  created: Scalars['String']
  updated: Scalars['String']
  username: Scalars['String']
  name?: Maybe<Scalars['String']>
  avatar?: Maybe<Scalars['String']>
  role: Role
  developer: Scalars['Boolean']
  emails?: Maybe<Array<UserEmail>>
}

export enum Role {
  Admin = 'Admin',
  User = 'User',
}

export type UserEmail = {
  __typename?: 'UserEmail'
  id: Scalars['String']
  created: Scalars['String']
  updated: Scalars['String']
  email: Scalars['String']
  verified: Scalars['Boolean']
  public: Scalars['Boolean']
  primary: Scalars['Boolean']
}

export type Auth = {
  __typename?: 'Auth'
  /** JWT Bearer token */
  token: Scalars['String']
  user: User
}

export enum UserIdentityProvider {
  Infusionsoft = 'Infusionsoft',
}

export type CorePagingInput = {
  q?: Maybe<Scalars['String']>
  skip?: Maybe<Scalars['Float']>
  limit?: Maybe<Scalars['Float']>
}

export type CorePagingCounter = {
  __typename?: 'CorePagingCounter'
  total?: Maybe<Scalars['Float']>
  limit?: Maybe<Scalars['Float']>
  skip?: Maybe<Scalars['Float']>
}

export type Integration = {
  __typename?: 'Integration'
  icon?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  provider: IntegrationProvider
  actions?: Maybe<Array<IntegrationAction>>
  identities?: Maybe<Array<UserIdentity>>
}

export enum IntegrationProvider {
  Infusionsoft = 'Infusionsoft',
}

export type IntegrationAction = {
  __typename?: 'IntegrationAction'
  id: Scalars['String']
  name: Scalars['String']
  value?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  params?: Maybe<Array<IntegrationActionParam>>
  provides?: Maybe<Scalars['JSON']>
}

export type IntegrationActionParam = {
  __typename?: 'IntegrationActionParam'
  name: Scalars['String']
  type: Scalars['String']
  label?: Maybe<Scalars['String']>
  required?: Maybe<Scalars['Boolean']>
  defaultValue?: Maybe<Scalars['String']>
}

export type UserIdentity = {
  __typename?: 'UserIdentity'
  id: Scalars['String']
  created: Scalars['String']
  updated: Scalars['String']
  refreshed?: Maybe<Scalars['String']>
  provider: UserIdentityProvider
  type: UserIdentityType
  providerId?: Maybe<Scalars['String']>
  accessToken?: Maybe<Scalars['String']>
  refreshToken?: Maybe<Scalars['String']>
  profile?: Maybe<Scalars['JSON']>
  data?: Maybe<Scalars['JSON']>
  label?: Maybe<Scalars['String']>
  scopes?: Maybe<Array<Scalars['String']>>
}

export enum UserIdentityType {
  Link = 'Link',
  Login = 'Login',
}

export type InfusionsoftCompany = {
  __typename?: 'InfusionsoftCompany'
  id?: Maybe<Scalars['String']>
  updated?: Maybe<Scalars['String']>
  created?: Maybe<Scalars['String']>
  line1?: Maybe<Scalars['String']>
  line2?: Maybe<Scalars['String']>
  locality?: Maybe<Scalars['String']>
  region?: Maybe<Scalars['String']>
  zipCode?: Maybe<Scalars['String']>
  countryCode?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  emailAddress?: Maybe<Scalars['String']>
  emailOptedIn?: Maybe<Scalars['String']>
  emailStatus?: Maybe<Scalars['String']>
  notes?: Maybe<Scalars['String']>
  phoneExtension?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
  phoneType?: Maybe<Scalars['String']>
  website?: Maybe<Scalars['String']>
  customFields?: Maybe<Array<InfusionsoftCustomField>>
  customFieldMap?: Maybe<Scalars['JSON']>
  _raw?: Maybe<Scalars['JSON']>
}

export type InfusionsoftCustomField = {
  __typename?: 'InfusionsoftCustomField'
  id?: Maybe<Scalars['String']>
  key?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
  options?: Maybe<Array<InfusionsoftCustomFieldOptions>>
  type?: Maybe<Scalars['String']>
  required?: Maybe<Scalars['Boolean']>
  hidden?: Maybe<Scalars['Boolean']>
  _raw?: Maybe<Scalars['JSON']>
}

export type InfusionsoftCustomFieldOptions = {
  __typename?: 'InfusionsoftCustomFieldOptions'
  id?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
}

export type InfusionsoftModelFieldGroup = {
  __typename?: 'InfusionsoftModelFieldGroup'
  customFieldGroups?: Maybe<Array<InfusionsoftCustomFieldGroup>>
  customFields?: Maybe<Array<InfusionsoftCustomField>>
  defaultFields?: Maybe<Array<InfusionsoftCustomField>>
}

export type InfusionsoftCustomFieldGroup = {
  __typename?: 'InfusionsoftCustomFieldGroup'
  label?: Maybe<Scalars['String']>
  fields?: Maybe<Array<InfusionsoftCustomField>>
}

export type InfusionsoftContact = {
  __typename?: 'InfusionsoftContact'
  id?: Maybe<Scalars['String']>
  updated?: Maybe<Scalars['String']>
  created?: Maybe<Scalars['String']>
  ownerId?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  middleName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  emailStatus?: Maybe<Scalars['String']>
  line1?: Maybe<Scalars['String']>
  line2?: Maybe<Scalars['String']>
  locality?: Maybe<Scalars['String']>
  region?: Maybe<Scalars['String']>
  zipCode?: Maybe<Scalars['String']>
  countryCode?: Maybe<Scalars['String']>
  company?: Maybe<InfusionsoftCompany>
  companyName?: Maybe<Scalars['String']>
  companyId?: Maybe<Scalars['String']>
  emailOptedIn?: Maybe<Scalars['Boolean']>
  emailAddresses?: Maybe<Array<InfusionsoftEmail>>
  email?: Maybe<Scalars['String']>
  contactType?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  tagIds?: Maybe<Array<Scalars['Int']>>
  phoneNumbers?: Maybe<Array<InfusionsoftPhone>>
  customFields?: Maybe<Array<InfusionsoftCustomField>>
  customFieldMap?: Maybe<Scalars['JSON']>
  _raw?: Maybe<Scalars['JSON']>
}

export type InfusionsoftEmail = {
  __typename?: 'InfusionsoftEmail'
  email?: Maybe<Scalars['String']>
  field?: Maybe<Scalars['String']>
}

export type InfusionsoftPhone = {
  __typename?: 'InfusionsoftPhone'
  number?: Maybe<Scalars['String']>
  extension?: Maybe<Scalars['String']>
  field?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  _raw?: Maybe<Scalars['JSON']>
}

export type InfusionsoftNote = {
  __typename?: 'InfusionsoftNote'
  id?: Maybe<Scalars['String']>
  updated?: Maybe<Scalars['String']>
  created?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  body?: Maybe<Scalars['String']>
  _raw?: Maybe<Scalars['JSON']>
}

export type InfusionsoftOpportunity = {
  __typename?: 'InfusionsoftOpportunity'
  id?: Maybe<Scalars['String']>
  updated?: Maybe<Scalars['String']>
  created?: Maybe<Scalars['String']>
  affiliateId?: Maybe<Scalars['String']>
  notes?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  estimatedCloseDate?: Maybe<Scalars['String']>
  nextActionNotes?: Maybe<Scalars['String']>
  nextActionDate?: Maybe<Scalars['String']>
  includeInForecast?: Maybe<Scalars['String']>
  projectedRevenueLow?: Maybe<Scalars['String']>
  projectedRevenueHigh?: Maybe<Scalars['String']>
  stage?: Maybe<Scalars['JSON']>
  contact?: Maybe<InfusionsoftContact>
  user?: Maybe<InfusionsoftUser>
  customFields?: Maybe<Array<InfusionsoftCustomField>>
  customFieldMap?: Maybe<Scalars['JSON']>
  _raw?: Maybe<Scalars['JSON']>
}

export type InfusionsoftUser = {
  __typename?: 'InfusionsoftUser'
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  middleName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  infusionsoftId?: Maybe<Scalars['String']>
  _raw?: Maybe<Scalars['JSON']>
}

export type InfusionsoftOpportunityStage = {
  __typename?: 'InfusionsoftOpportunityStage'
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  endStage?: Maybe<Scalars['Boolean']>
  isDefault?: Maybe<Scalars['Boolean']>
  stageCount?: Maybe<Scalars['Float']>
  stageOrder?: Maybe<Scalars['Float']>
  _raw?: Maybe<Scalars['JSON']>
}

export type Mutation = {
  __typename?: 'Mutation'
  adminUpdateUser?: Maybe<User>
  adminDeleteUser?: Maybe<User>
  executeIntegrationAction: Scalars['JSON']
  createInfusionsoftCompany?: Maybe<InfusionsoftCompany>
  updateInfusionsoftCompany?: Maybe<InfusionsoftCompany>
  createInfusionsoftContact?: Maybe<InfusionsoftContact>
  updateInfusionsoftContact?: Maybe<InfusionsoftContact>
  createInfusionsoftNote?: Maybe<InfusionsoftNote>
  createInfusionsoftOpportunity?: Maybe<InfusionsoftOpportunity>
  deleteInfusionsoftOpportunity?: Maybe<InfusionsoftOpportunity>
  updateInfusionsoftOpportunity?: Maybe<InfusionsoftOpportunity>
  clearInfusionsoftCache?: Maybe<Scalars['Boolean']>
  settingsCreateEmail?: Maybe<UserEmail>
  settingsDeleteEmail?: Maybe<UserEmail>
  settingsDeleteIdentity?: Maybe<UserIdentity>
  settingsRefreshIdentity?: Maybe<UserIdentity>
  settingsMarkEmailPrimary?: Maybe<UserEmail>
  settingsMarkEmailPrivate?: Maybe<UserEmail>
  settingsMarkEmailPublic?: Maybe<UserEmail>
  settingsLinkIdentity?: Maybe<UserIdentity>
  settingsUpdateProfile?: Maybe<User>
}

export type MutationAdminUpdateUserArgs = {
  input: AdminUpdateUserInput
  userId: Scalars['String']
}

export type MutationAdminDeleteUserArgs = {
  userId: Scalars['String']
}

export type MutationExecuteIntegrationActionArgs = {
  params?: Maybe<Scalars['JSON']>
  action: Scalars['String']
  provider: IntegrationProvider
  identityId: Scalars['String']
}

export type MutationCreateInfusionsoftCompanyArgs = {
  input: InfusionsoftCompanyInput
}

export type MutationUpdateInfusionsoftCompanyArgs = {
  input: InfusionsoftCompanyInput
  companyId: Scalars['String']
}

export type MutationCreateInfusionsoftContactArgs = {
  input: InfusionsoftContactInput
}

export type MutationUpdateInfusionsoftContactArgs = {
  input: InfusionsoftContactInput
  contactId: Scalars['String']
}

export type MutationCreateInfusionsoftNoteArgs = {
  input: InfusionsoftNoteInput
}

export type MutationCreateInfusionsoftOpportunityArgs = {
  input: InfusionsoftOpportunityInput
}

export type MutationDeleteInfusionsoftOpportunityArgs = {
  input: InfusionsoftOpportunityInput
}

export type MutationUpdateInfusionsoftOpportunityArgs = {
  input: InfusionsoftOpportunityInput
  opportunityId: Scalars['String']
}

export type MutationSettingsCreateEmailArgs = {
  input: SettingsCreateEmailInput
}

export type MutationSettingsDeleteEmailArgs = {
  emailId: Scalars['String']
}

export type MutationSettingsDeleteIdentityArgs = {
  identityId: Scalars['String']
}

export type MutationSettingsRefreshIdentityArgs = {
  identityId: Scalars['String']
}

export type MutationSettingsMarkEmailPrimaryArgs = {
  emailId: Scalars['String']
}

export type MutationSettingsMarkEmailPrivateArgs = {
  emailId: Scalars['String']
}

export type MutationSettingsMarkEmailPublicArgs = {
  emailId: Scalars['String']
}

export type MutationSettingsLinkIdentityArgs = {
  input: SettingsLinkIdentityInput
}

export type MutationSettingsUpdateProfileArgs = {
  input: SettingsUpdateProfileInput
}

export type AdminUpdateUserInput = {
  username?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  avatar?: Maybe<Scalars['String']>
  role?: Maybe<Role>
  developer?: Maybe<Scalars['Boolean']>
}

export type InfusionsoftCompanyInput = {
  countryCode?: Maybe<Scalars['String']>
  line1?: Maybe<Scalars['String']>
  line2?: Maybe<Scalars['String']>
  locality?: Maybe<Scalars['String']>
  region?: Maybe<Scalars['String']>
  zipCode?: Maybe<Scalars['String']>
  zipFour?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  emailAddress?: Maybe<Scalars['String']>
  emailOptedIn?: Maybe<Scalars['Boolean']>
  emailStatus?: Maybe<Scalars['String']>
  notes?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  website?: Maybe<Scalars['String']>
  customFields?: Maybe<Array<InfusionsoftCustomFieldInput>>
}

export type InfusionsoftCustomFieldInput = {
  id?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
}

export type InfusionsoftContactInput = {
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  companyId?: Maybe<Scalars['String']>
  line1?: Maybe<Scalars['String']>
  line2?: Maybe<Scalars['String']>
  countryCode?: Maybe<Scalars['String']>
  zipCode?: Maybe<Scalars['String']>
  region?: Maybe<Scalars['String']>
  locality?: Maybe<Scalars['String']>
  customFields?: Maybe<Array<InfusionsoftCustomFieldInput>>
}

export type InfusionsoftNoteInput = {
  title?: Maybe<Scalars['String']>
  body?: Maybe<Scalars['String']>
  contactId?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

export type InfusionsoftOpportunityInput = {
  dateCreated?: Maybe<Scalars['String']>
  estimatedCloseDate?: Maybe<Scalars['String']>
  includeInForecast?: Maybe<Scalars['String']>
  lastUpdated?: Maybe<Scalars['String']>
  nextActionDate?: Maybe<Scalars['String']>
  nextActionNotes?: Maybe<Scalars['String']>
  notes?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  projectedRevenueHigh?: Maybe<Scalars['String']>
  projectedRevenueLow?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  stageId?: Maybe<Scalars['String']>
  reasons?: Maybe<Array<Scalars['String']>>
  contactId?: Maybe<Scalars['String']>
  opportunityId?: Maybe<Scalars['String']>
  customFields?: Maybe<Array<InfusionsoftCustomFieldInput>>
}

export type SettingsCreateEmailInput = {
  email: Scalars['String']
}

export type SettingsLinkIdentityInput = {
  provider: UserIdentityProvider
  providerId?: Maybe<Scalars['String']>
  accessToken: Scalars['String']
  refreshToken?: Maybe<Scalars['String']>
  profile?: Maybe<Scalars['JSON']>
}

export type SettingsUpdateProfileInput = {
  username: Scalars['String']
  name: Scalars['String']
  avatar: Scalars['String']
}

export type UserDetailsFragment = { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'username' | 'avatar'> & {
    emails?: Maybe<Array<{ __typename?: 'UserEmail' } & Pick<UserEmail, 'email' | 'primary'>>>
  }

export type MeQueryVariables = {}

export type MeQuery = { __typename?: 'Query' } & { me: { __typename?: 'User' } & UserDetailsFragment }

export type ClearCacheMutationVariables = {}

export type ClearCacheMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'clearInfusionsoftCache'>

export type InfusionsoftCompanyDetailsFragment = { __typename?: 'InfusionsoftCompany' } & Pick<
  InfusionsoftCompany,
  | 'id'
  | 'updated'
  | 'created'
  | 'line1'
  | 'line2'
  | 'locality'
  | 'region'
  | 'zipCode'
  | 'countryCode'
  | 'name'
  | 'emailAddress'
  | 'emailOptedIn'
  | 'emailStatus'
  | 'notes'
  | 'phoneExtension'
  | 'phoneNumber'
  | 'phoneType'
  | 'website'
  | 'customFieldMap'
> & {
    customFields?: Maybe<
      Array<
        { __typename?: 'InfusionsoftCustomField' } & Pick<
          InfusionsoftCustomField,
          'id' | 'key' | 'label' | 'value' | 'type'
        > & {
            options?: Maybe<
              Array<
                { __typename?: 'InfusionsoftCustomFieldOptions' } & Pick<InfusionsoftCustomFieldOptions, 'id' | 'label'>
              >
            >
          }
      >
    >
  }

export type CompaniesQueryVariables = {}

export type CompaniesQuery = { __typename?: 'Query' } & {
  companies?: Maybe<Array<{ __typename?: 'InfusionsoftCompany' } & InfusionsoftCompanyDetailsFragment>>
}

export type CompanyQueryVariables = {
  id: Scalars['String']
}

export type CompanyQuery = { __typename?: 'Query' } & {
  company?: Maybe<{ __typename?: 'InfusionsoftCompany' } & InfusionsoftCompanyDetailsFragment>
}

export type CreateCompanyMutationVariables = {
  input: InfusionsoftCompanyInput
}

export type CreateCompanyMutation = { __typename?: 'Mutation' } & {
  company?: Maybe<{ __typename?: 'InfusionsoftCompany' } & InfusionsoftCompanyDetailsFragment>
}

export type UpdateCompanyMutationVariables = {
  id: Scalars['String']
  input: InfusionsoftCompanyInput
}

export type UpdateCompanyMutation = { __typename?: 'Mutation' } & {
  company?: Maybe<{ __typename?: 'InfusionsoftCompany' } & InfusionsoftCompanyDetailsFragment>
}

export type InfusionsoftContactDetailsFragment = { __typename: 'InfusionsoftContact' } & Pick<
  InfusionsoftContact,
  | 'id'
  | 'updated'
  | 'created'
  | 'firstName'
  | 'middleName'
  | 'lastName'
  | 'email'
  | 'phone'
  | 'name'
  | 'contactType'
  | 'emailStatus'
  | 'emailOptedIn'
  | 'line1'
  | 'line2'
  | 'locality'
  | 'region'
  | 'zipCode'
  | 'countryCode'
  | 'companyId'
  | 'companyName'
  | 'tagIds'
  | 'customFieldMap'
> & {
    emails?: Maybe<Array<{ __typename?: 'InfusionsoftEmail' } & Pick<InfusionsoftEmail, 'email' | 'field'>>>
    company?: Maybe<{ __typename?: 'InfusionsoftCompany' } & Pick<InfusionsoftCompany, 'id' | 'name'>>
    customFields?: Maybe<
      Array<
        { __typename?: 'InfusionsoftCustomField' } & Pick<
          InfusionsoftCustomField,
          'id' | 'key' | 'label' | 'value' | 'type'
        > & {
            options?: Maybe<
              Array<
                { __typename?: 'InfusionsoftCustomFieldOptions' } & Pick<InfusionsoftCustomFieldOptions, 'id' | 'label'>
              >
            >
          }
      >
    >
  }

export type ContactsQueryVariables = {}

export type ContactsQuery = { __typename?: 'Query' } & {
  contacts?: Maybe<Array<{ __typename?: 'InfusionsoftContact' } & InfusionsoftContactDetailsFragment>>
}

export type ContactQueryVariables = {
  id: Scalars['String']
}

export type ContactQuery = { __typename?: 'Query' } & {
  contact?: Maybe<{ __typename?: 'InfusionsoftContact' } & InfusionsoftContactDetailsFragment>
}

export type CreateContactMutationVariables = {
  input: InfusionsoftContactInput
}

export type CreateContactMutation = { __typename?: 'Mutation' } & {
  contact?: Maybe<{ __typename?: 'InfusionsoftContact' } & InfusionsoftContactDetailsFragment>
}

export type UpdateContactMutationVariables = {
  id: Scalars['String']
  input: InfusionsoftContactInput
}

export type UpdateContactMutation = { __typename?: 'Mutation' } & {
  contact?: Maybe<{ __typename?: 'InfusionsoftContact' } & InfusionsoftContactDetailsFragment>
}

export type FieldDetailsFragment = { __typename?: 'InfusionsoftCustomField' } & Pick<
  InfusionsoftCustomField,
  'id' | 'key' | 'label' | 'type' | 'required' | 'hidden'
> & {
    options?: Maybe<
      Array<{ __typename?: 'InfusionsoftCustomFieldOptions' } & Pick<InfusionsoftCustomFieldOptions, 'id' | 'label'>>
    >
  }

export type FieldGroupDetailsFragment = { __typename?: 'InfusionsoftCustomFieldGroup' } & Pick<
  InfusionsoftCustomFieldGroup,
  'label'
> & { fields?: Maybe<Array<{ __typename?: 'InfusionsoftCustomField' } & FieldDetailsFragment>> }

export type ModelFieldGroupDetailsFragment = { __typename?: 'InfusionsoftModelFieldGroup' } & {
  custom?: Maybe<Array<{ __typename?: 'InfusionsoftCustomFieldGroup' } & FieldGroupDetailsFragment>>
  default?: Maybe<Array<{ __typename?: 'InfusionsoftCustomField' } & FieldDetailsFragment>>
}

export type InfusionsoftUserQueryVariables = {}

export type InfusionsoftUserQuery = { __typename?: 'Query' } & {
  infusionsoftUser?: Maybe<{ __typename?: 'User' } & UserDetailsFragment>
}

export type CustomFieldsQueryVariables = {}

export type CustomFieldsQuery = { __typename?: 'Query' } & {
  infusionsoftCompanyFields?: Maybe<{ __typename?: 'InfusionsoftModelFieldGroup' } & ModelFieldGroupDetailsFragment>
  infusionsoftContactFields?: Maybe<{ __typename?: 'InfusionsoftModelFieldGroup' } & ModelFieldGroupDetailsFragment>
  infusionsoftOpportunityFields?: Maybe<{ __typename?: 'InfusionsoftModelFieldGroup' } & ModelFieldGroupDetailsFragment>
}

export type CompanyFieldsQueryVariables = {}

export type CompanyFieldsQuery = { __typename?: 'Query' } & {
  fields?: Maybe<{ __typename?: 'InfusionsoftModelFieldGroup' } & ModelFieldGroupDetailsFragment>
}

export type ContactFieldsQueryVariables = {}

export type ContactFieldsQuery = { __typename?: 'Query' } & {
  fields?: Maybe<{ __typename?: 'InfusionsoftModelFieldGroup' } & ModelFieldGroupDetailsFragment>
}

export type OpportunityFieldsQueryVariables = {}

export type OpportunityFieldsQuery = { __typename?: 'Query' } & {
  fields?: Maybe<{ __typename?: 'InfusionsoftModelFieldGroup' } & ModelFieldGroupDetailsFragment>
}

export type NoteDetailsFragment = { __typename?: 'InfusionsoftNote' } & Pick<
  InfusionsoftNote,
  'id' | 'created' | 'updated' | 'body' | 'title' | 'type'
>

export type NotesQueryVariables = {
  contactId: Scalars['String']
}

export type NotesQuery = { __typename?: 'Query' } & {
  infusionsoftNotes?: Maybe<Array<{ __typename?: 'InfusionsoftNote' } & NoteDetailsFragment>>
}

export type NoteTemplatesQueryVariables = {}

export type NoteTemplatesQuery = { __typename?: 'Query' } & Pick<Query, 'infusionsoftNoteTemplates'>

export type CreateNoteMutationVariables = {
  input: InfusionsoftNoteInput
}

export type CreateNoteMutation = { __typename?: 'Mutation' } & {
  createInfusionsoftNote?: Maybe<{ __typename?: 'InfusionsoftNote' } & NoteDetailsFragment>
}

export type InfusionsoftOpportunityDetailsFragment = { __typename?: 'InfusionsoftOpportunity' } & Pick<
  InfusionsoftOpportunity,
  | 'id'
  | 'updated'
  | 'created'
  | 'affiliateId'
  | 'estimatedCloseDate'
  | 'includeInForecast'
  | 'nextActionDate'
  | 'nextActionNotes'
  | 'notes'
  | 'title'
  | 'projectedRevenueHigh'
  | 'projectedRevenueLow'
  | 'stage'
  | 'customFieldMap'
> & {
    contact?: Maybe<
      { __typename?: 'InfusionsoftContact' } & Pick<InfusionsoftContact, 'email' | 'name' | 'id' | 'companyName'>
    >
    user?: Maybe<{ __typename?: 'InfusionsoftUser' } & Pick<InfusionsoftUser, 'id' | 'name' | 'email'>>
    customFields?: Maybe<
      Array<
        { __typename?: 'InfusionsoftCustomField' } & Pick<
          InfusionsoftCustomField,
          'id' | 'key' | 'label' | 'value' | 'type'
        > & {
            options?: Maybe<
              Array<
                { __typename?: 'InfusionsoftCustomFieldOptions' } & Pick<InfusionsoftCustomFieldOptions, 'id' | 'label'>
              >
            >
          }
      >
    >
  }

export type OpportunitiesQueryVariables = {}

export type OpportunitiesQuery = { __typename?: 'Query' } & {
  opportunities?: Maybe<Array<{ __typename?: 'InfusionsoftOpportunity' } & InfusionsoftOpportunityDetailsFragment>>
}

export type OpportunityQueryVariables = {
  id: Scalars['String']
}

export type OpportunityQuery = { __typename?: 'Query' } & {
  opportunity?: Maybe<{ __typename?: 'InfusionsoftOpportunity' } & InfusionsoftOpportunityDetailsFragment>
}

export type OpportunityStagesQueryVariables = {}

export type OpportunityStagesQuery = { __typename?: 'Query' } & {
  opportunityStages?: Maybe<
    Array<
      { __typename?: 'InfusionsoftOpportunityStage' } & Pick<
        InfusionsoftOpportunityStage,
        'id' | 'name' | 'stageCount' | 'stageOrder' | 'endStage' | 'isDefault'
      >
    >
  >
}

export type CreateOpportunityMutationVariables = {
  input: InfusionsoftOpportunityInput
}

export type CreateOpportunityMutation = { __typename?: 'Mutation' } & {
  opportunity?: Maybe<{ __typename?: 'InfusionsoftOpportunity' } & InfusionsoftOpportunityDetailsFragment>
}

export type UpdateOpportunityMutationVariables = {
  id: Scalars['String']
  input: InfusionsoftOpportunityInput
}

export type UpdateOpportunityMutation = { __typename?: 'Mutation' } & {
  opportunity?: Maybe<{ __typename?: 'InfusionsoftOpportunity' } & InfusionsoftOpportunityDetailsFragment>
}

export type DeleteOpportunityMutationVariables = {
  id: Scalars['String']
}

export type DeleteOpportunityMutation = { __typename?: 'Mutation' } & {
  opportunity?: Maybe<{ __typename?: 'InfusionsoftOpportunity' } & InfusionsoftOpportunityDetailsFragment>
}

export type IntegrationActionDetailsFragment = { __typename: 'IntegrationAction' } & Pick<
  IntegrationAction,
  'id' | 'name' | 'provides' | 'description'
> & {
    params?: Maybe<
      Array<
        { __typename?: 'IntegrationActionParam' } & Pick<
          IntegrationActionParam,
          'name' | 'type' | 'label' | 'required' | 'defaultValue'
        >
      >
    >
  }

export type IntegrationDetailsFragment = { __typename: 'Integration' } & Pick<
  Integration,
  'icon' | 'name' | 'provider'
> & {
    actions?: Maybe<Array<{ __typename?: 'IntegrationAction' } & IntegrationActionDetailsFragment>>
    identities?: Maybe<Array<{ __typename?: 'UserIdentity' } & Pick<UserIdentity, 'id' | 'profile' | 'providerId'>>>
  }

export type IntegrationsQueryVariables = {}

export type IntegrationsQuery = { __typename?: 'Query' } & {
  integrations: Array<{ __typename?: 'Integration' } & IntegrationDetailsFragment>
}

export type IntegrationQueryVariables = {
  provider: IntegrationProvider
}

export type IntegrationQuery = { __typename?: 'Query' } & {
  integration: { __typename?: 'Integration' } & IntegrationDetailsFragment
}

export type ExecuteIntegrationActionMutationVariables = {
  identityId: Scalars['String']
  provider: IntegrationProvider
  action: Scalars['String']
  params?: Maybe<Scalars['JSON']>
}

export type ExecuteIntegrationActionMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'executeIntegrationAction'>

export const UserDetailsFragmentDoc = gql`
  fragment UserDetails on User {
    id
    name
    username
    avatar
    emails {
      email
      primary
    }
  }
`
export const InfusionsoftCompanyDetailsFragmentDoc = gql`
  fragment InfusionsoftCompanyDetails on InfusionsoftCompany {
    id
    updated
    created
    line1
    line2
    locality
    region
    zipCode
    countryCode
    name
    emailAddress
    emailOptedIn
    emailStatus
    notes
    phoneExtension
    phoneNumber
    phoneType
    website
    customFieldMap
    customFields {
      id
      key
      label
      value
      options {
        id
        label
      }
      type
    }
  }
`
export const InfusionsoftContactDetailsFragmentDoc = gql`
  fragment InfusionsoftContactDetails on InfusionsoftContact {
    id
    updated
    created
    firstName
    middleName
    lastName
    email
    phone
    name
    contactType
    emailStatus
    emailOptedIn
    line1
    line2
    locality
    region
    zipCode
    countryCode
    emails: emailAddresses {
      email
      field
    }
    company {
      id
      name
    }
    companyId
    companyName
    tagIds
    customFieldMap
    customFields {
      id
      key
      label
      value
      options {
        id
        label
      }
      type
    }
    __typename
  }
`
export const FieldDetailsFragmentDoc = gql`
  fragment FieldDetails on InfusionsoftCustomField {
    id
    key
    label
    options {
      id
      label
    }
    type
    required
    hidden
  }
`
export const FieldGroupDetailsFragmentDoc = gql`
  fragment FieldGroupDetails on InfusionsoftCustomFieldGroup {
    label
    fields {
      ...FieldDetails
    }
  }
  ${FieldDetailsFragmentDoc}
`
export const ModelFieldGroupDetailsFragmentDoc = gql`
  fragment ModelFieldGroupDetails on InfusionsoftModelFieldGroup {
    custom: customFieldGroups {
      ...FieldGroupDetails
    }
    default: defaultFields {
      ...FieldDetails
    }
  }
  ${FieldGroupDetailsFragmentDoc}
  ${FieldDetailsFragmentDoc}
`
export const NoteDetailsFragmentDoc = gql`
  fragment NoteDetails on InfusionsoftNote {
    id
    created
    updated
    body
    title
    type
  }
`
export const InfusionsoftOpportunityDetailsFragmentDoc = gql`
  fragment InfusionsoftOpportunityDetails on InfusionsoftOpportunity {
    id
    updated
    created
    affiliateId
    contact {
      email
      name
      id
      companyName
    }
    created
    estimatedCloseDate
    id
    includeInForecast
    nextActionDate
    nextActionNotes
    notes
    title
    projectedRevenueHigh
    projectedRevenueLow
    stage
    updated
    user {
      id
      name
      email
    }
    customFieldMap
    customFields {
      id
      key
      label
      value
      options {
        id
        label
      }
      type
    }
  }
`
export const IntegrationActionDetailsFragmentDoc = gql`
  fragment IntegrationActionDetails on IntegrationAction {
    __typename
    id
    name
    params {
      name
      type
      label
      required
      defaultValue
    }
    provides
    description
  }
`
export const IntegrationDetailsFragmentDoc = gql`
  fragment IntegrationDetails on Integration {
    __typename
    icon
    name
    actions {
      ...IntegrationActionDetails
    }
    identities {
      id
      profile
      providerId
      profile
    }
    provider
  }
  ${IntegrationActionDetailsFragmentDoc}
`
export const MeDocument = gql`
  query me {
    me {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
  return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions)
}
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions)
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>
export const ClearCacheDocument = gql`
  mutation clearCache {
    clearInfusionsoftCache
  }
`
export type ClearCacheMutationFn = ApolloReactCommon.MutationFunction<ClearCacheMutation, ClearCacheMutationVariables>

/**
 * __useClearCacheMutation__
 *
 * To run a mutation, you first call `useClearCacheMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearCacheMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearCacheMutation, { data, loading, error }] = useClearCacheMutation({
 *   variables: {
 *   },
 * });
 */
export function useClearCacheMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<ClearCacheMutation, ClearCacheMutationVariables>,
) {
  return ApolloReactHooks.useMutation<ClearCacheMutation, ClearCacheMutationVariables>(ClearCacheDocument, baseOptions)
}
export type ClearCacheMutationHookResult = ReturnType<typeof useClearCacheMutation>
export type ClearCacheMutationResult = ApolloReactCommon.MutationResult<ClearCacheMutation>
export type ClearCacheMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ClearCacheMutation,
  ClearCacheMutationVariables
>
export const CompaniesDocument = gql`
  query Companies {
    companies: infusionsoftCompanies {
      ...InfusionsoftCompanyDetails
    }
  }
  ${InfusionsoftCompanyDetailsFragmentDoc}
`

/**
 * __useCompaniesQuery__
 *
 * To run a query within a React component, call `useCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompaniesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCompaniesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<CompaniesQuery, CompaniesQueryVariables>,
) {
  return ApolloReactHooks.useQuery<CompaniesQuery, CompaniesQueryVariables>(CompaniesDocument, baseOptions)
}
export function useCompaniesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CompaniesQuery, CompaniesQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<CompaniesQuery, CompaniesQueryVariables>(CompaniesDocument, baseOptions)
}
export type CompaniesQueryHookResult = ReturnType<typeof useCompaniesQuery>
export type CompaniesLazyQueryHookResult = ReturnType<typeof useCompaniesLazyQuery>
export type CompaniesQueryResult = ApolloReactCommon.QueryResult<CompaniesQuery, CompaniesQueryVariables>
export const CompanyDocument = gql`
  query Company($id: String!) {
    company: infusionsoftCompany(companyId: $id) {
      ...InfusionsoftCompanyDetails
    }
  }
  ${InfusionsoftCompanyDetailsFragmentDoc}
`

/**
 * __useCompanyQuery__
 *
 * To run a query within a React component, call `useCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompanyQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCompanyQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CompanyQuery, CompanyQueryVariables>) {
  return ApolloReactHooks.useQuery<CompanyQuery, CompanyQueryVariables>(CompanyDocument, baseOptions)
}
export function useCompanyLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CompanyQuery, CompanyQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<CompanyQuery, CompanyQueryVariables>(CompanyDocument, baseOptions)
}
export type CompanyQueryHookResult = ReturnType<typeof useCompanyQuery>
export type CompanyLazyQueryHookResult = ReturnType<typeof useCompanyLazyQuery>
export type CompanyQueryResult = ApolloReactCommon.QueryResult<CompanyQuery, CompanyQueryVariables>
export const CreateCompanyDocument = gql`
  mutation CreateCompany($input: InfusionsoftCompanyInput!) {
    company: createInfusionsoftCompany(input: $input) {
      ...InfusionsoftCompanyDetails
    }
  }
  ${InfusionsoftCompanyDetailsFragmentDoc}
`
export type CreateCompanyMutationFn = ApolloReactCommon.MutationFunction<
  CreateCompanyMutation,
  CreateCompanyMutationVariables
>

/**
 * __useCreateCompanyMutation__
 *
 * To run a mutation, you first call `useCreateCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompanyMutation, { data, loading, error }] = useCreateCompanyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCompanyMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCompanyMutation, CreateCompanyMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreateCompanyMutation, CreateCompanyMutationVariables>(
    CreateCompanyDocument,
    baseOptions,
  )
}
export type CreateCompanyMutationHookResult = ReturnType<typeof useCreateCompanyMutation>
export type CreateCompanyMutationResult = ApolloReactCommon.MutationResult<CreateCompanyMutation>
export type CreateCompanyMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateCompanyMutation,
  CreateCompanyMutationVariables
>
export const UpdateCompanyDocument = gql`
  mutation UpdateCompany($id: String!, $input: InfusionsoftCompanyInput!) {
    company: updateInfusionsoftCompany(companyId: $id, input: $input) {
      ...InfusionsoftCompanyDetails
    }
  }
  ${InfusionsoftCompanyDetailsFragmentDoc}
`
export type UpdateCompanyMutationFn = ApolloReactCommon.MutationFunction<
  UpdateCompanyMutation,
  UpdateCompanyMutationVariables
>

/**
 * __useUpdateCompanyMutation__
 *
 * To run a mutation, you first call `useUpdateCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCompanyMutation, { data, loading, error }] = useUpdateCompanyMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCompanyMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCompanyMutation, UpdateCompanyMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateCompanyMutation, UpdateCompanyMutationVariables>(
    UpdateCompanyDocument,
    baseOptions,
  )
}
export type UpdateCompanyMutationHookResult = ReturnType<typeof useUpdateCompanyMutation>
export type UpdateCompanyMutationResult = ApolloReactCommon.MutationResult<UpdateCompanyMutation>
export type UpdateCompanyMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateCompanyMutation,
  UpdateCompanyMutationVariables
>
export const ContactsDocument = gql`
  query Contacts {
    contacts: infusionsoftContacts {
      ...InfusionsoftContactDetails
    }
  }
  ${InfusionsoftContactDetailsFragmentDoc}
`

/**
 * __useContactsQuery__
 *
 * To run a query within a React component, call `useContactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useContactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContactsQuery({
 *   variables: {
 *   },
 * });
 */
export function useContactsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<ContactsQuery, ContactsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<ContactsQuery, ContactsQueryVariables>(ContactsDocument, baseOptions)
}
export function useContactsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ContactsQuery, ContactsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<ContactsQuery, ContactsQueryVariables>(ContactsDocument, baseOptions)
}
export type ContactsQueryHookResult = ReturnType<typeof useContactsQuery>
export type ContactsLazyQueryHookResult = ReturnType<typeof useContactsLazyQuery>
export type ContactsQueryResult = ApolloReactCommon.QueryResult<ContactsQuery, ContactsQueryVariables>
export const ContactDocument = gql`
  query Contact($id: String!) {
    contact: infusionsoftContact(contactId: $id) {
      ...InfusionsoftContactDetails
    }
  }
  ${InfusionsoftContactDetailsFragmentDoc}
`

/**
 * __useContactQuery__
 *
 * To run a query within a React component, call `useContactQuery` and pass it any options that fit your needs.
 * When your component renders, `useContactQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContactQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useContactQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ContactQuery, ContactQueryVariables>) {
  return ApolloReactHooks.useQuery<ContactQuery, ContactQueryVariables>(ContactDocument, baseOptions)
}
export function useContactLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ContactQuery, ContactQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<ContactQuery, ContactQueryVariables>(ContactDocument, baseOptions)
}
export type ContactQueryHookResult = ReturnType<typeof useContactQuery>
export type ContactLazyQueryHookResult = ReturnType<typeof useContactLazyQuery>
export type ContactQueryResult = ApolloReactCommon.QueryResult<ContactQuery, ContactQueryVariables>
export const CreateContactDocument = gql`
  mutation CreateContact($input: InfusionsoftContactInput!) {
    contact: createInfusionsoftContact(input: $input) {
      ...InfusionsoftContactDetails
    }
  }
  ${InfusionsoftContactDetailsFragmentDoc}
`
export type CreateContactMutationFn = ApolloReactCommon.MutationFunction<
  CreateContactMutation,
  CreateContactMutationVariables
>

/**
 * __useCreateContactMutation__
 *
 * To run a mutation, you first call `useCreateContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createContactMutation, { data, loading, error }] = useCreateContactMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateContactMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateContactMutation, CreateContactMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreateContactMutation, CreateContactMutationVariables>(
    CreateContactDocument,
    baseOptions,
  )
}
export type CreateContactMutationHookResult = ReturnType<typeof useCreateContactMutation>
export type CreateContactMutationResult = ApolloReactCommon.MutationResult<CreateContactMutation>
export type CreateContactMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateContactMutation,
  CreateContactMutationVariables
>
export const UpdateContactDocument = gql`
  mutation UpdateContact($id: String!, $input: InfusionsoftContactInput!) {
    contact: updateInfusionsoftContact(contactId: $id, input: $input) {
      ...InfusionsoftContactDetails
    }
  }
  ${InfusionsoftContactDetailsFragmentDoc}
`
export type UpdateContactMutationFn = ApolloReactCommon.MutationFunction<
  UpdateContactMutation,
  UpdateContactMutationVariables
>

/**
 * __useUpdateContactMutation__
 *
 * To run a mutation, you first call `useUpdateContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContactMutation, { data, loading, error }] = useUpdateContactMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateContactMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateContactMutation, UpdateContactMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateContactMutation, UpdateContactMutationVariables>(
    UpdateContactDocument,
    baseOptions,
  )
}
export type UpdateContactMutationHookResult = ReturnType<typeof useUpdateContactMutation>
export type UpdateContactMutationResult = ApolloReactCommon.MutationResult<UpdateContactMutation>
export type UpdateContactMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateContactMutation,
  UpdateContactMutationVariables
>
export const InfusionsoftUserDocument = gql`
  query InfusionsoftUser {
    infusionsoftUser {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

/**
 * __useInfusionsoftUserQuery__
 *
 * To run a query within a React component, call `useInfusionsoftUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useInfusionsoftUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInfusionsoftUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useInfusionsoftUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<InfusionsoftUserQuery, InfusionsoftUserQueryVariables>,
) {
  return ApolloReactHooks.useQuery<InfusionsoftUserQuery, InfusionsoftUserQueryVariables>(
    InfusionsoftUserDocument,
    baseOptions,
  )
}
export function useInfusionsoftUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<InfusionsoftUserQuery, InfusionsoftUserQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<InfusionsoftUserQuery, InfusionsoftUserQueryVariables>(
    InfusionsoftUserDocument,
    baseOptions,
  )
}
export type InfusionsoftUserQueryHookResult = ReturnType<typeof useInfusionsoftUserQuery>
export type InfusionsoftUserLazyQueryHookResult = ReturnType<typeof useInfusionsoftUserLazyQuery>
export type InfusionsoftUserQueryResult = ApolloReactCommon.QueryResult<
  InfusionsoftUserQuery,
  InfusionsoftUserQueryVariables
>
export const CustomFieldsDocument = gql`
  query CustomFields {
    infusionsoftCompanyFields {
      ...ModelFieldGroupDetails
    }
    infusionsoftContactFields {
      ...ModelFieldGroupDetails
    }
    infusionsoftOpportunityFields {
      ...ModelFieldGroupDetails
    }
  }
  ${ModelFieldGroupDetailsFragmentDoc}
`

/**
 * __useCustomFieldsQuery__
 *
 * To run a query within a React component, call `useCustomFieldsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCustomFieldsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCustomFieldsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCustomFieldsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<CustomFieldsQuery, CustomFieldsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<CustomFieldsQuery, CustomFieldsQueryVariables>(CustomFieldsDocument, baseOptions)
}
export function useCustomFieldsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CustomFieldsQuery, CustomFieldsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<CustomFieldsQuery, CustomFieldsQueryVariables>(CustomFieldsDocument, baseOptions)
}
export type CustomFieldsQueryHookResult = ReturnType<typeof useCustomFieldsQuery>
export type CustomFieldsLazyQueryHookResult = ReturnType<typeof useCustomFieldsLazyQuery>
export type CustomFieldsQueryResult = ApolloReactCommon.QueryResult<CustomFieldsQuery, CustomFieldsQueryVariables>
export const CompanyFieldsDocument = gql`
  query CompanyFields {
    fields: infusionsoftCompanyFields {
      ...ModelFieldGroupDetails
    }
  }
  ${ModelFieldGroupDetailsFragmentDoc}
`

/**
 * __useCompanyFieldsQuery__
 *
 * To run a query within a React component, call `useCompanyFieldsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompanyFieldsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompanyFieldsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCompanyFieldsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<CompanyFieldsQuery, CompanyFieldsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<CompanyFieldsQuery, CompanyFieldsQueryVariables>(CompanyFieldsDocument, baseOptions)
}
export function useCompanyFieldsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CompanyFieldsQuery, CompanyFieldsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<CompanyFieldsQuery, CompanyFieldsQueryVariables>(
    CompanyFieldsDocument,
    baseOptions,
  )
}
export type CompanyFieldsQueryHookResult = ReturnType<typeof useCompanyFieldsQuery>
export type CompanyFieldsLazyQueryHookResult = ReturnType<typeof useCompanyFieldsLazyQuery>
export type CompanyFieldsQueryResult = ApolloReactCommon.QueryResult<CompanyFieldsQuery, CompanyFieldsQueryVariables>
export const ContactFieldsDocument = gql`
  query ContactFields {
    fields: infusionsoftContactFields {
      ...ModelFieldGroupDetails
    }
  }
  ${ModelFieldGroupDetailsFragmentDoc}
`

/**
 * __useContactFieldsQuery__
 *
 * To run a query within a React component, call `useContactFieldsQuery` and pass it any options that fit your needs.
 * When your component renders, `useContactFieldsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContactFieldsQuery({
 *   variables: {
 *   },
 * });
 */
export function useContactFieldsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<ContactFieldsQuery, ContactFieldsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<ContactFieldsQuery, ContactFieldsQueryVariables>(ContactFieldsDocument, baseOptions)
}
export function useContactFieldsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ContactFieldsQuery, ContactFieldsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<ContactFieldsQuery, ContactFieldsQueryVariables>(
    ContactFieldsDocument,
    baseOptions,
  )
}
export type ContactFieldsQueryHookResult = ReturnType<typeof useContactFieldsQuery>
export type ContactFieldsLazyQueryHookResult = ReturnType<typeof useContactFieldsLazyQuery>
export type ContactFieldsQueryResult = ApolloReactCommon.QueryResult<ContactFieldsQuery, ContactFieldsQueryVariables>
export const OpportunityFieldsDocument = gql`
  query OpportunityFields {
    fields: infusionsoftOpportunityFields {
      ...ModelFieldGroupDetails
    }
  }
  ${ModelFieldGroupDetailsFragmentDoc}
`

/**
 * __useOpportunityFieldsQuery__
 *
 * To run a query within a React component, call `useOpportunityFieldsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpportunityFieldsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpportunityFieldsQuery({
 *   variables: {
 *   },
 * });
 */
export function useOpportunityFieldsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<OpportunityFieldsQuery, OpportunityFieldsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<OpportunityFieldsQuery, OpportunityFieldsQueryVariables>(
    OpportunityFieldsDocument,
    baseOptions,
  )
}
export function useOpportunityFieldsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OpportunityFieldsQuery, OpportunityFieldsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<OpportunityFieldsQuery, OpportunityFieldsQueryVariables>(
    OpportunityFieldsDocument,
    baseOptions,
  )
}
export type OpportunityFieldsQueryHookResult = ReturnType<typeof useOpportunityFieldsQuery>
export type OpportunityFieldsLazyQueryHookResult = ReturnType<typeof useOpportunityFieldsLazyQuery>
export type OpportunityFieldsQueryResult = ApolloReactCommon.QueryResult<
  OpportunityFieldsQuery,
  OpportunityFieldsQueryVariables
>
export const NotesDocument = gql`
  query Notes($contactId: String!) {
    infusionsoftNotes(contactId: $contactId) {
      ...NoteDetails
    }
  }
  ${NoteDetailsFragmentDoc}
`

/**
 * __useNotesQuery__
 *
 * To run a query within a React component, call `useNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotesQuery({
 *   variables: {
 *      contactId: // value for 'contactId'
 *   },
 * });
 */
export function useNotesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<NotesQuery, NotesQueryVariables>) {
  return ApolloReactHooks.useQuery<NotesQuery, NotesQueryVariables>(NotesDocument, baseOptions)
}
export function useNotesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NotesQuery, NotesQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<NotesQuery, NotesQueryVariables>(NotesDocument, baseOptions)
}
export type NotesQueryHookResult = ReturnType<typeof useNotesQuery>
export type NotesLazyQueryHookResult = ReturnType<typeof useNotesLazyQuery>
export type NotesQueryResult = ApolloReactCommon.QueryResult<NotesQuery, NotesQueryVariables>
export const NoteTemplatesDocument = gql`
  query NoteTemplates {
    infusionsoftNoteTemplates
  }
`

/**
 * __useNoteTemplatesQuery__
 *
 * To run a query within a React component, call `useNoteTemplatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useNoteTemplatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNoteTemplatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useNoteTemplatesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<NoteTemplatesQuery, NoteTemplatesQueryVariables>,
) {
  return ApolloReactHooks.useQuery<NoteTemplatesQuery, NoteTemplatesQueryVariables>(NoteTemplatesDocument, baseOptions)
}
export function useNoteTemplatesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NoteTemplatesQuery, NoteTemplatesQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<NoteTemplatesQuery, NoteTemplatesQueryVariables>(
    NoteTemplatesDocument,
    baseOptions,
  )
}
export type NoteTemplatesQueryHookResult = ReturnType<typeof useNoteTemplatesQuery>
export type NoteTemplatesLazyQueryHookResult = ReturnType<typeof useNoteTemplatesLazyQuery>
export type NoteTemplatesQueryResult = ApolloReactCommon.QueryResult<NoteTemplatesQuery, NoteTemplatesQueryVariables>
export const CreateNoteDocument = gql`
  mutation CreateNote($input: InfusionsoftNoteInput!) {
    createInfusionsoftNote(input: $input) {
      ...NoteDetails
    }
  }
  ${NoteDetailsFragmentDoc}
`
export type CreateNoteMutationFn = ApolloReactCommon.MutationFunction<CreateNoteMutation, CreateNoteMutationVariables>

/**
 * __useCreateNoteMutation__
 *
 * To run a mutation, you first call `useCreateNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNoteMutation, { data, loading, error }] = useCreateNoteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateNoteMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateNoteMutation, CreateNoteMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreateNoteMutation, CreateNoteMutationVariables>(CreateNoteDocument, baseOptions)
}
export type CreateNoteMutationHookResult = ReturnType<typeof useCreateNoteMutation>
export type CreateNoteMutationResult = ApolloReactCommon.MutationResult<CreateNoteMutation>
export type CreateNoteMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateNoteMutation,
  CreateNoteMutationVariables
>
export const OpportunitiesDocument = gql`
  query Opportunities {
    opportunities: infusionsoftOpportunities {
      ...InfusionsoftOpportunityDetails
    }
  }
  ${InfusionsoftOpportunityDetailsFragmentDoc}
`

/**
 * __useOpportunitiesQuery__
 *
 * To run a query within a React component, call `useOpportunitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpportunitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpportunitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useOpportunitiesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<OpportunitiesQuery, OpportunitiesQueryVariables>,
) {
  return ApolloReactHooks.useQuery<OpportunitiesQuery, OpportunitiesQueryVariables>(OpportunitiesDocument, baseOptions)
}
export function useOpportunitiesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OpportunitiesQuery, OpportunitiesQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<OpportunitiesQuery, OpportunitiesQueryVariables>(
    OpportunitiesDocument,
    baseOptions,
  )
}
export type OpportunitiesQueryHookResult = ReturnType<typeof useOpportunitiesQuery>
export type OpportunitiesLazyQueryHookResult = ReturnType<typeof useOpportunitiesLazyQuery>
export type OpportunitiesQueryResult = ApolloReactCommon.QueryResult<OpportunitiesQuery, OpportunitiesQueryVariables>
export const OpportunityDocument = gql`
  query Opportunity($id: String!) {
    opportunity: infusionsoftOpportunity(opportunityId: $id) {
      ...InfusionsoftOpportunityDetails
    }
  }
  ${InfusionsoftOpportunityDetailsFragmentDoc}
`

/**
 * __useOpportunityQuery__
 *
 * To run a query within a React component, call `useOpportunityQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpportunityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpportunityQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOpportunityQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<OpportunityQuery, OpportunityQueryVariables>,
) {
  return ApolloReactHooks.useQuery<OpportunityQuery, OpportunityQueryVariables>(OpportunityDocument, baseOptions)
}
export function useOpportunityLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OpportunityQuery, OpportunityQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<OpportunityQuery, OpportunityQueryVariables>(OpportunityDocument, baseOptions)
}
export type OpportunityQueryHookResult = ReturnType<typeof useOpportunityQuery>
export type OpportunityLazyQueryHookResult = ReturnType<typeof useOpportunityLazyQuery>
export type OpportunityQueryResult = ApolloReactCommon.QueryResult<OpportunityQuery, OpportunityQueryVariables>
export const OpportunityStagesDocument = gql`
  query OpportunityStages {
    opportunityStages: infusionsoftOpportunityStages {
      id
      name
      stageCount
      stageOrder
      endStage
      isDefault
    }
  }
`

/**
 * __useOpportunityStagesQuery__
 *
 * To run a query within a React component, call `useOpportunityStagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpportunityStagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpportunityStagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useOpportunityStagesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<OpportunityStagesQuery, OpportunityStagesQueryVariables>,
) {
  return ApolloReactHooks.useQuery<OpportunityStagesQuery, OpportunityStagesQueryVariables>(
    OpportunityStagesDocument,
    baseOptions,
  )
}
export function useOpportunityStagesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OpportunityStagesQuery, OpportunityStagesQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<OpportunityStagesQuery, OpportunityStagesQueryVariables>(
    OpportunityStagesDocument,
    baseOptions,
  )
}
export type OpportunityStagesQueryHookResult = ReturnType<typeof useOpportunityStagesQuery>
export type OpportunityStagesLazyQueryHookResult = ReturnType<typeof useOpportunityStagesLazyQuery>
export type OpportunityStagesQueryResult = ApolloReactCommon.QueryResult<
  OpportunityStagesQuery,
  OpportunityStagesQueryVariables
>
export const CreateOpportunityDocument = gql`
  mutation CreateOpportunity($input: InfusionsoftOpportunityInput!) {
    opportunity: createInfusionsoftOpportunity(input: $input) {
      ...InfusionsoftOpportunityDetails
    }
  }
  ${InfusionsoftOpportunityDetailsFragmentDoc}
`
export type CreateOpportunityMutationFn = ApolloReactCommon.MutationFunction<
  CreateOpportunityMutation,
  CreateOpportunityMutationVariables
>

/**
 * __useCreateOpportunityMutation__
 *
 * To run a mutation, you first call `useCreateOpportunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOpportunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOpportunityMutation, { data, loading, error }] = useCreateOpportunityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOpportunityMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateOpportunityMutation, CreateOpportunityMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreateOpportunityMutation, CreateOpportunityMutationVariables>(
    CreateOpportunityDocument,
    baseOptions,
  )
}
export type CreateOpportunityMutationHookResult = ReturnType<typeof useCreateOpportunityMutation>
export type CreateOpportunityMutationResult = ApolloReactCommon.MutationResult<CreateOpportunityMutation>
export type CreateOpportunityMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateOpportunityMutation,
  CreateOpportunityMutationVariables
>
export const UpdateOpportunityDocument = gql`
  mutation UpdateOpportunity($id: String!, $input: InfusionsoftOpportunityInput!) {
    opportunity: updateInfusionsoftOpportunity(opportunityId: $id, input: $input) {
      ...InfusionsoftOpportunityDetails
    }
  }
  ${InfusionsoftOpportunityDetailsFragmentDoc}
`
export type UpdateOpportunityMutationFn = ApolloReactCommon.MutationFunction<
  UpdateOpportunityMutation,
  UpdateOpportunityMutationVariables
>

/**
 * __useUpdateOpportunityMutation__
 *
 * To run a mutation, you first call `useUpdateOpportunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOpportunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOpportunityMutation, { data, loading, error }] = useUpdateOpportunityMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOpportunityMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateOpportunityMutation, UpdateOpportunityMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateOpportunityMutation, UpdateOpportunityMutationVariables>(
    UpdateOpportunityDocument,
    baseOptions,
  )
}
export type UpdateOpportunityMutationHookResult = ReturnType<typeof useUpdateOpportunityMutation>
export type UpdateOpportunityMutationResult = ApolloReactCommon.MutationResult<UpdateOpportunityMutation>
export type UpdateOpportunityMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateOpportunityMutation,
  UpdateOpportunityMutationVariables
>
export const DeleteOpportunityDocument = gql`
  mutation DeleteOpportunity($id: String!) {
    opportunity: deleteInfusionsoftOpportunity(input: { opportunityId: $id }) {
      ...InfusionsoftOpportunityDetails
    }
  }
  ${InfusionsoftOpportunityDetailsFragmentDoc}
`
export type DeleteOpportunityMutationFn = ApolloReactCommon.MutationFunction<
  DeleteOpportunityMutation,
  DeleteOpportunityMutationVariables
>

/**
 * __useDeleteOpportunityMutation__
 *
 * To run a mutation, you first call `useDeleteOpportunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOpportunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOpportunityMutation, { data, loading, error }] = useDeleteOpportunityMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteOpportunityMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteOpportunityMutation, DeleteOpportunityMutationVariables>,
) {
  return ApolloReactHooks.useMutation<DeleteOpportunityMutation, DeleteOpportunityMutationVariables>(
    DeleteOpportunityDocument,
    baseOptions,
  )
}
export type DeleteOpportunityMutationHookResult = ReturnType<typeof useDeleteOpportunityMutation>
export type DeleteOpportunityMutationResult = ApolloReactCommon.MutationResult<DeleteOpportunityMutation>
export type DeleteOpportunityMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteOpportunityMutation,
  DeleteOpportunityMutationVariables
>
export const IntegrationsDocument = gql`
  query Integrations {
    integrations {
      ...IntegrationDetails
    }
  }
  ${IntegrationDetailsFragmentDoc}
`

/**
 * __useIntegrationsQuery__
 *
 * To run a query within a React component, call `useIntegrationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useIntegrationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIntegrationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useIntegrationsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<IntegrationsQuery, IntegrationsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<IntegrationsQuery, IntegrationsQueryVariables>(IntegrationsDocument, baseOptions)
}
export function useIntegrationsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IntegrationsQuery, IntegrationsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<IntegrationsQuery, IntegrationsQueryVariables>(IntegrationsDocument, baseOptions)
}
export type IntegrationsQueryHookResult = ReturnType<typeof useIntegrationsQuery>
export type IntegrationsLazyQueryHookResult = ReturnType<typeof useIntegrationsLazyQuery>
export type IntegrationsQueryResult = ApolloReactCommon.QueryResult<IntegrationsQuery, IntegrationsQueryVariables>
export const IntegrationDocument = gql`
  query Integration($provider: IntegrationProvider!) {
    integration(provider: $provider) {
      ...IntegrationDetails
    }
  }
  ${IntegrationDetailsFragmentDoc}
`

/**
 * __useIntegrationQuery__
 *
 * To run a query within a React component, call `useIntegrationQuery` and pass it any options that fit your needs.
 * When your component renders, `useIntegrationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIntegrationQuery({
 *   variables: {
 *      provider: // value for 'provider'
 *   },
 * });
 */
export function useIntegrationQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<IntegrationQuery, IntegrationQueryVariables>,
) {
  return ApolloReactHooks.useQuery<IntegrationQuery, IntegrationQueryVariables>(IntegrationDocument, baseOptions)
}
export function useIntegrationLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IntegrationQuery, IntegrationQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<IntegrationQuery, IntegrationQueryVariables>(IntegrationDocument, baseOptions)
}
export type IntegrationQueryHookResult = ReturnType<typeof useIntegrationQuery>
export type IntegrationLazyQueryHookResult = ReturnType<typeof useIntegrationLazyQuery>
export type IntegrationQueryResult = ApolloReactCommon.QueryResult<IntegrationQuery, IntegrationQueryVariables>
export const ExecuteIntegrationActionDocument = gql`
  mutation ExecuteIntegrationAction(
    $identityId: String!
    $provider: IntegrationProvider!
    $action: String!
    $params: JSON
  ) {
    executeIntegrationAction(identityId: $identityId, provider: $provider, action: $action, params: $params)
  }
`
export type ExecuteIntegrationActionMutationFn = ApolloReactCommon.MutationFunction<
  ExecuteIntegrationActionMutation,
  ExecuteIntegrationActionMutationVariables
>

/**
 * __useExecuteIntegrationActionMutation__
 *
 * To run a mutation, you first call `useExecuteIntegrationActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExecuteIntegrationActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [executeIntegrationActionMutation, { data, loading, error }] = useExecuteIntegrationActionMutation({
 *   variables: {
 *      identityId: // value for 'identityId'
 *      provider: // value for 'provider'
 *      action: // value for 'action'
 *      params: // value for 'params'
 *   },
 * });
 */
export function useExecuteIntegrationActionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ExecuteIntegrationActionMutation,
    ExecuteIntegrationActionMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<ExecuteIntegrationActionMutation, ExecuteIntegrationActionMutationVariables>(
    ExecuteIntegrationActionDocument,
    baseOptions,
  )
}
export type ExecuteIntegrationActionMutationHookResult = ReturnType<typeof useExecuteIntegrationActionMutation>
export type ExecuteIntegrationActionMutationResult = ApolloReactCommon.MutationResult<ExecuteIntegrationActionMutation>
export type ExecuteIntegrationActionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ExecuteIntegrationActionMutation,
  ExecuteIntegrationActionMutationVariables
>
