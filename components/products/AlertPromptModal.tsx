import { styles } from "@/components/products/prompt-modal-styles";
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';


export default function AlertPromptModal({visible, onCancel, title, desc}: {
  visible: boolean,
  onCancel: () => void,
  title?: string,
  desc: string,
}) {
  return (
    <Modal 
      transparent 
      visible={visible} 
      animationType="fade"
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{desc}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onCancel}
                              style={styles.button}>
              <Text style={{...styles.btnTxt, fontSize: 16, letterSpacing: 1, color: '#F5F5F5'}}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

