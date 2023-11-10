import React from 'react';
import styles from './styles.module.scss'
export default ({children, className}) => 
  <span
    className={[styles.title, className].join(' ')}
  >{children}</span>
