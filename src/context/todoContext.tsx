import React, {useEffect, useState} from 'react';
import {createContext} from 'react';
import {graphqlClient} from '../graphql/client';

export interface TodoList {
  completed: boolean;
  id: string;
  text: string;
}

interface TodoInterface {
  todoList: TodoList[];
  loading: boolean;
  createTodo: () => void;
  toggleTodo: (id: string, completed: boolean) => void;
  editTodo: (id: string, text: string) => void;
  deleteTodo: (id: string) => void;
}

export const TodoContext = createContext({} as TodoInterface);

export const TodoProvider = ({children}: any) => {
  const [todoList, setTodoList] = useState<TodoList[]>([
    {text: 'Primera Tarea', completed: false, id: '6a54sd6a5'},
    {text: 'Segunda Tarea', completed: false, id: '6a5asda5'},
    {text: 'Tercera Tarea', completed: true, id: '66a4s85da5'},
  ]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isClosed = false;
    try {
      graphqlClient({query: 'TODO_LIST_QUERY'}).then(resp => {
        if (!isClosed) {
          setTodoList(resp);
          setLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
    return () => {
      isClosed = true;
    };
  }, []);

  const createTodo = () => {
    graphqlClient({
      query: 'CREATE_TODO_MUTATION',
      variables: {data: {text: 'New task', completed: false}},
    }).then(resp => {
      setTodoList(List => [...List, ...resp]);
    });
  };

  const toggleTodo = (id: string, completed: boolean) => {
    graphqlClient({
      query: 'TOGGLE_TODO_QUERY',
      variables: {id, completed},
    }).then(() => {
      try {
        graphqlClient({query: 'TODO_LIST_QUERY'}).then(resp => {
          setTodoList(resp);
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
      }
    });
  };
  const editTodo = (id: string, text: string) => {
    graphqlClient({
      query: 'EDIT_TODO_MUTATION',
      variables: {id, text},
    }).then(() => {
      try {
        graphqlClient({query: 'TODO_LIST_QUERY'}).then(resp => {
          setTodoList(resp);
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
      }
    });
  };
  const deleteTodo = (id: string) => {
    graphqlClient({
      query: 'DELETE_TODO_MUTATION',
      variables: {id},
    }).then(() => {
      try {
        graphqlClient({query: 'TODO_LIST_QUERY'}).then(resp => {
          setTodoList(resp);
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <TodoContext.Provider
      value={{todoList, loading, createTodo, toggleTodo, editTodo, deleteTodo}}>
      {children}
    </TodoContext.Provider>
  );
};
