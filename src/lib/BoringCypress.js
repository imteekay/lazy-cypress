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
        ⏺
      </button>

      <button
        id="cypress-clean"
        onClick={clean}
      >
        ⏹
      </button>

      <button
        id="cypress-copy"
        onClick={copy}
      >
        📋
      </button>
    </Fragment>
  )
};
