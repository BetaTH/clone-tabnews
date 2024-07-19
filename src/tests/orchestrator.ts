import retry from "async-retry";
async function waitForAllServices() {
  async function waitForWebServer() {
    const fetchStatusPage: retry.RetryFunction<void> = async (_, _attempt) => {
      const reponse = await fetch("http://localhost:3000/api/v1/status");
      if (!reponse.ok) {
        throw Error();
      }
    };

    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });
  }

  await waitForWebServer();
}

export { waitForAllServices };
