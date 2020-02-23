import { updateFormSessionStorage } from './handlers';

export const start = () => {
  if (!sessionStorage.boringCypress) {
    sessionStorage.boringCypress = `  describe('[TODO] add a description here', () => {
    cy.visit('${window.location.pathname}');\n\n`;
  }
};

export const clean = () => sessionStorage.removeItem('boringCypress');

export const copy = () => {
  if (navigator.clipboard) {
    navigator
      .clipboard
      .writeText(sessionStorage.boringCypress)
      .catch((error) => {
        console.error('Could not copy text: ', error);
        alert(sessionStorage.boringCypress);
      });
  }
};

export const addFormSubmitListener = () =>
  document.addEventListener('DOMContentLoaded', () => {
    const forms = [...document.getElementsByTagName('form')];
    forms.forEach((form) => form.addEventListener('submit', updateFormSessionStorage(form)));
  });
