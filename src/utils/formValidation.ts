const usernameValidation = {
  required: "Username is required",
  maxLength: {
    value: 32,
    message: "Username cannot exceed 32 characters",
  },
  pattern: {
    value: /^[a-zA-Z0-9]+$/,
    message: "Username must only contain letters and numbers",
  },
};

const passwordValidation = {
  required: "Password is required",
  minLength: {
    value: 8,
    message: "Password must be longer than 8 characters",
  },
  pattern: {
    value: /^\S[\s\S]+\S$/,
    message: "Password cannot start or end with white space characters",
  },
};

export { usernameValidation, passwordValidation };
