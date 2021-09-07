import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
import {TodoList} from '../context/todoContext';
import {URI_8BASE, TOKEN} from '@env';
console.log(URI_8BASE, TOKEN);
type Props = {
  query:
    | 'TODO_LIST_QUERY'
    | 'CREATE_TODO_MUTATION'
    | 'TOGGLE_TODO_MUTATION'
    | 'DELETE_TODO_MUTATION'
    | 'EDIT_TODO_MUTATION';
  variables?:
    | {data: {text: string; completed: boolean}}
    | {id?: string; completed?: boolean}
    | {id?: string; text?: string};
};

export const graphqlClient = async ({query, variables}: Props) => {
  let response: TodoList[];
  const client = new ApolloClient({
    uri: URI_8BASE,
    cache: new InMemoryCache(),
    headers: {
      authorization: TOKEN,
    },
  });

  if (query === 'TODO_LIST_QUERY') {
    const resp = await client.query({
      query: queries[query],
    });
    response = resp.data.todosList.items;
  } else {
    const resp = await client.mutate({
      variables,
      mutation: mutates[query],
    });
    response = [resp.data.todoCreate];
  }
  console.log('llama');
  return response;
};

const queries = {
  TODO_LIST_QUERY: gql`
    query TodoList {
      todosList(orderBy: [completed_ASC, createdAt_DESC]) {
        items {
          id
          text
          completed
        }
      }
    }
  `,
};

const mutates = {
  CREATE_TODO_MUTATION: gql`
    mutation TodoCreate($data: TodoCreateInput!) {
      todoCreate(data: $data) {
        id
        text
        completed
      }
    }
  `,
  TOGGLE_TODO_MUTATION: gql`
    mutation TodoToggle($id: ID!, $completed: Boolean!) {
      todoUpdate(filter: {id: $id}, data: {completed: $completed}) {
        id
        text
        completed
      }
    }
  `,
  EDIT_TODO_MUTATION: gql`
    mutation TodoEdit($id: ID!, $text: String!) {
      todoUpdate(filter: {id: $id}, data: {text: $text}) {
        id
        text
        completed
      }
    }
  `,
  DELETE_TODO_MUTATION: gql`
    mutation TodoDelete($id: ID!) {
      todoDelete(filter: {id: $id}) {
        success
      }
    }
  `,
};
