import { redirect } from "@remix-run/react";

export function loader() {
  throw redirect("/auth/login");
}
