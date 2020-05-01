import { updateFormSessionStorage } from './handlers';

export const start = () => {
  if (!sessionStorage.lazyCypress) {
    sessionStorage.lazyCypress = `describe('[TODO] add a description here', () => {
  cy.visit('${window.location.pathname}');\n\n`;
  }
};

export const clean = () => sessionStorage.removeItem('lazyCypress');

export const copy = () => {
  if (navigator.clipboard) {
    navigator
      .clipboard
      .writeText(sessionStorage.lazyCypress)
      .catch((error) => {
        console.error('Could not copy text: ', error);
        alert(sessionStorage.lazyCypress);
      });
  }
};

export const addFormSubmitListener = () =>
  document.addEventListener('DOMContentLoaded', () => {
    const forms = [...document.getElementsByTagName('form')];
    forms.forEach((form) => form.addEventListener('submit', updateFormSessionStorage(form)));
  });
