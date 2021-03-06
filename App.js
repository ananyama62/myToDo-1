import React, { useState} from "react";
import { View, StatusBar, FlatList } from "react-native";
import styled from "styled-components";
import AddInput from "./components/AddInput";
import TodoList from "./components/TodoList";
import Empty from "./components/Empty";
import Header from "./components/Header";
import firestore from '@react-native-firebase/firestore';

export default function App() {
  const [data, setData] = useState([]);

  const submitHandler = (value, date) => {
    setData((prevTodo) => {
      return [
        {
          value: value,
          date: date.toISOString().slice(0, 10),
          key: Math.random().toString(),
        },
        ...prevTodo,
      ];
    });
  };

  const deleteItem = (key) => {
    firestore()
      .collection('Taskdatatest')
      .doc(key).delete()
  };

  const searchItem = (keyword) => {

  }

  return (
    <ComponentContainer>
      <View>
        <StatusBar barStyle="light-content" backgroundColor="#99FF33" />
      </View>
      <View>
        <FlatList
          data={data}
          ListHeaderComponent={() => <Header searchItem={searchItem} />}
          ListEmptyComponent={() => <Empty />}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <TodoList item={item} deleteItem={deleteItem} />
          )}
        />
        <View>
          <AddInput submitHandler={submitHandler} />
        </View>
      </View>
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  background-color: #99FF33;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;