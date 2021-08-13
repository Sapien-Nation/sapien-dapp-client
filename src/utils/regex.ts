// Auth
/* eslint-disable no-useless-escape */
export const EmailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const UsernameRegex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
export const NameRegex = /^[A-Za-z]+((\s)?((\'|\-|\.|\,)?([A-Za-z])+))*$/;
export const PasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

// Tribes
export const TribeNameRegex = /^[^-\s][a-zA-Z0-9_\s-]{1,40}$/;
export const TribeIdentifierRegex = /^[a-zA-Z0-9_]{3,20}$/;
export const TribeDescriptionRegex = /^[a-zA-Z0-9_]/;

// Channel
export const ChannelNameRegex = /^[^-\s][a-zA-Z0-9_\s-]{1,40}$/;
export const ChannelDescriptionRegex = /^[a-zA-Z0-9_]/;

// Square
export const SquareNameRegex = /^[^-\s][a-zA-Z0-9_\s-]{1,40}$/;
