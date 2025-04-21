import { fisiogoApi } from "~/api/fisiogoApi";
import { UserResponse } from "~/types/user/user.type";

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

    console.log("User data", data);

    return {
      serviceData: data.data,
    };
  } catch (error) {
    return {
      serviceError: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
