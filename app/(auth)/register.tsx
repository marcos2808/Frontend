import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native"; 
import { useState } from "react";
import { axiosInstance, userEndpoints } from "@/constants/axiosInstance";
import { Link, useRouter } from "expo-router";

function SignUpScreen() {
	const router = useRouter();
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [formData, setFormData] = useState<{
    username: string;
    numeroTlf: string;
    email: string;
    password: string;
  }>({
    username: "",
    numeroTlf: "",
    email: "",
    password: "",
  });
  const [errorMessages, setErrorMessages] = useState<{
    username: string;
    NumeroTlf: string;
    email: string;
    password: string;
  }>({
    username: "",
    NumeroTlf: "",
    email: "",
    password: "",
  });

  const handleSignUp = async () => {
    const errors: {
      username: string;
      NumeroTlf: string;
      email: string;
      password: string;
    } = {
      username: "",
      NumeroTlf: "",
      email: "",
      password: "",
    };

    if (formData.username.trim() === "") {
      errors.username = "Por favor ingrese un nombre";
    }

    // if (!/^\d+$/.test(formData.numeroTlf)) {
    //   errors.NumeroTlf = "El número de teléfono debe contener solo números";
    // }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Por favor ingrese un correo electrónico válido";
    }

    if (formData.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (formData.password !== repeatPassword) {
      errors.password = "Las contraseñas no coinciden";
    }

    setErrorMessages(errors);

    if (
      errorMessages.username ||
      errorMessages.email ||
      errorMessages.password
    ) {
      Alert.alert("Error", "Por favor revise los campos marcados en rojo");
      return;
    }

    await axiosInstance
      .post(userEndpoints.register, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
      .then(async (response) => {
        Alert.alert(
          "Registro Exitoso",
          "Su cuenta ha sido creada exitosamente. Se envió un correo a su cuenta, por favor verifique e inicie sesión."
        );
				router.replace("/(auth)/login")
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(
          "Error",
          "Hubo un problema al intentar registrarse. Por favor, inténtelo de nuevo más tarde."
        );
      });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Crear Cuenta</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#888"
          value={formData.username}
          onChangeText={(text) => setFormData({ ...formData, username: text })}
          autoCapitalize="none"
        />
        {errorMessages.username ? (
          <Text style={styles.errorMessage}>{errorMessages.username}</Text>
        ) : null}

        {/* <TextInput
          style={styles.input}
          placeholder="Numero de Telefono"
          placeholderTextColor="#888"
          value={formData.numeroTlf}
          onChangeText={(text) => setFormData({ ...formData, numeroTlf: text })}
          keyboardType="phone-pad"
          autoCapitalize="none"
        /> */}
        {errorMessages.NumeroTlf ? (
          <Text style={styles.errorMessage}>{errorMessages.NumeroTlf}</Text>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          placeholderTextColor="#888"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errorMessages.email ? (
          <Text style={styles.errorMessage}>{errorMessages.email}</Text>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#888"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          secureTextEntry
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar Contraseña"
          placeholderTextColor="#888"
          value={repeatPassword}
          onChangeText={(text) => setRepeatPassword(text)}
          secureTextEntry
          autoCapitalize="none"
        />
        {errorMessages.password ? (
          <Text style={styles.errorMessage}>{errorMessages.password}</Text>
        ) : null}

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

				<Link href="/(auth)/login" asChild>
        <TouchableOpacity>
          <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </Link>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    alignSelf: "center",
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    height: 50,
    width: "100%",
    backgroundColor: "#007AFF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    marginBottom: 10,
  },
	linkText: {
    color: "#007AFF",
    fontSize: 16,
    marginTop: 10,
		textAlign: "center",
  },
});

export default SignUpScreen;
