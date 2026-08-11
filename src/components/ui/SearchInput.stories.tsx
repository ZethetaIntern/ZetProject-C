import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from './SearchInput';
import React, { useState } from 'react';

const meta: Meta<typeof SearchInput> = {
  title: 'UI/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return <SearchInput value={val} onChange={setVal} placeholder="Search tickers..." />;
  },
};

export const WithSuggestions: Story = {
  render: () => {
    const [val, setVal] = useState('');
    const list = ['AAPL', 'AMZN', 'MSFT', 'UST10Y', 'BTCUSD', 'EURUSD'];
    return (
      <SearchInput 
        value={val} 
        onChange={setVal} 
        suggestions={list} 
        placeholder="Type a ticker (e.g. A)..." 
      />
    );
  },
};
