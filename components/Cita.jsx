import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

export default function Cita({ cita, eliminarPaciente }) {

    const dialogoEliminar = (id) => {
        eliminarPaciente(id);
    };

  return (
    <View style={styles.cita}>
      <View>
        <Text style={styles.label}>Paciente: </Text>
        <Text style={styles.texto}>{cita.paciente}</Text>
      </View>
      <View>
        <Text style={styles.label}>Propietario: </Text>
        <Text style={styles.texto}>{cita.propietario}</Text>
      </View>
      <View>
        <Text style={styles.label}>Síntomas: </Text>
        <Text style={styles.texto}>{cita.sintomas}</Text>
      </View>
      <View>
        <TouchableHighlight onPress={() => dialogoEliminar(cita.id)} style={styles.btnEliminar}>
            <Text style={styles.textoEliminar}>Eliminar &times;</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cita: {
    backgroundColor: "#D9D9D9",
    borderBottomColor: "#131226",
    borderStyle: "solid",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
  },
  texto: {
    fontSize: 16,
    fontStyle: "italic",
  },
  btnEliminar: {
      padding: 10,
      backgroundColor: '#c23b22',
      marginVertical: 10
  },
  textoEliminar: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center'
  },
});
