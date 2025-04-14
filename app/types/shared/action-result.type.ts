export type ActionResult<T> = {
  actionData: T | null;
  actionError: string | null;
};
