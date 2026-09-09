'use client';

import { cn } from 'cnfast';
import type React from 'react';
import type { ReactNode } from 'react';

interface Props extends React.ComponentProps<'button'> {
  title: string;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
}

export function Button({ className, title, leftIcon, rightIcon, ...props }: Props) {
  return (
    <button
      type="button"
      className={cn(
        'group relative z-10 font-medium w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black',
        className,
      )}
      {...props}
    >
      {leftIcon}
      <span className="relative inline-flex overflow-hidden font-general text-sm uppercase">
        <div className="translate-y-0 skew-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-12">
          {title}
        </div>
        <div className="absolute translate-y-[164%] skew-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </div>
      </span>
      {rightIcon}
    </button>
  );
}
