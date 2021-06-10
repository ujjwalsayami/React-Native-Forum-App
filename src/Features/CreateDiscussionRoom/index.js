import React, { useState } from 'react';
import { Text, View, ScrollView, Keyboard } from 'react-native';

import { styles } from './styles';
import { TextInputContainer, CommonButton } from 'components';
import { firestoreDb } from './../../config/firebase';

const CreateDiscussionRoom = ({ route }) => {
  const initialData = {
    roomName: '',
    description: '',
  };
  const { email } = route.params;

  const [data, setdata] = useState(initialData);
  const [isLoading, setisLoading] = useState(false);

  const onPress = (type) => () => {
    if (type === 'CREATE') {
      if (data.roomName === '' || data.description === '') {
        alert('Room Name or Description cannot be empty!');
        return;
      }
      Keyboard.dismiss();
      setisLoading(true);
      firestoreDb
        .collection('Main')
        .add({
          roomName: data.roomName,
          createdBy: email,
          description: data.description,
        })
        .then(() => {
          setdata({
            description: '',
            roomName: '',
          });
          setisLoading(false);
          alert(`${data.roomName} Discussion room created Successfully!`);
          navigation.goBack();
        })
        .catch(() => {
          // alert('Something went wrong');
          setisLoading(false);
        });
    }
  };
  const _onChangeText = (text, FIELD) => {
    if (FIELD == 'ROOM_NAME') {
      setdata({
        ...data,
        roomName: text,
      });
    } else if (FIELD == 'DESCRIPTION') {
      setdata({
        ...data,
        description: text,
      });
    }
  };
  return (
    <View style={styles.flex}>
      <ScrollView keyboardShouldPersistTaps={'handled'} scrollEnabled={false}>
        <View style={styles.eachContainer}>
          <Text style={styles.label}>{`Room Name`}</Text>

          <TextInputContainer
            blurOnSubmit={false}
            returnKeyType={'next'}
            style={styles.textInput}
            defaultValue={data.roomName}
            keyboardType={'email-address'}
            placeholder={'Please Enter Room Name'}
            onChangeText={(newText) => _onChangeText(newText, 'ROOM_NAME')}
          />
        </View>
        <View style={styles.eachContainer}>
          <Text style={styles.label}>{`Description`}</Text>
          <TextInputContainer
            blurOnSubmit={false}
            returnKeyType={'next'}
            multiline={true}
            style={[styles.textInput, styles.textInputDes]}
            defaultValue={data.description}
            keyboardType={'email-address'}
            placeholder={'Please Enter Description'}
            onChangeText={(newText) => _onChangeText(newText, 'DESCRIPTION')}
          />
        </View>

        <CommonButton
          label={'CREATE'}
          isLoading={isLoading}
          onPress={onPress('CREATE')}
        />
      </ScrollView>
    </View>
  );
};

export default CreateDiscussionRoom;
