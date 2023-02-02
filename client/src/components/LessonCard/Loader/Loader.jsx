import { observer } from 'mobx-react-lite'
import React from 'react'
import styles from './Loader.module.css'

const LessonCard = (props) => {
  const { widthLoader } = props

  return (
    <div className={styles.loader__wrapper}>
      <div className={styles.loader} style={{ width: widthLoader + '%' }}></div>
    </div>
  )
}

export default observer(LessonCard)
