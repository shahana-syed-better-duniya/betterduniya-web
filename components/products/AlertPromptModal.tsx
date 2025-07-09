import React from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {styles} from "@/components/products/prompt-modal-styles";


export default function AlertPromptModal({visible, onCancel, title, desc}: {
  visible: boolean,
  onCancel: () => void,
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
            <TouchableOpacity onPress={onCancel}
                              style={{...styles.button, backgroundColor: '#676767',}}>
              <Text style={{...styles.btnTxt, fontSize: 18, letterSpacing: 1}}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

