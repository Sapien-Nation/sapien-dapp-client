// Auth
/* eslint-disable no-useless-escape */
export const EmailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const UsernameRegex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
export const NameRegex = /^\w{2,} \w{2,}/;
export const PasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

// Tribes
export const TribeNameRegex = /^[a-zA-Z\s]/;
export const TribeIdentifierRegex = /^[a-zA-Z0-9_]/;
export const TribeDescriptionRegex = /^[a-zA-Z0-9_]/;
