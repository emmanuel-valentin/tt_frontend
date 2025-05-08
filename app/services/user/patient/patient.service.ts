import { fisiogoApi } from "~/api/fisiogoApi";
import { SubmitActivityPayload } from "~/schemas/activity/activity.schema";

import type { EmptyResponse } from "~/types/shared/empy-response.type";
import type { LinkResponse } from "~/types/user/user.type";

export async function getPhysiotherapists() {
  try {
    const { data, status } = await fisiogoApi.get<LinkResponse>(
      "/users/patient/links"
    );
    if (status !== 200) {
      throw new Error(data.error?.message);
    }

    if (!data) {
      throw new Error("Empty response");
    }

    return {
      serviceData: data.data,
    };
  } catch (error) {
    return {
      serviceError: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function sendLinkToPhysiotherapist(codigoVinculacion: string) {
  try {
    const { data, status } = await fisiogoApi.post<EmptyResponse>(
      "/users/patient/link",
      {
        codigo: codigoVinculacion,
      }
    );
    if (status !== 200) {
      throw new Error(data.error?.message);
    }

    if (!data) {
      throw new Error("Empty response");
    }

    return {
      serviceData: data.data,
    };
  } catch (error) {
    return {
      serviceError: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function submitActivity(
  SubmitActivityPayload: SubmitActivityPayload
) {
  try {
    const { data, status } = await fisiogoApi.post<EmptyResponse>(
      "/activities/assigned/submit",
      SubmitActivityPayload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (status !== 200) {
      throw new Error(data.error?.message);
    }

    if (!data) {
      throw new Error("Empty response");
    }

    return {
      serviceData: data.data,
    };
  } catch (error) {
    return {
      serviceError: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
