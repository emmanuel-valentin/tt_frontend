import { fisiogoApi } from "~/api/fisiogoApi";
import {
  ActivitiesResponse,
  ActivityResponse,
  ExercisesResponse,
} from "~/types/activity/activity.type";

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
