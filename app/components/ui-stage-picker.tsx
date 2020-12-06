import { Text } from 'native-base'
import * as React from 'react'
import { useState } from 'react'
import { Modal, View } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import SelectMultiple from 'react-native-select-multiple'
import { useOpportunityStagesQuery } from '../sdk'
import { ErrorCentered } from './error'
import { LoadingCentered } from './loading'
import { uiModalStyles } from './ui-modal-styles'

export interface UiStagePickerProps {
  currentStageIds: string[]
  saveStage: (stageIds: string[]) => void
}

export const UiStagePicker: React.FunctionComponent<UiStagePickerProps> = (props) => {
  const [isVisible, setVisibility] = useState(false)
  const [selectedStages, setSelectedStages] = useState<string[]>(
    props.currentStageIds?.length ? props.currentStageIds : [],
  )
  const { data, error, loading } = useOpportunityStagesQuery()

  if (loading) {
    return <LoadingCentered msg="Loading..." />
  }

  if (error) {
    return <ErrorCentered msg="Error loading stages" />
  }

  const { opportunityStages: stages } = data

  const items = stages.map((stage) => ({ value: stage.id, label: stage.name }))
  const label = 'Select Stages'

  const showModal = () => setVisibility(true)
  const hideModal = () => {
    setVisibility(false)
    props.saveStage(selectedStages)
  }
  const clearFilters = () => {
    hideModal()
    setSelectedStages([])
  }
  const onSelectedItemsChange = (items) => {
    const values = items.map((item) => item.value)
    setSelectedStages(values)
  }

  return (
    <View style={{ width: '100%' }}>
      <Text onPress={showModal} style={{ marginTop: 10 }}>
        {label} {selectedStages?.length ? `(${selectedStages.length} selected)` : null}
      </Text>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={uiModalStyles.centeredView}>
          <View style={uiModalStyles.modalView}>
            <SelectMultiple items={items} selectedItems={selectedStages} onSelectionsChange={onSelectedItemsChange} />

            <View style={{ flexDirection: 'row' }}>
              <TouchableHighlight
                style={{ ...uiModalStyles.openButton, backgroundColor: '#4f2d7f', margin: 15, width: 120 }}
                onPress={() => hideModal()}
              >
                <Text style={{ ...uiModalStyles.textStyle, color: 'white' }}>Select</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...uiModalStyles.openButton, backgroundColor: '#4f2d7f', margin: 15, width: 120 }}
                onPress={() => clearFilters()}
              >
                <Text style={{ ...uiModalStyles.textStyle, color: 'white' }}>Clear</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}
