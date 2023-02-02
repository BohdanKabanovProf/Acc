import { observer } from 'mobx-react-lite'
import React from 'react'
import { useContext } from 'react'
import { Context } from '../..'
import Avatar from '../UI/Avatar/Avatar'
import { Link } from 'react-router-dom'
import styles from './LeftNavigation.module.css'

const LeftNavigation = () => {
  const { store } = useContext(Context)
  return (
    <>
      <Avatar />
      <div>
        <nav className={styles.nav + ' ' + styles.nav_reset}>
          <ul>
            <li>
              <Link to="">Главная</Link>
            </li>
            <li>
              <Link to="/about">О нас</Link>
            </li>
            <li>
              <Link to="/users">Пользователи</Link>
            </li>
            <li>
              <button
                onClick={() => {
                  store.logout()
                }}
              >
                Выйти
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default observer(LeftNavigation)
