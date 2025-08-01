import { queryStore } from "@urql/svelte";
import type { DocumentNode } from "graphql";
import { urqlClient } from "$lib/graphql/client";

export function runQuery<T>(
  query: DocumentNode,
  variables?: Record<string, any>
) {
  return queryStore<T>({
    client: urqlClient,
    query,
    variables,
  });
}
