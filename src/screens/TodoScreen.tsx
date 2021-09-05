import React, {useContext} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FabButtom} from '../components/FabButtom';

import {TasksItems} from '../components/TasksItems';
import {TodoContext} from '../context/todoContext';

export const TodoScreen = () => {
  const {todoList, loading, createTodo} = useContext(TodoContext);
  const handleCreate = () => {
    createTodo();
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.HeaderTitle}>My tasks</Text>
            <Text style={styles.HeaderText}>Double tap to delete task</Text>
            <Text style={styles.HeaderText}>Hold press to edit text</Text>
          </View>
          {todoList.map(item => {
            return <TasksItems key={item.id} item={item} />;
          })}
        </View>
      </ScrollView>
      <View style={styles.bottom} />
      <FabButtom onPress={handleCreate} text={'new'} />
    </>
  );
};

const styles = StyleSheet.create({
  bottom: {
    height: 70,
  },
  container: {alignItems: 'center'},
  header: {alignItems: 'center', margin: 30},
  HeaderTitle: {fontSize: 28, fontWeight: '600', opacity: 0.6},
  HeaderText: {
    fontSize: 10,
    opacity: 0.4,
  },
});
