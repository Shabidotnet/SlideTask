import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://dummyjson.com/products/2',
      headers: {},
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        setData(response?.data?.reviews);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemView}>
          <Text style={styles.nameTxt}>{'Name: '}</Text>
          <Text style={styles.nameTxt}>{'Email: '}</Text>
          <Text style={styles.nameTxt}>{'Comment'}</Text>
          <Text style={styles.nameTxt}>{'Rating: '}</Text>
        </View>
        <View style={styles.itemView1}>
          <Text style={styles.nameTxt}>{item?.reviewerName}</Text>
          <Text style={styles.nameTxt}>{item?.reviewerEmail}</Text>
          <Text style={styles.nameTxt}>{item?.comment}</Text>
          <Text style={styles.nameTxt}>{item?.rating}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.mainConatiner}>
      <Text style={styles.revTxt}>Reviews</Text>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainConatiner: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  revTxt: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  nameTxt: {
    color: 'black',
    fontSize: 14,
    fontWeight: '700',
  },

  itemView: {
    width: '30%',
  },
  itemView1: {
    flex: 1,
  },
  itemContainer: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    marginBottom: 10,
    flexDirection: 'row',
  },
});
