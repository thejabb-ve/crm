'use client';
import { useEffect } from 'react';
import { validateSession } from '@/functions/server';
import { Events } from 'jabb-astro-components';

export default function ValidateSession() {
  useEffect(() => {
    Events.Utils.show('loading', true);
    validateSession();
    Events.Utils.show('loading', false);
  }, []);
  return <></>;
}
