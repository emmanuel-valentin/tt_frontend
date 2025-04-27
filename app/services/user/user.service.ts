import { fisiogoApi } from "~/api/fisiogoApi";
import { UpdateUserPayload, UserResponse } from "~/types/user/user.type";

export async function getUserData() {
  try {
    const { data, status } = await fisiogoApi.get<UserResponse>(
      "/users/profile"
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

export async function getUserProfileById(id: string) {
  try {
    const { data, status } = await fisiogoApi.get<UserResponse>(`/users/${id}`);

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

export async function updateUserProfile(profileData: UpdateUserPayload) {
  try {
    const { data, status } = await fisiogoApi.put<UserResponse>(
      "/users/profile/update",
      profileData
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
