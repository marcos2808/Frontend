import { useState } from "react";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { View } from "@/components/Themed";
import { axiosInstance, userEndpoints } from "@/constants/axiosInstance";
import { useAuthStore } from "@/store/auth";

export default function LoginScreen() {
  const doLogin = useAuthStore((state) => state.doLogin);
  let i = 0;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    // Maneja la lógica de inicio de sesión aquí
    axiosInstance
      .post(userEndpoints.login, {
        user_info: email,
        password: password,
      })
      .then((response) => {
        const { id: userId, token } = response.data;
        Alert.alert("Login exitoso", "¡Bienvenido!");
        doLogin(userId, token);
        // El _layout principal se encarga de navegar a la pantalla de inicio cuando se haya seteado el token
        console.log(token)
      })
      .catch((error) => {
        console.log(error.message);
        Alert.alert(
          "Error",
          "Hubo un problema al intentar ingresar a su cuenta. Por favor, inténtelo de nuevo más tarde."
        );
        console.log(i++)
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de Sesión</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <Link href="/(auth)/register" asChild>
        <TouchableOpacity>
          <Text style={styles.linkText}>¿No tienes cuenta? Crea una aquí</Text>
        </TouchableOpacity>
      </Link>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
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
  linkText: {
    color: "#007AFF",
    fontSize: 16,
    marginTop: 10,
  },
});
