import { StyleSheet } from 'react-native';
import styled from 'styled-components';
import { theme, TopBarHeight } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: TopBarHeight,
  },
  header: {
    flex: 0.2,
  },
  body: {
    flex: 1.5,
  },
  header__title: {
    fontSize: 20,
    marginBottom: 10,
    color: theme.whiteColor,
    fontWeight: 'bold',
  },
  footer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;

export const HeightWeightWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const Height = styled.View`
  width: 47%;
  justify-content: center;
  align-items: center;
`;

export const Weight = styled.View`
  width: 47%;
  justify-content: center;
  align-items: center;
`;
