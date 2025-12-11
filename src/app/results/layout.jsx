import { ContextProvider } from '../context';

export default function PlayLayout({ children }) {
  return (
    <ContextProvider>
      {children}
    </ContextProvider>
  );
}