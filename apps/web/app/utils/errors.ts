export const getErrorMessage = (response: any) => {
  if (response.message) {
    if (Array.isArray(response.message)) {
      return response.message[0];
    } else {
      return response.message;
    }
  }
  return "Произошла неизвестная ошибка";
};
