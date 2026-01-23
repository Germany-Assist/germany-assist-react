export const getErrorMessage = (error) => {
  const backendMessage = error.response?.data?.message;
  if (!backendMessage) return "Operation Failed";
  let arrayOfMessages;
  if (Array.isArray(backendMessage.errors)) {
    arrayOfMessages = backendMessage.errors.map((err) => err.msg).join("\n");
  }
  if (arrayOfMessages) {
    return arrayOfMessages;
  } else {
    return error.response?.data?.message || "Something went wrong";
  }
};
