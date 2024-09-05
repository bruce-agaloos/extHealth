import * as React from "react";
import { Link } from "react-router-dom";

export default function FinalPage() {

  return (
    <div id="finalPage">
      FinalPage
      <Link to={`/guide.html`}>First Page</Link>
    </div>
  );
}
