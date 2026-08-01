import * as React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  circle = false,
  className = '',
  style,
  ...props
}) => {
  return (
    <div
      className={`animate-pulse bg-surface-elevated/80 border border-border-subtle/30 backdrop-blur-md transition-all ${
        circle ? 'rounded-full' : 'rounded-xl'
      } ${className}`}
      style={{
        width: width ?? '100%',
        height: height ?? '100%',
        ...style,
      }}
      {...props}
    />
  );
};
