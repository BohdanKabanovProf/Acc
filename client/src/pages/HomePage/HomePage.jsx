import { observer } from 'mobx-react-lite'
import React from 'react'
import { useContext } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Context } from '../..'
import LeftNavigation from '../../components/Menu/LeftNavigation'
import { Routes, Route } from 'react-router-dom'
import Lessons from '../../components/Lessons/Lessons'

const HomePage = () => {
  const { store } = useContext(Context)
  return (
    <Container>
      <Row className="mt-5 mb-5">
        <Col xl={2}></Col>
        <Col xl={10}>{store.user.first_name + ' ' + store.user.last_name}</Col>
      </Row>
      <Row>
        <Col xl={2}>
          <LeftNavigation />
        </Col>
        <Col xl={10}>
          <Routes>
            <Route path="" element={<Lessons />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  )
}

export default observer(HomePage)
