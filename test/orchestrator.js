import retry from "async-retry";

async function waitforAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 6000,
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");
      const responsebody = await response.json();
    }
  }
}

export default {
  waitforAllServices: waitforAllServices,
};
