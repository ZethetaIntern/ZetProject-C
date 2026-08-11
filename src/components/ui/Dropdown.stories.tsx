import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';
import React, { useState } from 'react';

const meta: Meta<typeof Dropdown> = {
  title: 'UI/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const options = [
  { value: 'sp500', label: 'S&P 500 Index', group: 'Equities' },
  { value: 'nasdaq', label: 'Nasdaq 100 Index', group: 'Equities' },
  { value: 'ust10y', label: 'US 10-Year Treasury', group: 'Bonds' },
  { value: 'ust2y', label: 'US 2-Year Treasury', group: 'Bonds' },
  { value: 'gold', label: 'Gold Spot', group: 'Commodities' },
  { value: 'oil', label: 'Crude Oil', group: 'Commodities' },
];

export const Single: Story = {
  render: () => {
    const [val, setVal] = useState('sp500');
    return <Dropdown options={options} value={val} onChange={setVal} />;
  },
};

export const Multi: Story = {
  render: () => {
    const [val, setVal] = useState(['sp500', 'ust10y']);
    return <Dropdown options={options} value={val} onChange={setVal} isMulti />;
  },
};

export const Searchable: Story = {
  render: () => {
    const [val, setVal] = useState('gold');
    return <Dropdown options={options} value={val} onChange={setVal} isSearchable placeholder="Search assets..." />;
  },
};
