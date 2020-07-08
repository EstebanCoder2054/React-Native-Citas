import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Cita from "./components/Cita";
import Formulario from "./components/Formulario";

export default function App() {
  const [citas, setCitas] = useState([]);

  //Eliminar pacientes del state
  const eliminarPaciente = (id) => {
    setCitas((stateActual) => {
      return stateActual.filter((cita) => cita.id !== id);
    });
  };

  const cerrarTeclado = () => {
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style={styles.contenedor}>
        <StatusBar style="light" />

        <Text style={styles.titulo}>Administrador de citas</Text>

        <Formulario citas={citas} setCitas={setCitas} />

        <Text style={styles.titulo}>
          {citas.length > 0 ? "Administra tus citas" : "No hay citas"}{" "}
        </Text>

        <FlatList
          data={citas}
          renderItem={({ item }) => (
            <Cita cita={item} eliminarPaciente={eliminarPaciente} />
          )}
          keyExtractor={(cita) => cita.id}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#2D5955",
  },
  titulo: {
    color: "#FFF",
    marginTop: 40,
    marginBottom: 20,
    fontSize: 24,
    textAlign: "center",
  },
});
