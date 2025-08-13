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
  if (!DOP) {errors.push("Date the of birth is required")}
  else{
      const dateFormat=/^\d{4}-\d{2}-\d{2}$/;
      if(!dateFormat.test(DOP)){
        errors.push("Date format is wrong ");
      }
      else{
        const birthDate=new Date(DOP);
        const today= new Date();
        const age=today.getFullYear() - birthDate.getFullYear();
        const monthAge=today.getMonth-birthDate.getMonth();
        const dayAge= today.getDay-birthDate.getDay();

        const isDateAccepted= monthAge >0 || (monthAge === 0 && dayAge >= 0 );
        const realAge =  isDateAccepted? age: age-1;
        if(realAge< 13)
            errors.push("You must be at least 13 years old");
            
      }
  }
  return errors;
};
