'use client';
import { useEffect } from 'react';
import { validateSession } from '@/functions/server';

export default function ValidateSession() {
  useEffect(() => {
    validateSession();
  }, []);
  return <></>;
}
