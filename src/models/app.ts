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
  id?: string;
  since: number;
  until: number;
}) {
  return (await (
    await fetch(
      `/api/gateway/history/consumption${
        input.id ? `/${input.id}` : ""
      }?${new URLSearchParams({
        since: input.since + "",
        until: input.until + "",
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

export async function getDepositHistory(input: {
  ts_from: number;
  ts_to: number;
}) {
  return (await (
    await fetch(
      `/api/gateway/history/deposit?${new URLSearchParams({
        ts_from: input.ts_from + "",
        ts_to: input.ts_to + "",
      })}`,
      {
        credentials: "include",
      },
    )
  ).json()) as {
    amount: number;
    block_timestamp: number;
    index: number;
    tx_hash: string;
  }[];
}
