export const getRequiredMessage = (fieldName) => `${fieldName} is required`;

export const getValidationRules = (watch) => ({
  userName: {
    required: getRequiredMessage("User Name"),
    minLength: {
      value: 3,
      message: "Username must be at least 3 characters long",
    },
    maxLength: {
      value: 20,
      message: "Username must not exceed 20 characters",
    },
    pattern: {
      value: /^[a-zA-Z0-9_]+$/,
      message: "Username can only contain letters, numbers and underscores",
    },
  },
  email: {
    required: getRequiredMessage("Email"),
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
  },
  OTP: {
    required: getRequiredMessage("OTP"),
  },
  password: {
    required: getRequiredMessage("Password"),
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters long",
    },
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
    },
  },
  confirmPassword: {
    required: getRequiredMessage("Confirm Password"),
    validate: (value) =>
      value === watch("password") || "Passwords do not match",
  },
  confirmNewPassword: {
    required: getRequiredMessage("Confirm Password"),
    validate: (value) =>
      value === watch("newPassword") || "Passwords do not match",
  },
  phoneNumber: {
    required: getRequiredMessage("Phone Number"),
    pattern: {
      value: /^[0-9]{10,15}$/,
      message: "Phone number must be between 10 and 15 digits",
    },
  },
  country: {
    required: getRequiredMessage("Country"),
    minLength: {
      value: 2,
      message: "Country name must be at least 2 characters long",
    },
  },
  CategoryName: {
    required: getRequiredMessage("CategoryName"),
    minLength: {
      value: 2,
      message: "Category name must be at least 2 characters",
    },
    maxLength: {
      value: 50,
      message: "Category name must not exceed 50 characters",
    },
    pattern: {
      value: /^[a-zA-Z\s\u0600-\u06FF]+$/,
      message: "Category name should only contain letters and spaces",
    },
  },
});
