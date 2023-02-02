import { observer } from 'mobx-react-lite'
import React from 'react'
import styles from './Message.module.css'

const Message = ({ children, errors }) => (
  <div className={styles.message}>
    {children}:{errors?.response?.data?.message}
  </div>
)

export default observer(Message)
