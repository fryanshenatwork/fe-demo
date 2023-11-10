import {useEffect} from 'react';

export default (
  ref,
  name,
  callback
) => {
  useEffect(() => {
    ref.current?.addEventListener(name, callback);
    return () => ref.current?.removeEventListener(name, callback);
  }, [ref.current, name, callback]);
  
  return () => ref.current?.dispatchEvent(new Event(name));
}