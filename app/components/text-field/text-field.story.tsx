/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */

import { storiesOf } from '@storybook/react-native'
import * as React from 'react'
import { Text } from '../'
import { Story, StoryScreen, UseCase } from '../../../storybook/views'

declare let module

storiesOf('TextField', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add('Ref Forwarding', () => (
    <Story>
      <UseCase text="Ref Forwarding" usage="">
        <Text text="* attention designers:  i am so sorry" preset="secondary" />
      </UseCase>
    </Story>
  ))
