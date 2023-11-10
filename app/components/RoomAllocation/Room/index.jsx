import React, {useCallback, useEffect, useState} from 'react';
import styles from './styles.module.scss'
import CustomInputNumber from '../../CustomInputNumber/index.jsx';
import Title from '../../Title/index.jsx'

const shape = { adult: 1, child: 0 }

export default ({
  value = {...shape},
  disabled = false,
  onChange = () => null,
  className,
  restGuest = 0,
  namePrepend = '',
}) => {
  const [allocation, setAllocation] = useState({ ...shape, ...value })

  const handleOnChange = useCallback((type, count) => {
    const nextValue = {
      ...allocation,
      ...{ [type]: Number(count) }
    }

    onChange(nextValue)
    setAllocation(nextValue)
  }, [allocation])

  const summation = allocation.child + allocation.adult

  useEffect(() => { setAllocation(value) }, [value])

  const maxOfAdult = allocation.adult + restGuest >= 4 ? allocation.adult + (4 - summation) : allocation.adult + restGuest
  const maxOfChild = allocation.child + restGuest >= 4 ? allocation.child + (4 - summation) : allocation.child + restGuest

  return (
    <div className={[styles.room, className].join(' ')}>
      <Title className={styles['room-title']}>
        房間: {summation} 人
      </Title>
      <div className={styles.unit}>
        <div className={styles.category}>
          <span className={styles.title}>大人</span>
          <span className={styles.subtitle}>年齡 20+</span>
        </div>
        <CustomInputNumber
          name={namePrepend + 'adult'}
          value={allocation.adult}
          min={1}
          max={maxOfAdult}
          className={styles['custom-input-number']}
          onChange={e => {
            handleOnChange('adult', e.target.value)
            console.log('onChange', e)
          }}
          onBlur={e => console.log('onBlur', e)}
          disabled={disabled}
        />
      </div>
      <div className={styles.unit}>
        <div className={styles.category}>
          <span className={styles.title}>小孩</span>
        </div>
        <CustomInputNumber
          name={namePrepend + 'child'}
          value={allocation.child}
          max={maxOfChild}
          className={styles['custom-input-number']}
          onChange={e => {
            handleOnChange('child', e.target.value)
            console.log('onChange', e)
          }}
          onBlur={e => console.log('onBlur', e)}
          disabled={disabled}
        />
      </div>
    </div>
  )
}