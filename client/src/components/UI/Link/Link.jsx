import { observer } from 'mobx-react-lite'
import React from 'react'
import styles from './Link.module.css'

const Link = (props) => {
  return <a className={styles.link}>{props.children}</a>
}

export default observer(Link)
