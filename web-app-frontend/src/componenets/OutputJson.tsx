import React, { useState } from 'react';
import { Exchange01Icon, TextWrapIcon } from 'hugeicons-react';
import { InputJsonHandle } from './InputJson';
import AceEditor from 'react-ace';
import { loadSettings } from '../settings/utils';
import { Button, ButtonGroup, FormLabel } from 'react-bootstrap';

export interface OutputJsonProps {
  setErrorMessage: (inputText: string) => void;
  inputTextRef: React.MutableRefObject<InputJsonHandle | null>;
  inputSpecificationRef: React.MutableRefObject<InputJsonHandle | null>;
}

export const OutputJson = ({
                             setErrorMessage,
                             inputTextRef,
                             inputSpecificationRef
                           }: OutputJsonProps) => {
  const settings = loadSettings()
  const [outputText, setOutputText] = useState('');
  const [wordWrapEnabled, setWordWrapEnabled] = useState(true);

  const handleTransform = async () => {
    let input = inputTextRef?.current?.getValidated();
    if (!input) {
      return;
    }

    let specification = inputSpecificationRef?.current?.getValidated();
    if (!specification) {
      return;
    }

    try {
      const response = await fetch('/web/app/jolt/rest/v1/transform', {
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

  const toggleWordWrap = () => {
    setWordWrapEnabled((prev) => !prev);
  };

  return (
    <>
      <FormLabel htmlFor="outputArea">Output</FormLabel>
      <ButtonGroup className={'float-end'}>
        <Button variant={'success'} onClick={handleTransform}>
          <Exchange01Icon />
        </Button>
        <Button
          variant={'primary'}
          className={`${(wordWrapEnabled ? 'active' : '')}`}
          title={wordWrapEnabled ? 'Unwrap' : 'Wrap'}
          onClick={toggleWordWrap}
        >
          <TextWrapIcon />
        </Button>
      </ButtonGroup>
      <div className="form-control">
        <AceEditor
          mode="json"
          theme={settings['aceTheme'].value}
          name="outputAceEditor"
          value={outputText}
          fontSize={14}
          width="100%"
          height="480px"
          readOnly
          wrapEnabled={wordWrapEnabled}
          setOptions={{
            wrap: wordWrapEnabled,
            useWorker: false
          }}
          editorProps={{ $blockScrolling: true }}
        />
      </div>
    </>
  );
};
