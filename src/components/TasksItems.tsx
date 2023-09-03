import React, {useContext, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import LottieView from 'lottie-react-native';

import {
  LongPressGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';

import {TodoContext, TodoList} from '../context/todoContext';
import {useEffect} from 'react';

type Props = {
  item: TodoList;
};

export const TasksItems = ({item}: Props) => {
  const {toggleTodo, editTodo, deleteTodo} = useContext(TodoContext);
  const [text, setText] = useState(item.text);
  const [editable, setEditable] = useState(text === 'New task' ? true : false);

  const lottieCheck = useRef<LottieView>(null);
  const lottieEdit = useRef<LottieView>(null);

  useEffect(() => {
    if (item.completed) {
      lottieCheck.current?.play(98, 99);
    } else {
      lottieCheck.current?.play(58, 59);
    }
  }, [item.completed]);

  const handleToogle = () => {
    toggleTodo(item.id, !item.completed);
    if (!item.completed) {
      lottieCheck.current?.play(59, 99);
    } else {
      lottieCheck.current?.play(0, 59);
    }
  };

  const Eventhandler = () => {
    setEditable(true);
  };

  const doubleTapHandler = () => {
    deleteTodo(item.id);
  };

  const handleTextXhange = (e: string) => {
    setText(e);
  };

  const handleOnblur = () => {
    setEditable(false);
    editTodo(item.id, text);
  };

  return (
    <View style={styles.task} key={item.id}>
      {editable ? (
        <>
          <View style={styles.leftCont}>
            <TextInput
              testID={'TextInput'}
              autoFocus
              selection={
                text === 'New task' ? {start: 0, end: text.length} : undefined
              }
              selectTextOnFocus
              onBlur={handleOnblur}
              onChangeText={handleTextXhange}
              value={text}
              style={styles.textInput}
            />
          </View>
          <TouchableOpacity activeOpacity={1} onPress={handleToogle}>
            <View style={styles.containEdit}>
              <LottieView
                ref={lottieEdit}
                loop={false}
                autoPlay
                resizeMode={'cover'}
                style={styles.check}
                source={require('../assets/edit.json')}
              />
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <LongPressGestureHandler onActivated={Eventhandler}>
            <TapGestureHandler numberOfTaps={2} onActivated={doubleTapHandler}>
              <View testID={'TextCont'} style={styles.leftCont}>
                <Text
                  testID={'Text'}
                  style={[
                    styles.tasksText,
                    item.completed && styles.tasksDoneText,
                  ]}>
                  {text}
                </Text>
              </View>
            </TapGestureHandler>
          </LongPressGestureHandler>
          <TouchableOpacity activeOpacity={1} onPress={handleToogle}>
            <View style={styles.containCheck}>
              <LottieView
                ref={lottieCheck}
                loop={false}
                resizeMode={'cover'}
                style={styles.check}
                source={require('../assets/check.json')}
              />
            </View>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  leftCont: {
    flex: 1,
    justifyContent: 'center',
    height: 50,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 100,
    shadowOffset: {
      width: 5,
      height: 10,
    },
    shadowOpacity: 1,
    elevation: 5,
  },
  tasksText: {
    fontSize: 18,
    fontWeight: '600',
    opacity: 0.6,
  },
  tasksDoneText: {
    fontSize: 18,
    fontWeight: '300',
    opacity: 0.4,
    textDecorationLine: 'line-through',
  },
  containCheck: {
    width: 50,
    height: 50,
  },
  containEdit: {
    width: 30,
    height: 30,
  },
  check: {
    flex: 1,
  },
  textInput: {
    fontSize: 18,
    fontWeight: '600',
    opacity: 0.6,
  },
});
