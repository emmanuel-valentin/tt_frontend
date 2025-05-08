import { fisiogoApi } from "~/api/fisiogoApi";
import { SendFeedbackPayload } from "~/schemas/user/seed-feedback.schema";

import type { EmptyResponse } from "~/types/shared/empy-response.type";
import type { LinkResponse } from "~/types/user/user.type";

export async function getAllPatientLinks() {
  try {
    const { data, status } = await fisiogoApi.get<LinkResponse>(
      "/users/physiotherapist/links"
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

export async function getPendingPatientLinks() {
  try {
    const { data, status } = await fisiogoApi.get<LinkResponse>(
      "/users/physiotherapist/request-links"
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

export async function getAcceptedPatients() {
  try {
    const { data, status } = await fisiogoApi.get<LinkResponse>(
      "/users/physiotherapist/patients"
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

export async function acceptPatientLink(vinculacionId: string) {
  try {
    const { data, status } = await fisiogoApi.post<EmptyResponse>(
      `/users/physiotherapist/link/accept`,
      { link_id: vinculacionId }
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

export async function rejectPatientLink(vinculacionId: string) {
  try {
    const { data, status } = await fisiogoApi.delete<EmptyResponse>(
      `/users/physiotherapist/link/reject`,
      { data: { link_id: vinculacionId } }
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

// TODO: Create another function to delete the link instead of rejecting it
export const deletePatientLink = rejectPatientLink;

export async function sendActivityFeedback(
  feedbackPayload: SendFeedbackPayload
) {
  try {
    const { data, status } = await fisiogoApi.post<EmptyResponse>(
      "/users/physiotherapist/feedback",
      feedbackPayload
    );

    if (status !== 200) {
      throw new Error(data.error?.message);
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
