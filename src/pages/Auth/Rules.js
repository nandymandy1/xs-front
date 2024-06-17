export const UserRules = {
  firstName: [{ required: true, message: "First name is required." }],
  lastName: [{ required: true, message: "Last name is required." }],
  username: [{ required: true, message: "Username is required." }],
  email: [
    { required: true, message: "Email is required." },
    {
      type: "email",
      message: "Should be a valid email address.",
    },
  ],
  password: [
    { required: true, message: "Password is required." },
    {
      min: 8,
      message: "Password should atleast have 8 characters.",
    },
  ],
};
