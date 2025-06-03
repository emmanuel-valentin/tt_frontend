import {
  ClientActionFunctionArgs,
  redirect,
  useActionData,
} from "@remix-run/react";

import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Card,
} from "~/components/ui/card";

import { Step3Form } from "~/components/auth/register/step-3-form";

import { ErrorAlert } from "~/components/shared/alert/error-alert";
import {
  loadFormData,
  setFormData,
  clearFormData,
  getSelectedImage,
} from "~/store/register-form.store";
import {
  registerSchema,
  step3FormSchema,
} from "~/schemas/auth/register.schema";
import { register } from "~/services/auth/auth.service";
import { updateUserPicture } from "~/services/user/user.service";

export async function clientLoader() {
  const { step1, step2, step3 } = loadFormData();
  if (!step1 || !step2) return redirect("/auth/register");
  if (!step2.role) return redirect("/auth/register/select-role");

  return {
    role: step2.role,
    ...step3,
  };
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const formData = await request.formData();
  const parsedData = Object.fromEntries(formData);

  const step3Validation = step3FormSchema.safeParse(parsedData);
  if (!step3Validation.success) {
    return {
      validationErrors: step3Validation.error.flatten().fieldErrors,
    };
  }

  setFormData({ step3: step3Validation.data });

  const { step1, step2, step3 } = loadFormData();

  const registerValidation = registerSchema.safeParse({
    ...step1,
    ...step2,
    ...step3,
  });
  if (!registerValidation.success) {
    return {
      validationErrors: registerValidation.error.flatten().fieldErrors,
    };
  }

  const { serviceData, serviceError } = await register(registerValidation.data);

  if (serviceError) {
    return {
      serviceError,
    };
  }

  const { access_token, refresh_token } = serviceData!;
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);

  const selectedImage = getSelectedImage();
  if (selectedImage) {
    try {
      const { serviceError: pictureError } = await updateUserPicture({
        foto: selectedImage,
      });

      if (pictureError) {
        console.warn("Failed to upload profile picture:", pictureError);
      }
    } catch (error) {
      console.warn("Error uploading profile picture:", error);
    }
  }

  clearFormData();
  return redirect("/dashboard"); // Redirect to a success page or dashboard
}

export default function RegisterSelectRolePage() {
  const actionData = useActionData<typeof clientAction>();
  const serviceError = actionData?.serviceError;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Por último...</CardTitle>
        <CardDescription>Solo necesitamos unas cosas más</CardDescription>
        {serviceError && (
          <ErrorAlert title="Error al registrarse" message={serviceError} />
        )}
      </CardHeader>
      <CardContent>
        <Step3Form />
      </CardContent>
    </Card>
  );
}
