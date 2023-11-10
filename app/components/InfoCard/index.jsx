import React from 'react'
import styles from './styles.module.scss'

export default ({children, className}) => {
  if (!children) { return null }

  return (
    <div className={[styles['info-card'], className].join(' ')}>
      {children}
    </div>
  )
}