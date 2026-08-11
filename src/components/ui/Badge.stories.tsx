import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import React from 'react';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Success: Story = {
  args: {
    children: 'Active Trade',
    variant: 'success',
  },
};

export const Danger: Story = {
  args: {
    children: 'High VaR Limit',
    variant: 'danger',
  },
};

export const Warning: Story = {
  args: {
    children: 'Stale Data Feed',
    variant: 'warning',
  },
};

export const Info: Story = {
  args: {
    children: 'Real-time Subscribed',
    variant: 'info',
  },
};

export const Removable: Story = {
  args: {
    children: 'Removable Asset Filter',
    variant: 'neutral',
    onRemove: () => alert('Removed!'),
  },
};
