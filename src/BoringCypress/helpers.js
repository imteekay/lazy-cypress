export const get = (element) => ({
  withAttribute: (attribute) => ({
    andValue: (value) => `${element}[${attribute}="${value}"]`,
  }),
});
