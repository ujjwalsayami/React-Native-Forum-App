import React from 'react';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { Text, View, StyleSheet, Pressable } from 'react-native';

const DiscussionCard = ({
  item,
  onPress,
  onEdit,
  onDelete,
  currentUserEmail,
}) => (
  <View style={styles.card}>
    <View style={styles.editView}>
      <Text style={[styles.label, styles.boldText]} numberOfLines={1}>
        {item.roomName}
      </Text>
      {item?.createdBy === currentUserEmail && (
        <>
          <Pressable onPress={onDelete} style={styles.editBtn}>
            <AntDesign
              name="delete"
              size={18}
              color="#2C84FC"
              style={styles.deleteIcon}
            />
          </Pressable>
          <Pressable onPress={onEdit} style={styles.editBtn}>
            <FontAwesome name="edit" size={18} color="#2C84FC" />
          </Pressable>
        </>
      )}
    </View>
    <Text style={styles.label} numberOfLines={3}>
      {item.description}
    </Text>
    <Pressable onPress={onPress} style={styles.row}>
      <Text
        style={[styles.label, styles.boldText, styles.textAlign]}
        numberOfLines={1}
      >
        {'Join Forum'}
      </Text>
      <Ionicons name="caret-forward-outline" size={18} color="#2C84FC" />
    </Pressable>
  </View>
);

export { DiscussionCard };

const styles = StyleSheet.create({
  card: {
    height: 112,
    marginVertical: 6,
    marginHorizontal: 16,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  label: {
    fontSize: 14,
    lineHeight: 19,
    color: '#2A2A2A',
    textAlign: 'left',
  },
  boldText: {
    width: '80%',
    color: '#2C84FC',
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textAlign: {
    textAlign: 'right',
  },
  editView: {
    marginVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteIcon: {
    paddingHorizontal: 12,
  },
});
