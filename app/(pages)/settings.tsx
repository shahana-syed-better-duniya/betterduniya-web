import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/utils/auth/styles'

const settings = () => {
  return (
    <View>
      <Text style={styles.header}>Settings</Text>
      <TouchableOpacity>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default settings