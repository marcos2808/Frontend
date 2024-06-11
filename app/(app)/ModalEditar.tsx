import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { axiosInstance } from "@/constants/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootStackParamList = {
  ModalEditar: { contactId: string; contactPhone: string; contactName: string };
  ContactList: undefined;
};

type ModalEditarRouteProp = RouteProp<RootStackParamList, "ModalEditar">;
type ModalEditarNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ModalEditar"
>;

type Contact = {
  id: string;
  name: string;
  phone: string;
};

const CONTACTS: Contact[] = [
  { id: "1", name: "Luis Romero", phone: "+1 (972) 566-2684" },
  { id: "2", name: "Jose Chacon", phone: "+1 (845) 456-2237" },
  { id: "3", name: "Marcos Vejega", phone: "+1 (959) 422-3635" },
  { id: "4", name: "Jose Mavarez", phone: "+1 (951) 472-2967" },
  { id: "5", name: "Misael Reverol", phone: "+1 (887) 478-2693" },
  { id: "6", name: "Andrea Araujo", phone: "+1 (824) 467-3579" },
  { id: "7", name: "Mario Gonzalez", phone: "+1 (862) 581-3022" },
  { id: "8", name: "Eduardo Garcia", phone: "+1 (913) 497-2020" },
];

const ModalEditar: React.FC = () => {
  const route = useRoute<ModalEditarRouteProp>();
  const navigation = useNavigation<ModalEditarNavigationProp>();
  const { contactId, contactName, contactPhone } = route.params;

  const [contact, setContact] = useState<Contact | undefined>(undefined);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    const contact = CONTACTS.find((c) => c.id === contactId);
    if (contact) {
      setContact(contact);
      setName(contact.name);
      setPhone(contact.phone);
    }
  }, [contactId]);

  const handleSave = async () => {
    try {
      const token =
        AsyncStorage.getItem("access-token", (err) => {
          if (err) return "";
        }) || "";
      const res = await axiosInstance.post(
        "http://localhost:7338/",
        { name, phone },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        defaultValue={contactName}
      />
      <Text style={styles.label}>Phone:</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        defaultValue={contactPhone}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
    marginBottom: 16,
  },
});

export default ModalEditar;
