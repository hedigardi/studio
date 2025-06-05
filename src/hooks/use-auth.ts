'use client';

// This file (use-auth.ts) was causing a parsing error because it contained JSX.
// The correct implementation with JSX is in use-auth.tsx.
// This file now re-exports everything from the .tsx file to ensure
// correct module resolution and prevent JSX parsing issues in a .ts file.

export * from './use-auth.tsx';
