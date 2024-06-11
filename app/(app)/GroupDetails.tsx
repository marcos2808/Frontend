// CreateGroup.tsx
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

export default function GroupDetails() {
  const { id: groupId } = useLocalSearchParams();
  console.log("🚀 ~ handleCreateGroup ~ groupId:", groupId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Group Details</Text>
      <Text style={styles.title}>Group id is: {groupId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: "#38C959",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
