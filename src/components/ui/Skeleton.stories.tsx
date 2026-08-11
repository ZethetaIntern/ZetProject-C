import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';
import React from 'react';

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = {
  args: {
    variant: 'text',
    width: '100%',
  },
};

export const Rectangular: Story = {
  args: {
    variant: 'rect',
    width: '150px',
    height: '80px',
  },
};

export const Circular: Story = {
  args: {
    variant: 'circle',
    width: '50px',
    height: '50px',
  },
};
