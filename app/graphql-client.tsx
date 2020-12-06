import AsyncStorage from '@react-native-community/async-storage'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { createHttpLink } from 'apollo-link-http'
import { clearCredentials } from './app-auth'
import { AppConfig } from './app-config'

function createClient() {
  const errorLink = onError(({ networkError, graphQLErrors }) => {
    // @ts-ignore
    if (networkError && networkError && 'status' in networkError && networkError.status === 401) {
      console.log('Network Error')
      console.log('We should sign out!')
      clearCredentials()
    }

    if (networkError) {
      console.log(networkError)
      // console.error("Network Error", networkError)
    }

    if (graphQLErrors) {
      console.log(graphQLErrors)
      // console.error("graphQL Errors", graphQLErrors)
    }
  })

  const httpLink = errorLink.concat(createHttpLink())

  const authLink = setContext(async (_, { headers }) => {
    const token = await AsyncStorage.getItem('token')
    return {
      uri: AppConfig.apiUrl,
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  const link = authLink.concat(httpLink)

  return new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache(),
  })
}

export const apolloClient = () => {
  return createClient()
}
