export const EMAIL_VAILDTION = {
  required: "Email is required",
  pattern: {
    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    message: " Please Enter vaild Email",
  },
};
export const PASSWORD_VAILDTION = {
  required: "Password is required",
  pattern: {
    value:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/,
    message:
      "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long.",
  },
};
// value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
// ^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$
export const OTP_VAILDTION = {
  required: "OTP is required",
  maxLength: {
    value: 6,
    message: "Otp must be at 6 characters",
  },
};
export const PHONE_VAILDTION = {
  required: "phoneNumber is required",
  pattern: {
    value: /^01(0|1|2)[0-9]{8}/,
    message: "Your phone must it consists of 11 number",
  },
};
export const COUNTRY_VAILDTION = {
  required: "country is required",
  minLength: {
    value: 5,
    message: "enter chars more than 5 ",
  },
};
export const USER_NAME = {
  required: "userName is required",
  pattern: {
    value: /^[a-zA-Z]+[0-9]+$/,
    message:
      "The userName must contain characters and end with numbers without spaces",
  },
  maxLength: {
    value: 8,
    message: "The userName may not be greater than 8 characters",
  },
};
