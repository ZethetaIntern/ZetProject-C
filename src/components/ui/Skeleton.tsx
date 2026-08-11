import React from 'react';

export interface SkeletonProps {
  variant?: 'text' | 'rect' | 'circle';
  width?: string | number;
  height?: string | number;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rect',
  width,
  height,
  className = '',
}) => {
  const styles: React.CSSProperties = {
    width: width,
    height: height,
  };

  const getShapeClass = () => {
    if (variant === 'circle') return 'rounded-full';
    if (variant === 'text') return 'rounded h-3 w-3/4';
    return 'rounded-md';
  };

  return (
    <div
      className={`shimmer-bg ${getShapeClass()} ${className}`}
      style={{
        ...styles,
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        minHeight: height || (variant === 'text' ? '12px' : '24px'),
      }}
      aria-hidden="true"
    />
  );
};

export default Skeleton;
