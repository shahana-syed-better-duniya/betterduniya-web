import { View, Text, Modal, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import {styles} from "@/components/products/prompt-modal-styles";

const ExpandImg = ({visible, imgUrl, onClose} : {visible: boolean, imgUrl: string, onClose: () => void})  => {
  return (
    <Modal transparent visible={visible} animationType="fade">
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.overlay}>
                <Image
                    source={{uri: imgUrl}}
                    style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain",
                }}
                />
            </View>
        </TouchableWithoutFeedback>
    </Modal>
  )
}

export default ExpandImg