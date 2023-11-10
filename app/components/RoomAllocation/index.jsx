import React, { useMemo , useState, useRef} from 'react'

import Room from './Room/index.jsx'
import Title from '../Title/index.jsx'
import InfoCard from '../InfoCard/index.jsx'
import styles from './styles.module.scss'

const shape = { adult: 1, child: 0 }
export default ({
  guest = 0,
  room = 0,
  onChange = () => null
}) => {
  const [result, setResult] = useState(Array(room).fill({...shape}))

  const handleOnChange = (index, value) => {
    setResult(prevState => {
      const nextValue = [...prevState]
      nextValue[index] = {...value}
      onChange(nextValue)
      return nextValue
    })
  }

  const total = useMemo(() => {
    return result.reduce((acc, curr) => {
      return acc + curr.adult + curr.child
    }, 0)
  }, [result])

  return (
    <div className={styles['room-allocation']}>
      <Title>住客人數: {guest} 人/ {room} 房</Title>
      <InfoCard className={styles['info-card']}>尚未分配人數: {guest - total} 人</InfoCard>
      {
        result.map((e, ei) => {
          return (
            <Room
              namePrepend={`room-${ei}-`}
              className={styles.room}
              key={`room-${ei}`}
              disabled={total >= guest}
              value={e}
              onChange={(v) => handleOnChange(ei, v)}
              restGuest={guest - total}
            />
          )
        })
      }
    </div>
  )
}