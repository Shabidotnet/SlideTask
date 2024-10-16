import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {icons} from './Assets';
import Home from './src/Screen/Home';
const initialData = [
  {id: '1', text: 'Item 1', date: '2024-07-11 7:45 PM', pinned: false},
  {id: '2', text: 'Item 2', date: '2024-07-11 7:45 PM', pinned: false},
  {id: '3', text: 'Item 3', date: '2024-07-11 7:45 PM', pinned: false},
  {id: '4', text: 'Item 4', date: '2024-07-11 7:45 PM', pinned: false},
  {id: '5', text: 'Item 5', date: '2024-07-11 7:45 PM', pinned: false},
  {id: '6', text: 'Item 6', date: '2024-07-11 7:45 PM', pinned: false},
  {id: '7', text: 'Item 7', date: '2024-07-11 7:45 PM', pinned: false},
  {id: '8', text: 'Item 8', date: '2024-07-11 7:45 PM', pinned: false},
  {id: '9', text: 'Item 9', date: '2024-07-11 7:45 PM', pinned: false},
  {id: '10', text: 'Item 10', date: '2024-07-11 7:45 PM', pinned: false},
];

const SlideAction = () => {
  const [data, setData] = useState(initialData);
  const swipeableRefs = useRef(new Map());

  const handlePin = item => {
    setData(prevData =>
      prevData
        .map(i => (i.id === item.id ? {...i, pinned: true} : i))
        .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)),
    );
    closeSwipeable(item.id);
  };

  const handleUnpin = item => {
    setData(prevData =>
      prevData
        .map(i => (i.id === item.id ? {...i, pinned: false} : i))
        .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)),
    );
    closeSwipeable(item.id);
  };

  const handleDelete = item => {
    setData(prevData => prevData.filter(i => i.id !== item.id));
    closeSwipeable(item.id);
  };

  const closeSwipeable = id => {
    const swipeable = swipeableRefs.current.get(id);
    if (swipeable) {
      swipeable.close();
    }
  };

  const renderRightActions = () => {
    return (
      <View style={styles.pinButton}>
        <Image
          source={icons.pin}
          style={styles.pinIcon}
          tintColor={'#fff'}
          resizeMode="contain"
        />
      </View>
    );
  };

  const renderLeftActions = item => {
    return (
      <View style={item.pinned ? styles.unpinButton : styles.deleteButton}>
        <Image
          source={item.pinned ? icons.pin : icons.bin}
          style={styles.actionIcon}
          tintColor={'#fff'}
          resizeMode="contain"
        />
      </View>
    );
  };

  const renderItem = ({item}) => {
    return (
      <Swipeable
        ref={ref => {
          if (ref && !swipeableRefs.current.has(item.id)) {
            swipeableRefs.current.set(item.id, ref);
          }
        }}
        renderRightActions={() => renderRightActions()}
        renderLeftActions={() => renderLeftActions(item)}
        onSwipeableOpen={direction => {
          if (direction === 'right') {
            handlePin(item);
          } else if (direction === 'left') {
            if (item.pinned) {
              handleUnpin(item);
            } else {
              handleDelete(item);
            }
          }
        }}>
        <View style={styles.item}>
          <View style={styles.itemSubView}>
            <Text style={styles.nameTxt}>{item.text}</Text>
            <Text style={styles.dateTxt}>{item.date}</Text>
            {item.pinned ? (
              <Image
                source={icons.pin}
                style={[styles.pinIcon, {marginRight: 0}]}
                tintColor={'rgba(40,204,248,1)'}
                resizeMode="contain"
              />
            ) : null}
          </View>
          <Text style={styles.detailTxt}>{item.text}</Text>
        </View>
      </Swipeable>
    );
  };

  return (
    <Home />
    // <GestureHandlerRootView style={styles.container}>
    //   <FlatList
    //     data={data}
    //     keyExtractor={item => item.id}
    //     renderItem={renderItem}
    //     showsVerticalScrollIndicator={false}
    //   />
    // </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: 'rgba(30,33,43,1)',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  item: {
    padding: 20,
    backgroundColor: 'rgba(67,71,74,1)',
    borderRadius: 10,
    marginBottom: 5,
    marginTop: 5,
  },
  itemSubView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameTxt: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
  },
  dateTxt: {
    fontSize: 16,
    color: 'rgba(131,132,127,1)',
  },
  detailTxt: {
    fontSize: 16,
    color: 'rgba(40,204,248,1)',
    marginTop: 5,
  },
  pinButton: {
    backgroundColor: 'rgba(40,204,248,1)',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 10,
  },
  unpinButton: {
    backgroundColor: 'rgba(40,204,248,1)',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 10,
  },
  pinIcon: {
    width: 24,
    height: 20,
    marginLeft: 10,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  actionIcon: {
    alignSelf: 'flex-start',
    width: 24,
    height: 20,
    marginLeft: 10,
    marginRight: 20,
  },
});

export default SlideAction;
