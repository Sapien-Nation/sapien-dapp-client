export const validatePassword = (value: string) => {
  if (!/[a-zA-Z]/.test(value)) {
    return 'At least one alphabet is required.';
  }

  if (!/[a-z]/.test(value)) {
    return 'At least one lowercase letter is required.';
  }

  if (!/[A-Z]/.test(value)) {
    return 'At least one uppercase letter is required.';
  }

  if (!/[\d]/.test(value)) {
    return 'At least one number is required.';
  }

  if (value?.length < 8) {
    return 'Minimum 8 characters required.';
  }

  return true;
};
