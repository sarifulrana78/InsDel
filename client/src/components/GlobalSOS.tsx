"use client";

import React from 'react';
import SOSButton from './SOSButton';
import { useApp } from '@/context/AppContext';

export default function GlobalSOS() {
  const { language } = useApp();
  return <SOSButton language={language} />;
}
