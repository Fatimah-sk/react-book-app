import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <section className="error-page">
      <h1>Something went wrong</h1>
      <p>{error?.statusText || error?.message || "Unknown error."}</p>
      <Link to="/" className="primary-btn">
        Back to Home
      </Link>
    </section>
  );
}