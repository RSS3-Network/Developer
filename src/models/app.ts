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
    id: string;
  }[];
}

export async function getApp(id: string) {
  return (await (await fetch(`/api/gateway/key/${id}`)).json()) as {
    name: string;
    id: string;
    key: string;
  };
}

export async function updateApp(input: { id?: string; name?: string }) {
  return await (
    await fetch(`/api/gateway/key/${input.id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: input.name,
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
}

export async function deleteApp(id?: string) {
  return await (
    await fetch(`/api/gateway/key/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
}

export async function regenerateApp(id?: string) {
  return await (
    await fetch(`/api/gateway/key/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
}

export async function getAppHistory(input: {
  id: string;
  ts_from: number;
  ts_to: number;
}) {
  return (await (
    await fetch(
      `/api/gateway/history/consumption/${input.id}?${new URLSearchParams({
        ts_from: input.ts_from + "",
        ts_to: input.ts_to + "",
      })}`,
      {
        credentials: "include",
      },
    )
  ).json()) as {
    api_calls: number;
    ru_used: number;
    collected_at: number;
  }[];
}
