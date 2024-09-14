import { useRouteError } from "react-router-dom";
import * as React from "react";

export default function ErrorPage() {
  const error = useRouteError();
  // console.error(error);

  // Type assertion to ensure TypeScript knows error has statusText and message properties
  const errorWithStatusText = error as { statusText?: string; message?: string };

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorWithStatusText.statusText || errorWithStatusText.message}</i>
      </p>
    </div>
  );
}