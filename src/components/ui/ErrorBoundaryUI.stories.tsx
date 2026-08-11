import type { Meta, StoryObj } from '@storybook/react';
import { ErrorBoundaryUI } from './ErrorBoundaryUI';
import React from 'react';

const meta: Meta<typeof ErrorBoundaryUI> = {
  title: 'UI/ErrorBoundaryUI',
  component: ErrorBoundaryUI,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ErrorBoundaryUI>;

const mockError = new Error('Database connection failed: ETIMEDOUT at socket (net.js:847)');

export const WidgetError: Story = {
  args: {
    error: mockError,
    resetError: () => alert('Widget reset!'),
    variant: 'widget',
  },
};

export const PageError: Story = {
  args: {
    error: mockError,
    resetError: () => alert('Reload page!'),
    variant: 'page',
  },
};

export const NetworkError: Story = {
  args: {
    error: new Error('WebSocket connection closed cleanly by remote peer.'),
    resetError: () => alert('Reconnect!'),
    variant: 'network',
  },
};
