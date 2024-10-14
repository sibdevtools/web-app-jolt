import React, { useRef, useState } from 'react';
import { InputJson, InputJsonHandle } from './InputJson';
import { OutputJson } from './OutputJson';
import { Alert, Col, Container, Row } from 'react-bootstrap';

export const JoltTransformer = () => {
  const inputTextRef = useRef<InputJsonHandle>(null);
  const inputSpecificationRef = useRef<InputJsonHandle>(null);

  const [errorMessage, setErrorMessage] = useState('');

  return (
    <Container className="mt-5">
      <p className={'h2 mb-4'}>Jolt Transformer</p>
      {errorMessage && (
        <Row>
          <Row className="mt-3">
            <Col>
              <Alert variant={'danger'} role="alert">
                {errorMessage}
              </Alert>
            </Col>
          </Row>
        </Row>
      )}
      <Row>
        <Col md={4} className="position-relative">
          <InputJson
            ref={inputTextRef}
            id="input"
            name="Input"
            defaultValue={'{}'}
          />
        </Col>
        <Col md={4} className="position-relative">
          <InputJson
            ref={inputSpecificationRef}
            id="inputSpecification"
            name="Specification"
            defaultValue={'[]'}
          />
        </Col>
        <Col md={4} className="position-relative">
          <OutputJson
            inputTextRef={inputTextRef}
            inputSpecificationRef={inputSpecificationRef}
            setErrorMessage={setErrorMessage}
          />
        </Col>
      </Row>
    </Container>
  );
};
