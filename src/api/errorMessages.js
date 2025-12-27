export const getErrorMessage = (error) => {
  const backendMessage = error.response?.data?.message?.errors;
  let arrayOfMessages;
  if (Array.isArray(backendMessage)) {
    arrayOfMessages = backendMessage.map((err) => err.msg).join("\n");
  }
  if (arrayOfMessages) {
    return arrayOfMessages;
  } else {
    return error.response?.data?.message || "Something went wrong";
  }
};
