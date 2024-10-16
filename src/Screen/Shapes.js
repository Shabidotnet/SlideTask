import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

const Shapes = () => {
  const {width: screenWidth} = Dimensions.get('window');

  const [count, setCount] = useState(0);
  const [array, setArray] = useState([]);
  const btnPress = () => {
    const newCount = parseInt(count, 10);

    const newArray = Array.from({length: newCount}, (_, index) => index + 1);
    setArray(newArray);
  };
  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter Number"
        keyboardType="number-pad"
        onChangeText={val => setCount(val)}
        maxLength={3}
      />
      <TouchableOpacity style={styles.btn} onPress={() => btnPress()}>
        <Text>{'Press'}</Text>
      </TouchableOpacity>
      <View style={styles.subContainer}>
        {array.map((item, index) => {
          const sizeMultiplier = array.length / 100;
          console.log('sizeMultiplier', sizeMultiplier);
          const viewSize = Math.max(
            screenWidth * sizeMultiplier,
            screenWidth * sizeMultiplier,
          );

          return (
            <View
              key={index}
              style={{
                zIndex: -index,
                position: 'absolute',
                width: viewSize,
                height: viewSize,
                borderRadius: viewSize / 2,
                backgroundColor: index % 2 === 0 ? 'red' : 'blue',
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Shapes;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    color: 'black',
    paddingHorizontal: 10,
  },
  btn: {
    backgroundColor: 'black',
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    backgroundColor: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  subContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
