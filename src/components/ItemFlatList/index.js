import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import styles, { ItemWrapperButton, ItemLeft, ItemRight } from './styles';

function ItemFlatList(props) {
  const { data, onPressItem } = props;

  function keyExtractor(item, index) {
    return item._id.toString();
  }

  function renderItem({ item, index }) {
    if ((index + 1) % 2 !== 0) {
      return (
        <ItemWrapperButton onPress={() => onPressItem(item)}>
          <ItemLeft>
            <FastImage
              style={styles.itemImage}
              resizeMode={FastImage.resizeMode.cover}
              source={{ uri: item.images[0] }}
            />
          </ItemLeft>
        </ItemWrapperButton>
      );
    }

    return (
      <ItemWrapperButton onPress={() => onPressItem(item)}>
        <ItemRight>
          <FastImage
            style={styles.itemImage}
            resizeMode={FastImage.resizeMode.cover}
            source={{ uri: item.images[0] }}
          />
        </ItemRight>
      </ItemWrapperButton>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      horizontal={false}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      keyExtractor={keyExtractor}
      data={data}
      renderItem={renderItem}
      // onEndReached={onEndReached}
      // onMomentumScrollBegin={onMomentumScrollBegin}
      onEndReachedThreshold={0}
    />
  );
}

ItemFlatList.propTypes = {
  data: PropTypes.array,
  onPressItem: PropTypes.func,
};

export default ItemFlatList;
