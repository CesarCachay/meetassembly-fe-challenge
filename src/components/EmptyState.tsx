'use client';
// vendors
import * as React from 'react';
import { Frown } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({
  title = 'No photos found',
  description = 'Try a different search or come back later.',
}: EmptyStateProps) {
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center p-8 text-center">
      <Frown className="mb-4 h-12 w-12 text-muted-foreground" />
      <h2 className="mb-2 text-xl font-semibold">{title}</h2>
      <p className="mb-6 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
