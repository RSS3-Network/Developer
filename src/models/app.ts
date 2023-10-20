export async function addApp(input: { name?: string }) {
  return await (
    await fetch("/api/gateway/keys", {
      method: "POST",
      body: JSON.stringify(input),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
}

export async function getAppList() {
  return (await (await fetch("/api/gateway/keys")).json()) as {
    name: string;
  }[];
}
