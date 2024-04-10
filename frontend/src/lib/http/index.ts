import { z } from "zod";

type Response<Type> =
  | {
      success: true;
      status: number;
      data: Type;
    }
  | {
      success: false;
      status: number | null;
    };

type Method = "GET" | "POST" | "PATCH" | "DELETE";

const baseUrl = "http://localhost:3001";

export const safeFetch = async <Schema extends z.ZodTypeAny>(config: {
  method: Method;
  path: string;
  schema: Schema;
  payload?: unknown;
}): Promise<Response<z.infer<typeof config.schema>>> => {
  const { method, path, schema, payload } = config;
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(baseUrl + path, {
      method,
      headers: payload
        ? {
            "Content-Type": "application/JSON",
            auth: token || "",
          }
        : { auth: token || "" },
      body: payload ? JSON.stringify(payload) : undefined,
    });

    if (response.status >= 500)
      return { success: false, status: response.status };

    if (response.status >= 400)
      return { success: false, status: response.status };

    const data = await response.json();

    const result = schema.safeParse(data);
    if (!result.success) {
      //console.log(result.error);
      return { success: false, status: response.status };
    }

    return { data: result.data, success: true, status: response.status };
  } catch (error) {
    return { success: false, status: null };
  }
};
