'use client';

import { ContextProvider } from '../../../Context';

export default function MainLayout({ children }) {
  return <ContextProvider>{children}</ContextProvider>;
}
