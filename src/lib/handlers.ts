import { get } from './helpers';

const getFormFields = (form) => [...form.querySelectorAll('input,textarea,select')];

const fieldTypes = ['text', 'textarea', 'search', 'number', 'email', 'url', 'password', 'tel', 'date'];

const getSelectedOptionsValues = (field) => [...field.selectedOptions].map((option) => option.value);

const getFormField = ({ field, attribute, attributeValue }) => {
  const fieldName = field.tagName.toLowerCase();
  const formField = get(fieldName)
    .withAttribute(attribute)
    .andValue(attributeValue);

  return formField;
}

const generateTest = ({ field, attribute, attributeValue }) => {
  const formField = getFormField({ field, attribute, attributeValue });

  return {
    forInput: (userValue) => `  cy.get('${formField}').type('${userValue}');\n`,
    forRadioButton: () => `  cy.get('${formField}').click();\n`,
    forCheckbox: () => `  cy.get('${formField}').click();\n`,
    forSelect: (option) => `  cy.get('${formField}').select('${option}');\n`,
    forMutipleSelect: (options) => `  cy.get('${formField}').select(${options});\n`,
    forSubmitButton: () => `  cy.get('${formField}').click();\n`,
  }
};

const updateInput = (field) => {
  const attribute = 'name';
  const attributeValue = field.name;
  const fieldProperties = {
    field,
    attribute,
    attributeValue
  };

  sessionStorage.lazyCypress += generateTest(fieldProperties).forInput(field.value);
};

const updateRadioButton = (field) => {
  const fieldLabel = document.querySelector(`label[for="${field.id}"]`);
  const attribute = 'for';
  const attributeValue = fieldLabel.getAttribute('for');
  const fieldProperties = {
    field: fieldLabel,
    attribute,
    attributeValue
  };

  sessionStorage.lazyCypress += generateTest(fieldProperties).forRadioButton();
};

const updateCheckbox = (field) => {
  const fieldLabel = document.querySelector(`label[for="${field.id}"]`);
  const attribute = 'for';
  const attributeValue = fieldLabel.getAttribute('for');
  const fieldProperties = {
    field: fieldLabel,
    attribute,
    attributeValue
  };

  sessionStorage.lazyCypress += generateTest(fieldProperties).forCheckbox();
};

const updateSelect = (field) => {
  const attribute = 'name';
  const attributeValue = field.name;
  const selectOption = field[field.selectedIndex].text;
  const fieldProperties = {
    field,
    attribute,
    attributeValue
  };

  sessionStorage.lazyCypress += generateTest(fieldProperties).forSelect(selectOption);
};

const updateMutipleSelect = (field) => {
  const attribute = 'name';
  const attributeValue = field.name;
  const selectedOptions = getSelectedOptionsValues(field);
  const stringifiedSelectedOptions = JSON.stringify(selectedOptions);
  const fieldProperties = {
    field,
    attribute,
    attributeValue
  };

  sessionStorage.lazyCypress += generateTest(fieldProperties).forMutipleSelect(stringifiedSelectedOptions);
};

const updateSubmitButton = (form) => {
  const field = form.querySelector('input[type=submit]') || form.querySelector('button');
  const attribute = 'data-testid';
  const attributeValue = 'submit-button';
  const fieldProperties = {
    field,
    attribute,
    attributeValue
  };

  sessionStorage.lazyCypress += generateTest(fieldProperties).forSubmitButton();
};

const updateEachField = (field) => {
  if (fieldTypes.includes(field.type) && field.value) {
    updateInput(field);
  } else if (field.type === 'radio' && field.checked) {
    updateRadioButton(field);
  } else if (field.type === 'checkbox' && field.checked) {
    updateCheckbox(field);
  } else if (field.type === 'select-one') {
    updateSelect(field);
  } else if (field.type === 'select-multiple') {
    updateMutipleSelect(field);
  }
};

export const updateFormSessionStorage = (form) => (event) => {
  if (sessionStorage.lazyCypress) {
    const hasRemainingTest = sessionStorage.lazyCypress.includes('});');

    if (hasRemainingTest) {
      event.preventDefault();
      alert('You should clean your recording.');
      return;
    }

    const formFields = getFormFields(form);

    formFields.forEach(updateEachField);
    updateSubmitButton(form);

    sessionStorage.lazyCypress += '});';
  }
};
