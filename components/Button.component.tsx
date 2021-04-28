import React from 'react';
import { Button as NbButton } from 'react-native-elements';
import { spacing } from '../constants';
import Colors from '../constants/Colors';

interface ButtonProps {
  title: string;
  onPress: () => void | undefined;
}

const Button: React.FC<ButtonProps> = ({ title, onPress }) => {
  return (
    <NbButton
      titleStyle={{ color: Colors.text }}
      containerStyle={{
        marginVertical: spacing.lg,
      }}
      buttonStyle={{
        backgroundColor: Colors.accent,
      }}
      title={title}
      onPress={onPress}
    />
  );
};

export default Button;
