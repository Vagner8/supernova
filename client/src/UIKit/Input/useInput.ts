import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function useErrorMessage(messageError: string | undefined) {
  const [message, setMessage] = useState('');
  useEffect(() => {
    setMessage(messageError ? `- ${messageError}` : '');
  }, [messageError]);
  return message;
}

export function useActiveClass(
  value: string,
): ['active' | '', Dispatch<SetStateAction<'active' | ''>>] {
  const location = useLocation();
  const [activeClass, setActiveClass] = useState<'active' | ''>('');
  useEffect(() => setActiveClass(''), [location.pathname]);
  useEffect(() => {
    value && setActiveClass('active');
  }, [value]);
  return [activeClass, setActiveClass];
}
