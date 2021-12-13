// Auth
/* eslint-disable no-useless-escape */
export const EmailPattern =
  '^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$';
export const UsernamePattern =
  '/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/';
export const NamePattern = "/^[A-Za-z]+((s)?(('|-|.|,)?([A-Za-z])+))*$/";
export const PasswordPattern = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$';

// Tribes
export const TribeNamePattern = '^[^-s][a-zA-Z0-9_s-]{1,40}$';
export const TribeIdentifierPattern = '^[a-zA-Z0-9_]{3,20}$';
export const TribeDescriptionPattern = '^[a-zA-Z0-9_]';

// Channel
export const ChannelNamePattern = '^[^-s][a-zA-Z0-9_s-]{1,40}$';
export const ChannelDescriptionPattern = '^[a-zA-Z0-9_]';

// Square
export const SquareNamePattern = '^[^-s][a-zA-Z0-9_s-]{1,40}$';
