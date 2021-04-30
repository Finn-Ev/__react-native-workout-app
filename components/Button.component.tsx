import React from 'react';
import { Button as NbButton } from 'react-native-elements';
import { spacing } from '../constants';
import Colors from '../constants/Colors';

interface ButtonProps {
  title: string;
  onPress: () => void | undefined;
  type?: 'cancel' | string;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, type }) => {
  return (
    <NbButton
      titleStyle={{ color: Colors.text }}
      containerStyle={{
        marginTop: spacing.md,
      }}
      buttonStyle={
        type === 'cancel'
          ? {
              backgroundColor: Colors.danger,
            }
          : {
              backgroundColor: Colors.accent,
            }
      }
      title={title}
      onPress={onPress}
    />
  );
};

export default Button;
