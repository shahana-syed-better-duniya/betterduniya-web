import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/utils/auth/styles'
import { router } from 'expo-router'

const settings = () => {
  return (
    <View>
      <Text style={styles.header}>Settings</Text>
      <TouchableOpacity onPress={() => router.push('/')}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default settings