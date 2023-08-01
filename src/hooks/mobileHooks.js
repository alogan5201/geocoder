import { useState, useEffect } from 'react';

export const useIsScrolledToBottom = (offset = 0) => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  const handleScroll = () => {
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - offset;

    setIsAtBottom(scrolledToBottom);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [offset]); // added offset as a dependency here

  return isAtBottom;
};
