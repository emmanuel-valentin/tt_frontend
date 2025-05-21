import { UIMatch } from "@remix-run/react";

export interface Handle {
  breadcrumb: (match: UIMatch) => React.ReactNode;
  params?: Record<string, string>;
}

export type HandleMatch = UIMatch<unknown, Handle>;
