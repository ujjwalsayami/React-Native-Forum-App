import React, { useState } from 'react';
import {
  Text,
  View,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { styles } from './styles';
import Firebase from './../../../config/firebase';
import { TextInputContainer } from 'components';

const SignupScreen = ({ navigation }) => {
  const initialData = {
    email: '',
    password: '',
  };
  const [data, setdata] = useState(initialData);
  const [isLoading, setisLoading] = useState(false);

  const _onChangeText = (text, FIELD) => {
    if (FIELD == 'EMAIL') {
      setdata({
        ...data,
        email: text,
      });
    } else if (FIELD == 'PASSWORD') {
      setdata({
        ...data,
        password: text,
      });
    }
  };

  const onPress = (type) => () => {
    if (type === 'LOGIN') {
      navigation.goBack();
    } else if (type === 'SIGNUP') {
      try {
        if (data.email === '' || data.password === '') {
          alert('Email or Password cannot be empty');
          return;
        }
        setisLoading(true);
        Firebase.auth()
          .createUserWithEmailAndPassword(data.email, data.password)
          .then(() => {
            alert('User account created');
            setisLoading(false);
          })
          .catch((error) => {
            setisLoading(false);
            if (error.code === 'auth/email-already-in-use') {
              alert('Email address is already in use!');
            }
            if (error.code === 'auth/invalid-email') {
              alert('Email address is invalid');
            }
          });
        navigation.navigate('Signup');
      } catch (error) {}
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={styles.container}>
          <View style={styles.eachContainer}>
            <Text style={styles.label}>{`Email`}</Text>
            <TextInputContainer
              blurOnSubmit={false}
              returnKeyType={'next'}
              style={styles.textInput}
              defaultValue={data.email}
              keyboardType={'email-address'}
              placeholder={'Please Enter Email'}
              onChangeText={(newText) => _onChangeText(newText, 'EMAIL')}
            />
          </View>
          <View style={styles.eachContainer}>
            <Text style={styles.label}>{`Password`}</Text>
            <TextInputContainer
              blurOnSubmit={false}
              returnKeyType={'next'}
              style={styles.textInput}
              defaultValue={data.password}
              keyboardType={'email-address'}
              placeholder={'Please Enter Email'}
              onChangeText={(newText) => _onChangeText(newText, 'PASSWORD')}
            />
          </View>
          <Pressable onPress={onPress('SIGNUP')} style={styles.signInView}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.loginText}>SIGN UP</Text>
            )}
          </Pressable>
          <Pressable onPress={onPress('LOGIN')}>
            <Text style={styles.signupText}>
              Already have an account?
              <Text style={styles.boldText}>{` Login`}</Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignupScreen;
