import { Instance, SnapshotOut, types } from 'mobx-state-tree'

import { NavigationStoreModel } from '../../navigation/navigation-store'

export const UserModel = types.model({
  id: types.identifier,
  avatar: types.maybe(types.string),
  email: types.maybe(types.string),
  name: types.maybe(types.string),
})

/**
 * A RootStore model.
 */
export const RootStoreModel = types
  .model('RootStore')
  .props({
    navigationStore: types.optional(NavigationStoreModel, {}),
    currentToken: types.maybe(types.string),
    currentUser: types.maybe(UserModel),
    loggedIn: types.optional(types.boolean, false),
    accessToken: types.optional(types.string, ''),
  })
  .actions((self) => ({
    setUser(user) {
      self.currentUser = user
    },
    setAccessToken(token) {
      console.log(`setAccessToken: ${token}`)
      self.accessToken = token
    },
    setLoggedIn(loggedIn) {
      self.loggedIn = loggedIn
    },
    loginUser({ id, email, name, avatar }) {
      console.log('[RootStore]: Login User')
      this.setLoggedIn(true)
      this.setUser(Object.assign({ id, email, name, avatar }))
    },
    async logoutUser() {
      self.currentUser = undefined
      self.loggedIn = false
      // this.setUser(undefined)
      // this.setLoggedIn(false)
      console.log('[RootStore]: Logged out!')
    },
  }))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
