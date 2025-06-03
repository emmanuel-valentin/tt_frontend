import { useNavigation } from "@remix-run/react";

/**
 * Custom hook to check if a specific intent is currently being submitted
 * @param intent - The intent to check for
 * @returns boolean indicating if the intent is being submitted
 */
export function useIntentSubmission(intent: string): boolean {
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  const formData = navigation.formData;
  const submittingIntent = formData?.get("intent");

  return isSubmitting && submittingIntent === intent;
}
