import React, { useRef, useState } from 'react';
import { InputJson, InputJsonHandle } from './InputJson';
import { OutputJson } from './OutputJson';

export const JoltTransformer = () => {
  const inputTextRef = useRef<InputJsonHandle>(null);
  const inputSpecificationRef = useRef<InputJsonHandle>(null);

  const [errorMessage, setErrorMessage] = useState('');

  return (
    <div className="container mt-5">
      <p className={'h2 mb-4'}>Jolt Transformer</p>
      {errorMessage && (
        <div className="row">
          <div className="row mt-3">
            <div className="col">
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-4 position-relative">
          <InputJson
            ref={inputTextRef}
            id="input"
            name="Input"
          />
        </div>
        <div className="col-4 position-relative">
          <InputJson
            ref={inputSpecificationRef}
            id="inputSpecification"
            name="Specification"
          />
        </div>
        <div className="col-4 position-relative">
          <OutputJson
            inputTextRef={inputTextRef}
            inputSpecificationRef={inputSpecificationRef}
            setErrorMessage={setErrorMessage}
          />
        </div>
      </div>
    </div>
  );
};
