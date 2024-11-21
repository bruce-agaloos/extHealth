const error = {
  keywordNotSupported: {
    title: "Keyword Not Supported",
    message:
      "The text you wish to process currently do not have the supported keywords. Please refer to our detailed documentation for the list of accepted keywords.",
  },
  healthNotDetected: {
    title: "Health Not Detected",
    message:
      "The model was unable to detect any health passages. Please ensure that the text contains a health topic.",
  },
  networkError: {
    title: "Network Error",
    message: "No Network Connection. Please try again later.",
  },
  serverError: {
    title: "Server Error",
    message: "The Server is currently having problems. Please try again later.",
  },
  characterLimit:
  {
    title: "Character Limit",
    message: "The text does not meet the character limit, it should be more than 0 and less than 256 characters.",
  },
  loading: {
    title: "Loading",
    message: "Please wait for the current process to finish before proceeding.",
  },
  dailyLimit: {
    title: "Daily Limit",
    message: "The server has reached its daily limit. Please try again tomorrow.",
  },
};

function getErrorMessage(errorType: string): { title: string; message: string } {
  return error[errorType];
}

export default getErrorMessage;
