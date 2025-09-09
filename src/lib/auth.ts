let apiKey: string | null = null;
let fetchPromise: Promise<void> | null = null;

export async function getApiKey(): Promise<string | null> {
  if (apiKey) {
    return apiKey;
  }

  if (fetchPromise) {
    await fetchPromise;
    return apiKey;
  }
  fetchPromise = fetchApiKey();
  await fetchPromise;

  return apiKey;
}

async function fetchApiKey() {
  const response = await fetch(
    "https://api.smartflowcloud.com/aboma-preprod/Login",
    {
      method: "POST",
      headers: {
        "x-domainname": "aboma-preprod",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        UserName: process.env.SMARTFLOW_USERNAME,
        Password: process.env.SMARTFLOW_PASSWORD,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(
      "Couldn't authenticate with Smartflow:",
      await response.json(),
    );
  }

  const { AuthenticationKey, AuthenticationKeyExpiresIn } =
    await response.json();
  apiKey = AuthenticationKey;
  setTimeout(
    () => {
      fetchApiKey();
    },
    AuthenticationKeyExpiresIn * 59 * 1000,
  ); // reauthenticate slightly before expiry
}
