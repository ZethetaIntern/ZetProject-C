import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import React from 'react';

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Top: Story = {
  args: {
    content: 'Tooltip text content',
    position: 'top',
    children: <button className="px-4 py-2 border rounded border-[var(--border-color)]">Hover Top</button>,
  },
};

export const Bottom: Story = {
  args: {
    content: 'Tooltip text content',
    position: 'bottom',
    children: <button className="px-4 py-2 border rounded border-[var(--border-color)]">Hover Bottom</button>,
  },
};

export const Left: Story = {
  args: {
    content: 'Tooltip text content',
    position: 'left',
    children: <button className="px-4 py-2 border rounded border-[var(--border-color)]">Hover Left</button>,
  },
};

export const Right: Story = {
  args: {
    content: 'Tooltip text content',
    position: 'right',
    children: <button className="px-4 py-2 border rounded border-[var(--border-color)]">Hover Right</button>,
  },
};
