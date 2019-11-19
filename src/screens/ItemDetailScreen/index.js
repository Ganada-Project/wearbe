import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks/dist';
import { Wrapper, Header, Body, HeaderText, SubText } from './styles';
import { theme } from '../../constants';

const ItemDetailScreen = ({ componentId, item }) => {
  // const dispatch = useDispatch();
  // const defaultState = useSelector(state => state.get('global'));
  useNavigationComponentDidAppear(() => {});
  return (
    <Wrapper>
      <Header>
        <HeaderText>{item.maker}</HeaderText>
        <SubText>{item.name}</SubText>
      </Header>
      <Body></Body>
    </Wrapper>
  );
};

ItemDetailScreen.options = {
  topBar: {
    noBorder: true,
    background: {
      color: theme.backgroundColor,
    },
  },
};

ItemDetailScreen.propTypes = {
  componentId: PropTypes.string,
  item: PropTypes.object,
};

export default ItemDetailScreen;
