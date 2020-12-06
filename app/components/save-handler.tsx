// import { rollbar } from '../app-rollbar'
import Toast from 'react-native-simple-toast'
import { Alert } from 'react-native'

export const saveHandler = async (data, errors, refetch, refetchVars, setSaving: (param: boolean) => void, dataType) => {
  if (data) {
    setSaving(false)
    await refetch(refetchVars)
    // rollbar.debug(`${dataType} Updated`, data)
    Toast.show(`${dataType} Updated`)
  }
  if (errors) {
    console.log('Errors Saving', errors)
    // rollbar.error(`Error saving ${dataType}`, errors)
    Alert.alert(
      `Error Saving ${dataType}`,
      errors.toString(),
      [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed')

          },
        },
      ],
      { cancelable: false },
    )
  }
}
