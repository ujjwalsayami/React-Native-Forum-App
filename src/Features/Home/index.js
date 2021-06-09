import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Modal,
  FlatList,
  TextInput,
  Pressable,
  Platform,
  Keyboard,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { styles } from './styles';
import Firebase, { firestoreDb } from '../../config/firebase';
import { SafeAreaView, DiscussionCard } from 'components';

const emptyComponent = () => {
  return (
    <View style={styles.emptyView}>
      <Text style={styles.label}>No Discussion Rooms created!</Text>
    </View>
  );
};

const renderItem = (onPress, onEdit, onDelete, currentUserEmail) => ({
  item,
}) => (
  <DiscussionCard
    item={item}
    onPress={onPress(item)}
    onEdit={onEdit(item)}
    onDelete={onDelete(item)}
    currentUserEmail={currentUserEmail}
  />
);

const keyExtractor = (item) => `${item._id}`;

const Home = ({ route, navigation }) => {
  const { uid, email } = route.params;
  const [data, setdata] = useState([]);
  const [roomName, setroomName] = useState('');
  const [roomId, setroomId] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [isModalVisible, setisModalVisible] = useState(false);

  const _closeModal = () => {
    Keyboard.dismiss();
    setisModalVisible(!isModalVisible);
  };

  const onPress = (type) => () => {
    if (type === 'CREATE')
      navigation.navigate('CreateDiscussion', { uid, email });
    if (type === 'LOGOUT') {
      Firebase.auth().signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  };

  const onPressRoom = (item) => () => {
    navigation.navigate('DiscussionRoom', {
      uid,
      email,
      data: item,
      roomName: item.roomName,
    });
  };
  const onEdit = (item) => () => {
    setroomId(item._id);
    setisModalVisible(!isModalVisible);
  };

  const onDelete = (item) => () => {
    try {
      firestoreDb.collection('Main');
      jobskill_query.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          if (doc.id === item._id) {
            doc.ref.delete();
            return;
          }
          return;
        });
      });
    } catch (error) {}
  };

  const _onChangeRoomName = () => {
    Keyboard.dismiss();
    if (roomId && roomName) {
      firestoreDb.collection('Main').doc(roomId).update({ roomName: roomName });
    }
    setisModalVisible(!isModalVisible);
    return;
  };

  useEffect(() => {
    const unsubscribe = firestoreDb
      .collection('Main')
      .onSnapshot((querySnapshot) => {
        const threads = querySnapshot.docs.map((documentSnapshot) => {
          return {
            _id: documentSnapshot.id,
            name: '',
            ...documentSnapshot.data(),
          };
        });

        setdata(threads);

        if (isLoading) {
          setisLoading(false);
        }
      });
    return () => unsubscribe();
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.flex}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Home</Text>
          <Pressable style={styles.logoutView} onPress={onPress('LOGOUT')}>
            <MaterialIcons size={24} name={'logout'} color={'#2C84FC'} />
          </Pressable>
        </View>
        <Pressable onPress={onPress('CREATE')} style={styles.button}>
          <Ionicons size={24} name={'add-outline'} color={'#fff'} />
        </Pressable>
        {isLoading ? (
          <ActivityIndicator size="small" color="#2C84FC" />
        ) : (
          <FlatList
            data={data}
            initialNumToRender={5}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem(onPressRoom, onEdit, onDelete, email)}
            contentContainerStyle={styles.flatListStyles}
            ListEmptyComponent={() => !isLoading && emptyComponent()}
          />
        )}
      </View>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={isModalVisible}
        statusBarTranslucent
        onRequestClose={_closeModal}
      >
        <View style={styles.modalView}>
          <Text style={styles.overlay} onPress={_closeModal} />
          <KeyboardAvoidingView
            enabled
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={Platform.select({
              ios: () => 0,
              android: () => 24,
            })()}
            style={styles.modalView}
            pointerEvents="box-none"
          >
            <View style={styles.roomNameInputWrapper}>
              <View style={styles.eachContainer}>
                <Text style={styles.label}>{`Room Name`}</Text>
                <TextInput
                  value={roomName}
                  returnKeyType={'done'}
                  style={styles.textInput}
                  keyboardType={'email-address'}
                  placeholder={'Please Enter Name'}
                  onSubmitEditing={_onChangeRoomName}
                  onChangeText={(newText) => setroomName(newText)}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;
