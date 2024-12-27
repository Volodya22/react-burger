import { useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { ReactPortalProps } from '../../models';

export default function ReactPortal(props: ReactPortalProps) {
  const [wrapperElement, setWrapperElement] = useState<Element | null>(null);

  useLayoutEffect(() => {
    const element: Element = document.getElementById(props.wrapperId)!;

    setWrapperElement(element);
  }, [props.wrapperId]);

  if (wrapperElement === null) return null;

  return createPortal(props.children, wrapperElement);
};
