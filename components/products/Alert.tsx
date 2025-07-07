import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';


export default function BackPromptModal({visible, onCancel, onConfirm, title, desc}: {
  visible: boolean,
  onCancel: () => void,
  onConfirm: () => void,
  title?: string,
  desc: string,
}) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{desc}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onCancel} style={styles.button}>
              <Text style={styles.btnTxt}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} style={styles.button}>
              <Text style={styles.btnTxt}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: 300,
    backgroundColor: '#FFBF00',
    borderRadius: 25,
    padding: 20,
    alignItems: 'center',
  },
  title: {fontSize: 18, fontWeight: 'bold', color: 'white'},
  message: {marginTop: 10, fontSize: 17, textAlign: 'center', color: 'white'},
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#ddd',
    borderRadius: 50,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  btnTxt: {
    fontWeight: 800,
    color: 'white',
  }
});
