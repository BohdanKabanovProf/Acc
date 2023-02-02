import { observer } from 'mobx-react-lite'
import React from 'react'
import { useContext } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Context } from '../..'
import LessonCard from '../LessonCard/LessonCard'
import styles from './Lessons.module.css'

const Lessons = () => {
  const array = [
    {
      title: 'Математика',
      load: 10,
    },
    {
      title: 'Математика 2',
      load: 0,
    },
    {
      title: 'Математика 3',
      load: 0,
    },
    {
      title: 'Математика 4',
      load: 0,
    },
    {
      title: 'Математика 5',
      load: 0,
    },
    {
      title: 'Математика 6',
      load: 0,
    },
    {
      title: 'Математика 7',
      load: 60,
    },
    {
      title: 'Математика 8',
      load: 25,
    },
  ]

  const { store } = useContext(Context)
  function ColorCard(array, theme, num) {
    if (num) {
      return array.map((e, index) => {
        if (index + 1 === num && store.user.roles.includes(2, 1)) {
          num += 3
          return (
            <LessonCard
              theme={theme}
              title={e.title}
              key={e.title}
              widthLoader={e.load}
            />
          )
        }
      })
    }
  }

  return (
    <Row>
      {console.log(store.user)}
      <Col xs={4}>{ColorCard(array, 'blue', 1)}</Col>
      <Col xs={4}>{ColorCard(array, 'yellow', 2)}</Col>
      <Col xs={4}>{ColorCard(array, 'red', 3)}</Col>
    </Row>
  )
}

export default observer(Lessons)
