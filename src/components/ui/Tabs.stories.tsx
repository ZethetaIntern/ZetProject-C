import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import React, { useState } from 'react';

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const items = [
  { id: 'all', label: 'All Hold' },
  { id: 'eq', label: 'Equities Only' },
  { id: 'fi', label: 'Fixed Income Only' },
];

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState('all');
    return <Tabs items={items} activeId={active} onChange={setActive} />;
  },
};
