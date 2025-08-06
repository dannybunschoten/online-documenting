import dataModel from "./static.json";

const usernameSmartflow = "syncintegration";
const passwordSmartflow = "rysmar-5qeBji-wewker-123";
const taskId = "366957f6-f93c-4794-ba8e-8153a14cb694";

(async () => {
  try {
    const authKey = await login();
    const checkResults = await getCheckResults(authKey);
    const taskInformation = await getTaskInformation(authKey);

    const uploadResult = await fetch("http://localhost:3000/api/post-data", {
      method: "post",
      body: JSON.stringify({
        checkResults,
        taskInformation,
        dataModel,
      }),
    });

    if (!uploadResult.ok) {
      const errorResponse = await uploadResult.json();
      console.error(
        "Upload failed with response:",
        JSON.stringify(errorResponse, null, 2),
      );
      throw new Error("couldn't upload");
    }

    console.log(await uploadResult.json());
  } catch (error) {
    console.error(error);
  }
})();

async function login() {
  const loginResponse = await fetch(
    "https://api.smartflowcloud.com/aboma-preprod/Login",
    {
      method: "post",
      headers: {
        "x-domainname": "aboma-preprod",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        UserName: usernameSmartflow,
        Password: passwordSmartflow,
      }),
    },
  );

  if (!loginResponse.ok) {
    throw new Error("Couldn't authorize user");
  }

  const { AuthenticationKey } = await loginResponse.json();
  return AuthenticationKey;
}

async function getCheckResults(authKey: string) {
  const checkResultsResponse = await fetch(
    "https://api.smartflowcloud.com/aboma-preprod/PackageService/Packages/Checks/GetCheckResults",
    {
      method: "post",
      headers: {
        "X-Security-AuthKey": authKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Include: "ResultValues,Photos,Actions",
        TaskId: taskId,
      }),
    },
  );

  const checkResults = await checkResultsResponse.json();
  return checkResults;
}

async function getTaskInformation(authKey: string) {
  const taskInformationResponse = await fetch(
    `https://api.smartflowcloud.com/aboma-preprod/PackageService/Packages/Checks/GetTasks?TaskId=${taskId}`,
    {
      headers: {
        "X-Security-AuthKey": authKey,
        Accept: "application/json",
      },
    },
  );

  const taskInformation = await taskInformationResponse.json();
  return taskInformation;
}
