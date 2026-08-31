
import 'react-native-gesture-handler'; 
import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, TextInput, Alert, Platform, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { postLogin } from "./api/AuthApi";
import Nav from "./views/Nav";

export default function App() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [logeado, setLogeado] = useState(false);
  const [cargando, setCargando] = useState(false);

  const mostrarAlerta = (titulo, mensaje) => {
    if (Platform.OS === "web") {
      alert(`${titulo}: ${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  async function login() {
    if (!usuario.trim() || !password.trim()) {
      mostrarAlerta("Atención", "Por favor ingresa tu correo y contraseña.");
      return;
    }

    try {
      setCargando(true);
      const datos = await postLogin(usuario.toLowerCase().trim(), password);
      await AsyncStorage.setItem("token", datos.token);
      setLogeado(true);
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      mostrarAlerta("Error de autenticación", error.message || "Credenciales incorrectas");
    } finally {
      setCargando(false);
    }
  }


  if (logeado) {
    return <Nav />;
  }

 
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerContainer}>
          <Text style={styles.logoEmoji}>🚀</Text>
          <Text style={styles.titulo}>Bienvenido</Text>
          <Text style={styles.subtitulo}>Inicia sesión para continuar</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            placeholder="tucorreo@email.com"
            placeholderTextColor="#64748b"
            style={styles.input}
            value={usuario}
            onChangeText={setUsuario}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            placeholder="••••••••••••"
            placeholderTextColor="#64748b"
            secureTextEntry={true}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <Pressable 
            style={({ pressed }) => [
              styles.boton, 
              pressed && { opacity: 0.85 }
            ]} 
            onPress={login}
            disabled={cargando}
          >
            <Text style={styles.textoBoton}>
              {cargando ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: '#94a3b8',
  },
  formContainer: {
    width: '100%',
  },
  label: {
    color: '#cbd5e1',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 10,
    color: '#f8fafc',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 15,
  },
  boton: {
    backgroundColor: '#38bdf8',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#38bdf8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  textoBoton: {
    color: '#0f172a',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
