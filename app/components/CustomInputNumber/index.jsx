import React, {useCallback, useState, useRef} from 'react';
import styles from './styles.module.scss'
import useLongPress from './hooks/useLongPress.js'
import useEvent from './hooks/useEvent.js'
import {isExceed, isDeceed, isInRange} from './utils'

export default ({
  min = 0,
  max = 99,
  step = 1,
  name,
  value = 0,
  onChange = () => {},
  onBlur,
  disabled = false,
}) => {
  const [currentVal, setCurrentVal] = useState((n) => n || value)
  const elementRef = useRef(null)
  const emitEvent = useEvent(elementRef, 'onChange', onChange)
  const isPressing = useRef(false)

  const validateDecimal = useCallback((current) => {
      if (isExceed(max, current)) { return max }
      if (isDeceed(min, current)) { return min }
      const result = isInRange(min, max, current) ? current : min
      return result
  }, [min, max])


  const handleOnChange = useCallback((nextVal = '') => {
    const nextNumber = Number(nextVal?.match(/^-?\d+/g)?.join('') || value)
    const result = validateDecimal(nextNumber)
    
    if (currentVal === result.toString()) { return }
    setCurrentVal(result.toString())
    elementRef.current.value = result.toString()
    emitEvent()
  }, [currentVal, validateDecimal, onChange, emitEvent])


  const addButtonActions = useLongPress({
    callback: () => handleOnChange((Number(currentVal) + step).toString()),
    ms: 250,
    onStart: () => isPressing.current = true,
    onEnd: () => setTimeout(() => isPressing.current = false, 0),
  })

  const minusButtonActions = useLongPress({
    callback: () => handleOnChange((Number(currentVal) - step).toString()),
    ms: 250,
    onStart: () => isPressing.current = true,
    onEnd: () => setTimeout(() => isPressing.current = false, 0),
  })


  return (
    <div className={styles['custom-input-number']}>
      <button
        disabled={currentVal <= min || disabled}
        {...minusButtonActions}
      ><i className='fa fa-minus'/></button>
      <input
        ref={elementRef}
        name={name}
        autoComplete="off"
        value={currentVal}
        type='number'
        pattern='\d*'
        min={min}
        max={max}
        onChange={(e) => { handleOnChange(e.target.value); }}
        onBlur={onBlur}
        disabled={disabled}
      />
      <button
        disabled={currentVal >= max || disabled}
        {...addButtonActions}
      ><i className='fa fa-plus'/></button>
    </div>
  )
}