import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Dimensions, StyleSheet, Platform, StatusBar, KeyboardAvoidingView, ScrollView } from 'react-native';

const { width, height } = Dimensions.get('window');

const App = () => {
  const [orientation, setOrientation] = useState('portrait');
  const [screenWidth, setScreenWidth] = useState(width);

  useEffect(() => {
    const updateLayout = () => {
      const newWidth = Dimensions.get('window').width;
      const newHeight = Dimensions.get('window').height;
      setScreenWidth(newWidth);

      setOrientation(newWidth < newHeight ? 'portrait' : 'landscape');
    };

    const dimensionListener = Dimensions.addEventListener('change', updateLayout);
    
    return () => {
      dimensionListener?.remove();
    };
  }, []);

  const buttonWidth = orientation === 'portrait' ? screenWidth * 0.9 : screenWidth * 0.4;
  const imageHeight = orientation === 'portrait' ? screenWidth * 0.45 : screenWidth * 0.1;

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <StatusBar 
          barStyle={orientation === 'portrait' ? 'dark-content' : 'light-content'}
          backgroundColor={orientation === 'portrait' ? '#fff' : '#000'}
        />
        <Image 
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} 
          style={[
            styles.image, 
            { width: screenWidth * 0.8, height: imageHeight }
          ]}
        />
        <TextInput style={styles.input} placeholder="Nhập tài khoản" />
        <TextInput style={styles.input} placeholder="Nhập mật khẩu" secureTextEntry={true} />
        <View style={[styles.buttonContainer, { flexDirection: orientation === 'portrait' ? 'column' : 'row' }]}>
          <TouchableOpacity style={[styles.button, { width: buttonWidth }]} onPress={() => {}}>
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.button, { width: buttonWidth, marginTop: orientation === 'portrait' ? 20 : 0}]} onPress={() => {}}>
            <Text style={styles.buttonText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Platform.select({
      ios: 20,
      android: 10,
    }),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 10,
    width: '90%',
    borderRadius: 5,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    width: '90%',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    marginVertical: 20,
    resizeMode: 'contain',
  },
});

export default App;
