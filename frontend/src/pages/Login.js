import React from 'react'
import {Button, Col, Container, Form, Row} from "react-bootstrap"

const Login = () => {
  return (
    // div styling taken from stackoverflow, can adjust later
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}> 
        
        <Row>
          <h1>Admin login</h1>
          <Col lg={12} md={6} sm={12}>
            <Form>
              <Form.Group className="mb-3"controlID="formBasicEmail">
                <Form.Control type="email" placeholder="Enter Email"/>
              </Form.Group>
              <Form.Group className="mb-3" controlID="formBasicPassword">
                <Form.Control type="password" placeholder="Password"/>
              </Form.Group>
              <Button variant="primary btn-block" type="submit">Login</Button>
            </Form>
          </Col>
          <Col lg={4} md={6} sm={12}>
          </Col>
        </Row>
    </div>

  )
}

export default Login