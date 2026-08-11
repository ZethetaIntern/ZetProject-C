import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Toggle from '../components/ui/Toggle';
import Tabs from '../components/ui/Tabs';
import Tooltip from '../components/ui/Tooltip';
import Skeleton from '../components/ui/Skeleton';
import SearchInput from '../components/ui/SearchInput';
import ColorPicker from '../components/ui/ColorPicker';
import Dropdown from '../components/ui/Dropdown';
import Modal from '../components/ui/Modal';
import ErrorBoundaryUI from '../components/ui/ErrorBoundaryUI';
import DataTable from '../components/ui/DataTable';

describe('UI Reusable Components', () => {
  it('Badge', () => {
    const handleRemove = vi.fn();
    render(<Badge variant="success" onRemove={handleRemove} count={5}>Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Remove badge'));
    expect(handleRemove).toHaveBeenCalled();
  });

  it('Button', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} isLoading={false}>Submit</Button>);
    const btn = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalled();
  });

  it('Card', () => {
    const handleToggle = vi.fn();
    render(
      <Card title="Card Title" onToggleCollapse={handleToggle} isCollapsed={false}>
        Body
      </Card>
    );
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('Toggle', () => {
    const handleChange = vi.fn();
    render(<Toggle checked={false} onChange={handleChange} label="Switch" />);
    const switchInput = screen.getByRole('switch');
    fireEvent.click(switchInput);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('Tabs', () => {
    const handleChange = vi.fn();
    const items = [
      { id: '1', label: 'Tab 1' },
      { id: '2', label: 'Tab 2' },
    ];
    render(<Tabs items={items} activeId="1" onChange={handleChange} />);
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    fireEvent.click(tab2);
    expect(handleChange).toHaveBeenCalledWith('2');
  });

  it('Tooltip', () => {
    render(
      <Tooltip content="Tooltip Help Info" position="top">
        <span>Hover</span>
      </Tooltip>
    );
    const trigger = screen.getByText('Hover');
    fireEvent.mouseEnter(trigger);
    expect(screen.getByRole('tooltip')).toHaveTextContent('Tooltip Help Info');
  });

  it('Skeleton', () => {
    const { container } = render(<Skeleton variant="rect" width="100px" height="10px" />);
    expect(container.firstChild).toHaveClass('shimmer-bg');
  });

  it('SearchInput', () => {
    const handleChange = vi.fn();
    render(<SearchInput value="" onChange={handleChange} suggestions={['AAPL', 'MSFT']} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'A' } });
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    
    // Test select suggestion
    const opt = screen.getByText('AAPL');
    fireEvent.click(opt);
    expect(handleChange).toHaveBeenCalledWith('AAPL');
  });

  it('ColorPicker', () => {
    const handleChange = vi.fn();
    const handleOpacityChange = vi.fn();
    render(
      <ColorPicker 
        color="#3b82f6" 
        onChange={handleChange} 
        presets={['#3b82f6', '#10b981']}
        opacity={0.8} 
        onChangeOpacity={handleOpacityChange} 
      />
    );
    expect(screen.getByRole('textbox')).toHaveValue('#3b82f6');
    
    // Toggle presets dropdown
    const colorBtn = screen.getByLabelText('Choose color');
    fireEvent.click(colorBtn);
    expect(screen.getByText('Presets')).toBeInTheDocument();

    // Click preset swatch
    const greenPreset = screen.getByLabelText('Select #10b981');
    fireEvent.click(greenPreset);
    expect(handleChange).toHaveBeenCalledWith('#10b981');

    // Change input value
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '#10b981' } });
    expect(handleChange).toHaveBeenCalledWith('#10b981');

    // Change opacity range slider
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '0.9' } });
    expect(handleOpacityChange).toHaveBeenCalledWith(0.9);
  });

  it('Dropdown', () => {
    const handleChange = vi.fn();
    const opts = [
      { value: '1', label: 'Option 1', group: 'Equities' },
      { value: '2', label: 'Option 2', group: 'Equities' },
    ];
    render(<Dropdown options={opts} value="1" onChange={handleChange} isSearchable />);
    
    // Click trigger button to open
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    // Enter search text
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Option 2' } });

    // Select option
    const opt2 = screen.getByRole('option', { name: 'Option 2' });
    fireEvent.click(opt2);
    expect(handleChange).toHaveBeenCalledWith('2');
  });

  it('Modal', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Modal Title">
        Content
      </Modal>
    );
    expect(screen.getByText('Modal Title')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Close dialog'));
    expect(handleClose).toHaveBeenCalled();
  });

  it('ErrorBoundaryUI', () => {
    const handleReset = vi.fn();
    render(<ErrorBoundaryUI error={new Error('Crash')} resetError={handleReset} variant="widget" />);
    expect(screen.getByText('Widget Load Failure')).toBeInTheDocument();
    expect(screen.getByText('Crash')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Retry/i }));
    expect(handleReset).toHaveBeenCalled();
  });

  it('DataTable interaction sorting and paging', () => {
    const cols = [
      { key: 'ticker', header: 'Ticker', sortable: true },
      { key: 'price', header: 'Price', sortable: true },
    ];
    const data = [
      { ticker: 'AAPL', price: 150 },
      { ticker: 'MSFT', price: 300 },
      { ticker: 'NVDA', price: 800 },
    ];
    render(<DataTable columns={cols} data={data} pageSize={2} />);
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('MSFT')).toBeInTheDocument();
    expect(screen.queryByText('NVDA')).not.toBeInTheDocument(); // Paginated out

    // Check pagination navigation click
    const nextBtn = screen.getByRole('button', { name: 'Next' });
    fireEvent.click(nextBtn);
    expect(screen.getByText('NVDA')).toBeInTheDocument();

    // Check column sorting click
    const tickerHeader = screen.getByText('Ticker');
    fireEvent.click(tickerHeader); // Sorts list
  });
});
