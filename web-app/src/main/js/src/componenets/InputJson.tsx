import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { AiBeautifyIcon, CheckmarkSquare01Icon } from 'hugeicons-react';
import { prettifyJson, validateJson } from "../utils/validators";

export interface InputJsonProps {
  id: string,
  name: string,
}

export interface InputJsonHandle {
  getValidated: () => string;
}

export const InputJson = forwardRef<InputJsonHandle, InputJsonProps>(
  ({
     id,
     name,
   }: InputJsonProps,
   ref) => {
    const [inputText, setInputText] = useState('');
    const [isInputTextInvalid, setInputTextInvalid] = useState('');

    const [isInputTextValid, setInputTextValid] = useState(false);

    useImperativeHandle(ref, () => ({
      getValidated: () => {
        return validateInputText();
      },
    }));

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
        return;
      }
      setInputTextInvalid(prettifyStatus.message);
      setInputTextValid(false);
    };

    return (
      <>
        <label htmlFor={`${id}TextArea`} className="form-label">{name}</label>
        <div className="btn-group position-absolute" role="group"
             style={{ top: 0, right: 0 }}>
          <button
            className="btn btn-primary"
            title={"Beautify"}
            onClick={prettifyInputText}
          >
            <AiBeautifyIcon />
          </button>
          <button
            className="btn btn-secondary"
            title={"Validate"}
            onClick={validateInputText}
          >
            <CheckmarkSquare01Icon />
          </button>
        </div>
        <textarea
          id={`${id}TextArea`}
          className={`form-control ${(isInputTextInvalid === '' ? '' : 'is-invalid')} ${(isInputTextValid ? 'is-valid' : '')}`}
          value={inputText}
          style={{ minHeight: '480px' }}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={name}
          aria-describedby={`${id}TextAreaFeedback`}
          required={true}
        />
        <div id={`${id}TextAreaFeedback`} className="invalid-feedback">
          {isInputTextInvalid}
        </div>
      </>
    );
  });
