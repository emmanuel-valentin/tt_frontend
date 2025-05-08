import { fisiogoApi } from "~/api/fisiogoApi";
import {
  EditActivityPayload,
  NewActivityPayload,
} from "~/schemas/activity/activity.schema";
import {
  ActivitiesResponse,
  ActivityResponse,
  ExercisesResponse,
} from "~/types/activity/activity.type";
import { EmptyResponse } from "~/types/shared/empy-response.type";

export async function getExercises() {
  try {
    const { data, status } = await fisiogoApi.get<ExercisesResponse>(
      "/exercises"
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

export async function getActivities() {
  try {
    const { data, status } = await fisiogoApi.get<ActivitiesResponse>(
      "/activities/assignments"
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

export async function getActivityById(id: string) {
  try {
    const { data, status } = await fisiogoApi.get<ActivityResponse>(
      `/activities/assignment/${id}`
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

export async function newActivity(newActivity: NewActivityPayload) {
  try {
    const { data, status } = await fisiogoApi.post<ActivityResponse>(
      "/activities/assign",
      newActivity
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

export async function deleteActivityById(id: string) {
  try {
    const { data, status } = await fisiogoApi.delete<EmptyResponse>(
      "/activities/assigned/delete",
      { data: { ejercicioAsignadoID: id } }
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

export async function updateActivity(
  id: string,
  activityData: EditActivityPayload
) {
  try {
    const { data, status } = await fisiogoApi.patch<ActivityResponse>(
      `/activities/assigned/`,
      activityData
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
