import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <section className="bg-background">
      <div className="container flex min-h-screen items-center px-6 py-12 mx-auto">
        <div className="flex max-w-sm flex-col items-center mx-auto text-center">
          <p className="rounded-full bg-accent p-3 text-sm font-medium text-destructive">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-foreground md:text-3xl">
            Something Went Wrong!
          </h1>
          <p className="mt-4 text-muted-foreground">Here are some helpful links:</p>
          <div className="mt-6 flex w-full shrink-0 items-center gap-x-3 sm:w-auto">
            <button
              onClick={() => navigate(-1)}
              className="flex w-1/2 items-center justify-center gap-x-2 rounded-lg border bg-card px-5 py-1 text-sm text-foreground transition-colors duration-200 hover:bg-accent sm:w-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 text-destructive rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
              <span>Go back</span>
            </button>
            <button
              onClick={() => navigate("/")}
              className="rounded-lg bg-primary px-5 py-1 text-sm text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Take Me Home
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
