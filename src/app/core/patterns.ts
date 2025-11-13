export const EMAIL_PATTERN: RegExp = new RegExp(/^[\w.-]+@([\w-]+\.)*gva\.es$/);

export const PASSWORD_PATTERN: RegExp = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d]|[^ ]){8,20}$/,
);

export const ISBN_PATTERN: RegExp = new RegExp(
  /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/,
);
