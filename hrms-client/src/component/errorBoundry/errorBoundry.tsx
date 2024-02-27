

function ErrorHandler({error}:any) {
    return (
      <div role="alert">
        <p>An error occurred:</p>
        <pre>{error.message}</pre>
      </div>
    )
  }
  export default ErrorHandler;