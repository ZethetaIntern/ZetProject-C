import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';
import React, { useState } from 'react';

const meta: Meta<typeof Toggle> = {
  title: 'UI/Toggle',
  component: Toggle,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Toggle checked={checked} onChange={setChecked} label="Toggle Setting Option" />;
  },
};

export const Disabled: Story = {
  args: {
    checked: true,
    disabled: true,
    label: "Disabled State Toggle",
    onChange: () => {},
  },
};
