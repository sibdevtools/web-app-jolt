import React, { useState } from 'react';
import { Exchange01Icon } from 'hugeicons-react';
import { InputJsonHandle } from "./InputJson";

export interface OutputJsonProps {
  setErrorMessage: (inputText: string) => void,
  inputTextRef: React.MutableRefObject<InputJsonHandle | null>
  inputSpecificationRef: React.MutableRefObject<InputJsonHandle | null>
}

export const OutputJson = ({
                             setErrorMessage,
                             inputTextRef,
                             inputSpecificationRef
                           }: OutputJsonProps) => {
  const [outputText, setOutputText] = useState('');

  const handleTransform = async () => {
    let input = inputTextRef?.current?.getValidated();
    if (!input) {
      return
    }

    let specification = inputSpecificationRef?.current?.getValidated();
    if (!specification) {
      return
    }

    try {
      const response = await fetch('/web/app/jolt/transform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: input,
          specification: specification
        }),
      });

      if (!response.ok) {
        console.error(`Failed to process: ${response.status}`);
        setErrorMessage(`Failed to process: ${response.status}`);
        return;
      }

      const result = await response.json();
      setOutputText(JSON.stringify(result, null, 4));
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage(`Failed to transform: ${error}`);
    }
  };

  return (
    <>
      <label htmlFor="outputArea" className="form-label">Output</label>
      <textarea
        id="outputArea"
        className="form-control"
        value={outputText}
        style={{ minHeight: '480px' }}
        readOnly
        placeholder="Output"
      />
      <button
        className="btn btn-primary position-absolute"
        style={{ top: 0, right: 0 }}
        onClick={handleTransform}
      >
        <Exchange01Icon />
      </button>
    </>
  );
};
