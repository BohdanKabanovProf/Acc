import { observer } from 'mobx-react-lite'
import React from 'react'
import styles from './LessonCard.module.css'
import classNames from 'classnames'
import Loader from './Loader/Loader'

const LessonCard = (props) => {
  const { title, theme, widthLoader } = props

  return (
    <div
      className={classNames(
        styles['card__theme_' + theme],
        styles.card,
        'd-flex justify-content-between align-items-start flex-column',
      )}
    >
      <span className={styles.card__title}>{title}</span>
      <Loader widthLoader={widthLoader} />
    </div>
  )
}

export default observer(LessonCard)
