import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { AiBeautifyIcon, CheckmarkSquare01Icon, TextWrapIcon } from 'hugeicons-react';
import { prettifyJson, validateJson } from '../utils/validators';
import AceEditor from 'react-ace';
import { loadSettings } from '../settings/utils';
import { Button, ButtonGroup, FormLabel } from 'react-bootstrap';
import Feedback from 'react-bootstrap/Feedback';

export interface InputJsonProps {
  id: string;
  name: string;
  defaultValue: string;
}

export interface InputJsonHandle {
  getValidated: () => string;
}

export const InputJson = forwardRef<InputJsonHandle, InputJsonProps>(
  ({ id, name, defaultValue }: InputJsonProps, ref) => {
    const settings = loadSettings();

    const [inputText, setInputText] = useState(defaultValue);
    const [inputTextInvalid, setInputTextInvalid] = useState('');
    const [inputTextValid, setInputTextValid] = useState(false);
    const [wordWrapEnabled, setWordWrapEnabled] = useState(true);

    useImperativeHandle(ref, () => ({
      getValidated: () => {
        return validateInputText();
      },
    }));

    const handleInputChange = (newValue: string) => {
      setInputText(newValue);
    };

    const validateInputText = () => {
      const validationStatus = validateJson(inputText);
      if (validationStatus.status) {
        setInputTextInvalid('');
        setInputTextValid(true);
        return validationStatus.message;
      }
      setInputTextInvalid(validationStatus.message);
      setInputTextValid(false);
      return null;
    };

    const prettifyInputText = () => {
      const prettifyStatus = prettifyJson(inputText);
      if (prettifyStatus.status) {
        setInputTextInvalid('');
        setInputTextValid(true);
        setInputText(prettifyStatus.message);
      } else {
        setInputTextInvalid(prettifyStatus.message);
        setInputTextValid(false);
      }
    };

    const toggleWordWrap = () => {
      setWordWrapEnabled((prev) => !prev);
    };

    return (
      <>
        <FormLabel htmlFor={`${id}TextArea`}>{name}</FormLabel>
        <ButtonGroup className={'float-end'}>
          <Button variant={'primary'} title="Beautify" onClick={prettifyInputText}>
            <AiBeautifyIcon />
          </Button>
          <Button
            variant={'success'}
            title="Validate"
            onClick={validateInputText}>
            <CheckmarkSquare01Icon />
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
        <AceEditor
          mode="json"
          key={`${id}TextArea`}
          className={`rounded border ${(inputTextInvalid === '' ? '' : 'border-danger')} ${(inputTextValid ? 'border-success' : '')}`}
          style={{
            resize: 'vertical',
            overflow: 'auto',
            height: '480px',
            minHeight: '200px',
          }}
          theme={settings['aceTheme'].value}
          name={`${id}AceEditor`}
          onChange={handleInputChange}
          value={inputText}
          fontSize={14}
          width="100%"
          height="480px"
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          wrapEnabled={wordWrapEnabled}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            showLineNumbers: true,
            enableSnippets: false,
            wrap: wordWrapEnabled,
            useWorker: false,
            enableMobileMenu: false,
          }}
          editorProps={{ $blockScrolling: true }}
        />
        <Feedback id={`${id}TextAreaFeedback`} type={'invalid'}>
          {inputTextInvalid}
        </Feedback>
      </>
    );
  }
);
