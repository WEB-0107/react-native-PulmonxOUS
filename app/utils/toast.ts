import { Toast } from 'native-base'

export const toast = {
  show: (message, duration = 2500, onClose?) => {
    Toast.show({
      text: message,
      duration,
      position: 'bottom',
      textStyle: { textAlign: 'center' },
      onClose,
    })
  },
}
