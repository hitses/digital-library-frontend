export const EMAIL_PATTERN: RegExp = new RegExp(/^[\w.-]+@([\w-]+\.)*gva\.es$/);

export const PASSWORD_PATTERN: RegExp = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d]|[^ ]){8,20}$/,
);
