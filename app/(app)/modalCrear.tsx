import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "@/store/auth";

export default function ModalScreen() {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumberP, setPhoneNumberP] = useState("");
  const [phoneNumberW, setPhoneNumberW] = useState("");
  const [phoneNumberH, setPhoneNumberH] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:7338/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer`
        },
        body: JSON.stringify({
          firsName: firstName,
          lastName,
          phoneNumberP,
          phoneNumberW,
          phoneNumberH,
          email,
          address,
        }),
      });
      console.log(response.status);
      if (response.ok) {
        Alert.alert("Contacto creado exitosamente");
        setModalVisible(false);
        navigation.goBack();
      } else {
        Alert.alert("Error al crear contacto. Por favor, intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error al crear contacto. Por favor, intenta nuevamente.");
    }
  };

  const onCloseButton = () => {
    navigation.goBack();
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onCloseButton}
    >
      <KeyboardAvoidingView
        style={styles.centeredView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.modalView}>
          <Text style={styles.title}>Añadir Contacto</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Número telefónico (Personal)"
            value={phoneNumberP}
            onChangeText={(text) => setPhoneNumberP(text)}
            keyboardType="phone-pad"
          />

          <TextInput
            style={styles.input}
            placeholder="Número telefónico (Casa)"
            value={phoneNumberH}
            onChangeText={(text) => setPhoneNumberH(text)}
            keyboardType="phone-pad"
          />

          <TextInput
            style={styles.input}
            placeholder="Número telefónico (Trabajo)"
            value={phoneNumberW}
            onChangeText={(text) => setPhoneNumberW(text)}
            keyboardType="phone-pad"
          />

          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Dirección"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.profileActionText}>Añadir Contacto</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onCloseButton}
          >
            <Text style={styles.profileActionText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#9ca1ac",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#007bff",
  },
  profileActionText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
});
