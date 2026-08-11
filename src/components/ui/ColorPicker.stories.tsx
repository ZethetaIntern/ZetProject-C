import type { Meta, StoryObj } from '@storybook/react';
import { ColorPicker } from './ColorPicker';
import React, { useState } from 'react';

const meta: Meta<typeof ColorPicker> = {
  title: 'UI/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {
  render: () => {
    const [color, setColor] = useState('#3b82f6');
    const [opacity, setOpacity] = useState(0.8);
    return (
      <div style={{ padding: '20px' }}>
        <ColorPicker 
          color={color} 
          onChange={setColor} 
          opacity={opacity} 
          onChangeOpacity={setOpacity} 
        />
        <div style={{ marginTop: '10px', fontSize: '12px' }}>
          Selected color: <strong style={{ color }}>{color}</strong>, Opacity: <strong>{opacity}</strong>
        </div>
      </div>
    );
  },
};
