import { Picker } from 'native-base'
import * as React from 'react'

export interface SortFilter {
  key: string
  dir: 'asc' | 'desc'
  label: string
}

export interface UiSortPickerProps {
  filters: SortFilter[]
  currentFilter: SortFilter
  selectFilter: (filter: SortFilter) => void
}

export const UiSortPicker: React.FunctionComponent<UiSortPickerProps> = (props) => {
  const filters = props.filters
  const selectNewSort = (filter: SortFilter) => {
    return props.selectFilter(filter)
  }

  const pickerItems = filters.map((filter) => <Picker.Item key={filter?.label} label={filter.label} value={filter} />)

  return (
    <Picker
      inlineLabel={true}
      placeholder="Sort Order"
      mode="dropdown"
      iosHeader="Select Sort Order"
      selectedValue={props.currentFilter}
      onValueChange={(contact) => selectNewSort(contact)}
    >
      {pickerItems}
    </Picker>
  )
}
