import { GraphQLClient, gql } from "graphql-request";
import type { Todo } from "@/types/todo";

const endpoint = process.env.HYGRAPH_ENDPOINT;
const token = process.env.HYGRAPH_TOKEN;

export function getHygraphClient(): GraphQLClient {
  if (!endpoint) {
    throw new Error("HYGRAPH_ENDPOINT is not configured.");
  }

  return new GraphQLClient(endpoint, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined
  });
}

export const userTodosQuery = gql`
  query UserTodos($ownerEmail: String!) {
    todos(where: { ownerEmail: $ownerEmail }, orderBy: dueDate_ASC) {
      id
      title
      description
      status
      priority
      dueDate
      ownerEmail
      createdAt
      updatedAt
    }
  }
`;

export type UserTodosResponse = {
  todos: Todo[];
};
