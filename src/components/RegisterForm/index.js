import React, { Component } from 'react';
import { TextInput, Text, View } from 'react-native';
import { BarIndicator } from 'react-native-indicators';
import { TextInputMask } from 'react-native-masked-text';
import PropTypes from 'prop-types';
import styles from './style';
import { theme } from '../../constants';

export class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      label,
      onChangeText,
      keyboardType,
      onChangePhoneText,
      errorText,
      value,
      phoneValue,
      loading,
      phone,
      autoFocus,
      defaultRef,
      invert,
    } = this.props;
    return (
      <View
        style={{
          marginBottom: 30,
          height: 50,
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              color: invert ? 'white' : theme.textColor,
              fontSize: 16,
              fontWeight: '700',
            }}
          >
            {label}
          </Text>
          {loading ? (
            <View style={{ marginLeft: 10 }}>
              <BarIndicator size={10} color={theme.pointColor} />
            </View>
          ) : null}
        </View>
        {phone ? (
          <TextInputMask
            ref={ref => (this.myDateText = ref)} //eslint-disable-line
            type="custom"
            keyboardType="numeric"
            value={phoneValue}
            autoFocus={autoFocus}
            onChangeText={onChangePhoneText}
            style={invert ? styles.whiteInput : styles.input}
            options={{
              mask: '999-9999-9999',
            }}
          />
        ) : (
          <TextInput
            onChangeText={onChangeText}
            value={value}
            ref={defaultRef}
            autoFocus={autoFocus}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType={keyboardType}
            style={invert ? styles.whiteInput : styles.input}
          />
        )}

        {errorText !== null ? (
          <Text style={{ color: 'red' }}>{errorText}</Text>
        ) : null}
      </View>
    );
  }
}

RegisterForm.propTypes = {
  label: PropTypes.string,
  // placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  onChangePhoneText: PropTypes.func,
  errorText: PropTypes.string,
  value: PropTypes.string,
  phoneValue: PropTypes.string,
  loading: PropTypes.bool,
  phone: PropTypes.bool,
  keyboardType: PropTypes.string,
  autoFocus: PropTypes.bool,
  defaultRef: PropTypes.object,
  invert: PropTypes.bool,
};

RegisterForm.defaultProps = {
  keyboardType: 'default',
  autoFocus: true,
};

export default RegisterForm;
