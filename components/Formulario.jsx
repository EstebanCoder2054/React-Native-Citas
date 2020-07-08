import { StatusBar } from "expo-status-bar";
import React, { useState, Fragment } from "react";
import shortid from 'shortid';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal,
  TouchableOpacity,
  ScrollView,
  Button,
  TouchableHighlight,
  Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Formulario = ({citas, setCitas}) => {
  const [showModal, setShowModal] = useState(false);
  const [paciente, setPaciente] = useState("");
  const [propietario, setPropietario] = useState("");
  const [telefono, setTelefono] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmarFecha = (date) => {
    const opciones = {
      year: "numeric",
      month: "long",
      day: "2-digit",
    };
    setFecha(date.toLocaleDateString("es-ES", opciones));
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmarHora = (time) => {
    const opciones = {
      hour: "numeric",
      minute: "2-digit",
    };
    setHora(time.toLocaleString("en-US", opciones));
    hideTimePicker();
  };

  const crearCita = () => {
    if (
      paciente.trim() === "" ||
      propietario.trim() === "" ||
      telefono.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      mostrarAlerta();
      return;
    }

    const cita = {
      paciente,
      propietario,
      telefono,
      fecha,
      hora,
      sintomas
    }

    cita.id = shortid.generate();

    // Agregar la cita al state del padre
    const citasNuevo = [...citas, cita];
    setCitas(citasNuevo);

    // Ocultar el formulario
    setShowModal(false);

    // Resetear el formulario
    setPaciente('');
    setPropietario('');
    setTelefono('');
    setFecha('');
    setHora('');
    setSintomas('');
  };

  const mostrarAlerta = () => {
    Alert.alert(
     'Oops', //título
     'Todos los campos son obliigatorios' //cuerpo - mensaje
     [{
       text: 'Entendido' //Arreglo de botones
     }] 
    )
  }

  return (
    <Fragment>
      <View style={styles.formulario}>
        <TouchableOpacity
          style={styles.btnAgregar}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.textoAgregar}>Agregar cita</Text>
        </TouchableOpacity>

        <Modal visible={showModal ? true : false} animationType="slide">
          <ScrollView>
            <View>
              <Text style={styles.label}>Paciente: </Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre del paciente"
                onChangeText={(texto) => {
                  setPaciente(texto);
                }}
                keyboardType="default"
                value={paciente}
              />
            </View>

            <View>
              <Text style={styles.label}>Dueño: </Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre del dueño"
                onChangeText={(texto) => {
                  setPropietario(texto);
                }}
                keyboardType="default"
                value={propietario}
              />
            </View>

            <View>
              <Text style={styles.label}>Teléfono de contacto: </Text>
              <TextInput
                style={styles.input}
                placeholder="agrega el número de contacto"
                onChangeText={(texto) => {
                  setTelefono(texto);
                }}
                keyboardType="numeric"
                value={telefono}
              />
            </View>

            <View>
              <Text style={styles.label}>Síntomas: </Text>
              <TextInput
                multiline
                style={styles.input}
                placeholder="Describe los síntomas"
                onChangeText={(texto) => {
                  setSintomas(texto);
                }}
                keyboardType="default"
                value={sintomas}
              />
            </View>

            <View>
              <Text style={styles.label}>Fecha:</Text>
              <Button title="Seleccionar Fecha" onPress={showDatePicker} />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={confirmarFecha}
                onCancel={hideDatePicker}
                locale="es_ES"
                headerTextIOS="Elige una fecha"
                confirmTextIOS="Confirmar"
                cancelTextIOS="Cancelar"
              />
              <Text>{fecha}</Text>
            </View>

            <View>
              <Text style={styles.label}>Hora:</Text>
              <Button title="Seleccionar hora" onPress={showTimePicker} />
              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={confirmarHora}
                onCancel={hideTimePicker}
                locale="es_ES"
                headerTextIOS="Elige una hora"
                confirmTextIOS="Confirmar"
                cancelTextIOS="Cancelar"
              />
              <Text>{hora}</Text>
            </View>

            <View style={styles.btnContenedor}>
              <TouchableOpacity
                style={styles.btnCerrarModal}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.textoAgregar}>Cerrar Modal</Text>
              </TouchableOpacity>

              <TouchableHighlight
                style={styles.btnAgregar}
                onPress={() => crearCita()}
              >
                <Text style={styles.textoAgregar}>Agregar Cita</Text>
              </TouchableHighlight>
            </View>
          </ScrollView>
        </Modal>
      </View>
    </Fragment>
  );
};

export default Formulario;

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: "2.5%",
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#BAB7C3",
    borderRadius: 30,
    paddingHorizontal: 16,
    color: "black",
    fontWeight: "600",
  },
  btnAgregar: {
    padding: 10,
    backgroundColor: "green",
    marginVertical: 10,
  },
  textoAgregar: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  btnCerrarModal: {
    padding: 10,
    backgroundColor: "#c23b22",
    marginVertical: 10,
  },
  btnContenedor: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
