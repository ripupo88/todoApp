import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Firebase} from './Firebase';

export const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.logoCont}>
        <View style={styles.imgCont}>
          <Image
            style={styles.backgImg}
            width={Dimensions.get('window').width}
            source={{
              uri: 'https://www.entrepreneurshipinabox.com/wp-content/uploads/to-do-list.jpg',
            }}
          />
        </View>
        <Text style={styles.logoTitle}>To-Do-App</Text>
        <Text style={styles.logoText}>Your Tasks List</Text>
        <Firebase />
        <Text style={styles.logoText}> in your hands</Text>
      </View>
      <View style={styles.loginCont}>
        <Text style={styles.loginTitle}>Login</Text>
        <View style={styles.formCont}>
          <Text style={styles.loginLabel}>Username</Text>
          <TextInput style={styles.textInput} />
        </View>
        <View style={styles.formCont}>
          <Text style={styles.loginLabel}>Password</Text>
          <TextInput secureTextEntry style={styles.textInput} />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('TodoScreen')}
          style={styles.loginButton}>
          <Text style={styles.botnText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  logoCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgCont: {
    height: '150%',
    position: 'absolute',
  },
  backgImg: {flex: 1, opacity: 0.35},
  logoText: {fontSize: 12, opacity: 0.4, color: 'white'},
  logoTitle: {fontSize: 30, fontWeight: '900', opacity: 0.7, color: 'white'},
  loginCont: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 2,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  loginTitle: {
    fontSize: 20,
    opacity: 0.7,
    marginTop: 15,
    fontWeight: '700',
  },
  formCont: {
    width: '80%',
  },
  loginLabel: {fontSize: 16, opacity: 0.5, marginTop: 20},
  textInput: {
    borderBottomWidth: 1,
    fontSize: 15,
    paddingBottom: -5,
  },
  loginButton: {
    borderRadius: 10,
    paddingHorizontal: 30,
    padding: 15,
    marginTop: 50,
    backgroundColor: '#4866F0',
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    elevation: 5,
  },
  botnText: {
    color: 'white',
    textShadowColor: '#000',
  },
});
