// Purpose: Configuration for GraphQL Code Generator
import { CodegenConfig } from "@graphql-codegen/cli";
import { isProd } from "./lib/utils";
// Ref: https://stackoverflow.com/questions/69461989/is-there-any-way-to-use-next-env-in-codegen-yaml

export const endpoint = isProd
  ? "https://api.bcpf.mediio.net/__graphql"
  : `http://localhost:2024/__graphql`;

export const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true,
  schema: [
    {
      [endpoint || ""]: {
        headers: {
          // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjc4LCJpYXQiOjE3MTYzODg3NDYsImV4cCI6MTcxNjU2MTU0Nn0.8iOeIoY25nB6peACF9h1CgM6rJkDjXPzPQCUKeaDeP8`,
        },
      },
    },
  ],
  generates: {
    "lib/__generated/graphql.schema.json": {
      plugins: ["introspection"],
    },
    "lib/__generated/graphql.schema.graphql": {
      plugins: ["schema-ast"],
    },
    "lib/__generated/sdk.ts": {
      documents: ["lib/graphql/**/*.graphql"],
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
      config: {
        rawRequest: false,
        inlineFragmentTypes: "combine",
        skipTypename: false,
        exportFragmentSpreadSubTypes: true,
        dedupeFragments: true,
        preResolveTypes: true,
      },
    },
  },
};

export default config;
