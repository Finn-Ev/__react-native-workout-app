import * as React from 'react';
import {
  KeyboardAvoidingView as DefaultKeyboardAvoidingView,
  SafeAreaView as DefaultSafeAreaView,
  StatusBar,
  Text as DefaultText,
  View as DefaultView,
} from 'react-native';
import Colors from '../../constants/Colors';

const color = Colors.text;
const backgroundColor = Colors.background;
const contentBackgroundColor = Colors.contentBackground;

export function Text(props: DefaultText['props']) {
  const { style, ...otherProps } = props;

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function KeyboardAvoidingView(
  props: DefaultKeyboardAvoidingView['props']
) {
  const { style, ...otherProps } = props;

  return (
    <DefaultKeyboardAvoidingView
      style={[{ backgroundColor }, style, { flex: 1 }]}
      {...otherProps}
    />
  );
}

export function SafeAreaView(props: DefaultSafeAreaView['props']) {
  const { style, ...otherProps } = props;

  return (
    <DefaultSafeAreaView
      style={[
        { backgroundColor },
        style,
        {
          marginTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
          flex: 1,
        },
      ]}
      {...otherProps}
    />
  );
}
