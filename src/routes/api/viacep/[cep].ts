import { VITE_VIACEP_API_URL } from "$lib/env";

export const GET: import("@sveltejs/kit").RequestHandler = async ({ params }) => {
  const response = await fetch(VITE_VIACEP_API_URL.replace("/cep", "/" + params.cep), {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    method: "GET"
  });
  return {
    status: response.status,
    body: response.body
  };
};
