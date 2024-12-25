'use client';

import React, { FC } from 'react';
import Image from 'next/image';
import { Button, ButtonProps } from './button';

interface IconButtonProps extends ButtonProps {
  label: string;
  icon: string;
}

export const IconButton: FC<IconButtonProps> = ({
  label,
  icon,
  ...buttonProps
}) => {
  return (
    <Button {...buttonProps}>
      <div className="flex items-center">
        <span className="mr-2 text-base">{label}</span>
        <Image
          src={icon}
          alt={`${label} icon`}
          width={24}
          height={24}
          className="h-6 w-6"
        />
      </div>
    </Button>
  );
};
