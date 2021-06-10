import React, { useState } from 'react';
import { Text, View, Keyboard, Pressable, ScrollView } from 'react-native';

import { styles } from './styles';
import Firebase from './../../../config/firebase';
import { SafeAreaView, CommonButton, TextInputContainer } from 'components';

const LoginScreen = ({ navigation }) => {
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
    Keyboard.dismiss();
    if (type === 'LOGIN') {
      try {
        if (data.email === '' || data.password === '') {
          alert('Email or Password cannot be empty');
          return;
        }
        setisLoading(true);
        Firebase.auth()
          .signInWithEmailAndPassword(data.email, data.password)
          .then(({ user }) => {
            navigation.navigate('Home', {
              uid: user.uid,
              email: user.email,
            });
            setisLoading(false);
          })
          .catch((error) => {
            setisLoading(false);
            if (error.code === 'auth/user-not-found') {
              alert('There is no user with above email!');
            }
            if (error.code === 'auth/invalid-email') {
              alert('Email address is invalid');
            }
          });
      } catch (error) {}
    } else if (type === 'SIGNUP') {
      navigation.navigate('Signup');
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.flex}>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <View style={styles.container}>
            <Text style={styles.headerTitle}>{`ForumApp\nLogin`}</Text>
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
                secureTextEntry={true}
                placeholder={'Please Enter Password'}
                onChangeText={(newText) => _onChangeText(newText, 'PASSWORD')}
              />
            </View>
            <CommonButton
              label={'LOGIN'}
              isLoading={isLoading}
              onPress={onPress('LOGIN')}
            />
            <Pressable onPress={onPress('SIGNUP')}>
              <Text style={styles.signupText}>
                Don't have an account yet?
                <Text style={styles.boldText}>{` Sign up`}</Text>
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
