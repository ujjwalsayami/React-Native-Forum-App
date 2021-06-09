import React, { useEffect, useState } from 'react';
import { Text, FlatList, Pressable, View, Keyboard } from 'react-native';

import { styles } from './styles';
import { TextInputContainer } from 'components';
import { firestoreDb } from './../../config/firebase';

const HeaderComponent = ({ data }) => (
  <>
    <Text style={[styles.label, styles.boldText]}>
      {`Welcome to ${data.roomName} Discussion Room`}
    </Text>
    <View style={styles.headerDescView}>
      <Text style={styles.descText}>{data.description}</Text>
    </View>
  </>
);

const FooterComponent = ({ showInput, onPress, _onChangeText, _submit }) => (
  <>
    <View style={styles.replyContainer}>
      {showInput ? (
        <Pressable onPress={onPress}>
          <Text style={[styles.label, styles.boldText]}>Reply</Text>
        </Pressable>
      ) : (
        <TextInputContainer
          // multiline={true}
          returnKeyType={'done'}
          style={styles.textInput}
          keyboardType={'email-address'}
          placeholder={'Reply here...'}
          onSubmitEditing={_submit}
          keyboardShouldPersistTaps={'handled'}
          onChangeText={(newText) => _onChangeText(newText)}
        />
      )}
    </View>
  </>
);

const CommentList = ({ item }) => {
  return (
    <View style={styles.commentView}>
      <Text style={styles.descText}>
        {item.comment}
        <Text style={styles.boldText}>{` - ${item.user.name}`}</Text>
      </Text>
    </View>
  );
};

const renderItem = () => ({ item }) => <CommentList item={item} />;

const keyExtractor = (item) => `${item._id}`;

const DiscussionRoom = ({ route }) => {
  const { uid, email, data } = route.params;
  const [showInput, setshowInput] = useState(true);
  const [comment, setcomment] = useState('');
  const [commentData, setCommentData] = useState([]);

  const onPress = () => setshowInput(!showInput);
  const _onChangeText = (text) => {
    setcomment(text);
  };

  const _submit = () => {
    Keyboard.dismiss();
    if (comment) {
      firestoreDb
        .collection('Main')
        .doc(data._id)
        .collection('Discussions')
        .add({
          comment,
          createdAt: new Date().getTime(),
          user: {
            _id: uid,
            email: email,
          },
        });
      setshowInput(!showInput);
    }
  };

  useEffect(() => {
    const firestoreListener = firestoreDb
      .collection('Main')
      .doc(data._id)
      .collection('Discussions')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const comments = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();
          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.email,
            };
          }

          return data;
        });
        setCommentData(comments);
      });

    return () => firestoreListener();
  }, []);

  return (
    <View style={styles.flex}>
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={<HeaderComponent data={data} />}
          data={commentData}
          initialNumToRender={5}
          renderItem={renderItem()}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <FooterComponent
              showInput={showInput}
              onPress={onPress}
              _onChangeText={_onChangeText}
              _submit={_submit}
            />
          }
        />
      </View>
    </View>
  );
};

export default DiscussionRoom;
