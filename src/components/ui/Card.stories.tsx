import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import React from 'react';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    isCollapsed: { control: 'boolean' },
    showBorder: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: 'Card Title',
    children: <div style={{ minHeight: '100px' }}>This is the default card body content.</div>,
    footer: 'This is the card footer slot.',
  },
};

export const Collapsed: Story = {
  args: {
    title: 'Collapsed Card',
    isCollapsed: true,
    children: <div>This body should be hidden.</div>,
  },
};

export const Loading: Story = {
  args: {
    title: 'Loading Card Data',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ height: '14px', backgroundColor: 'var(--scrollbar-thumb)', width: '80%', borderRadius: '4px' }} className="shimmer-bg" />
        <div style={{ height: '14px', backgroundColor: 'var(--scrollbar-thumb)', width: '60%', borderRadius: '4px' }} className="shimmer-bg" />
        <div style={{ height: '14px', backgroundColor: 'var(--scrollbar-thumb)', width: '90%', borderRadius: '4px' }} className="shimmer-bg" />
      </div>
    ),
  },
};
