import { useState, useEffect, useCallback, useRef } from 'react';

export default function useLongPress({
  callback = () => {},
  ms = 300,
  onStart= () => {},
  onEnd= () => {}
}) {
  const [startLongPress, setStartLongPress] = useState(false);
  const ref = useRef({
    timer: null,
    callback,
    firstTimeCalled: false
  })

  useEffect(() => {
    if (startLongPress) {
      ref.current.firstTimeCalled = false
      const setter = () => {
        ref.current.timer = setTimeout(() => {
          if (startLongPress) {
            ref.current.callback?.()
            ref.current.firstTimeCalled = true
            setter()
          }
        }, ms);
      }

      setter()
      
    } else {
      if (ref.current.timer) {
        clearTimeout(ref.current.timer);
        if (!ref.current.firstTimeCalled) {ref.current.callback?.()}
      }
    }

    return () => {
      clearTimeout(ref.current.timer);
    };
  }, [startLongPress]);

  useEffect(() => {ref.current.callback = callback}, [callback])

  const start = useCallback(() => { setStartLongPress(true); onStart() }, []);
  const stop = useCallback(() => { setStartLongPress(false); onEnd() }, []);

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  };
}