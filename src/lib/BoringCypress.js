import React, { useEffect, Fragment } from 'react';
import { start, clean, copy, addFormSubmitListener } from './listeners';

export const BoringCypress = () => {
  useEffect(() => {
    addFormSubmitListener();
  }, []);

  return (
    <Fragment>
      <button
        id="cypress-start"
        onClick={start}
      >
        <span
          role="img"
          aria-label="start recording"
        >
          ⏺
        </span>
      </button>

      <button
        id="cypress-clean"
        onClick={clean}
      >
        <span
          role="img"
          aria-label="start recording"
        >
          ⏹
        </span>
      </button>

      <button
        id="cypress-copy"
        onClick={copy}
      >
        <span
          role="img"
          aria-label="start recording"
        >
          📋
        </span>
      </button>
    </Fragment>
  )
};
