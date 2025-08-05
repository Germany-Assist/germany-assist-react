import React from "react";

export const ValidateSignUPInputs = ({
  firstName,
  lastName,
  image,
  DOP,
  password,
  confirmedPassword,
  email,
}) => {
  const errors = [];

  if (!firstName) errors.push("First Name is required");
  if (!lastName) errors.push("Last Name is required");
  if (!email.includes("@")) errors.push("Email is required");
  if (!password || password.length < 6) errors.push("Password is not failed");
  if (password !== confirmedPassword) errors.push("Password is not matching");
  if (image && !/\.(jpg|jpeg|png|gif)$/.test(image))
    errors.push("Image must end in .jpg, .jpeg, .png, or .gif");
  if (!DOP) errors.push("Date the of birth is required");
  return errors;
};
