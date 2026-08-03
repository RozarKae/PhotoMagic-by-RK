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
      className={`animate-pulse bg-[#1D1D1D] border border-white/5 backdrop-blur-md relative overflow-hidden ${
        circle ? 'rounded-full' : 'rounded-lg'
      } ${className}`}
      style={{
        width: width ?? '100%',
        height: height ?? '100%',
        ...style,
      }}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
    </div>
  );
};

export const FilmCountdownLoader: React.FC<{ label?: string }> = ({ label = 'LOADING SCENE' }) => {
  const [count, setCount] = React.useState(3);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => (prev > 1 ? prev - 1 : 3));
    }, 800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-4 select-none">
      <div className="relative w-20 h-20 rounded-full border-2 border-gold-500/40 flex items-center justify-center bg-[#141414] shadow-kodakGlow">
        <div
          className="absolute inset-1 rounded-full border border-dashed border-gold-500/30 animate-spin"
          style={{ animationDuration: '6s' }}
        />
        <div className="w-px h-full bg-gold-500/20 absolute top-0" />
        <div className="h-px w-full bg-gold-500/20 absolute left-0" />
        <span className="font-hero text-3xl font-bold text-gold-400 font-mono tracking-widest z-10 transition-all duration-300">
          {count}
        </span>
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-silver/70">
        {label}
      </span>
    </div>
  );
};
