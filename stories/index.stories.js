import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobsOptions, text } from '@storybook/addon-knobs/react';

import Ticker from '../lib/index';

const stories = storiesOf('Storybook', module);

stories.addDecorator(withKnobsOptions({
  debounce: { wait: 200, leading: false }, // Same as lodash debounce.
  timestamps: true // Doesn't emit events while user is typing.
}));

stories.add('Ticker (static)', () => <Ticker text="123.44" textClassName="text" />);

stories.add('Ticker (with Knobs)', () => <Ticker text={text('ticker text', '123.456')} textClassName="text" />);
