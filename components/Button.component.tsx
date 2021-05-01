import React, { useState } from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  TextProps,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { fontSize, spacing } from '../constants';
import Colors from '../constants/Colors';
import { Text } from '../utils/styles/DefaultComponents';

interface ButtonProps {
  title: string;
  onPress: () => void | undefined;
  buttonStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextProps>;
  type?: 'cancel' | string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  type,
  textStyles,
  buttonStyles,
}) => {
  const [rippleColor, setRippleColor] = useState('#fff');
  const [rippleOverflow, setRippleOverflow] = useState(false);
  if (false) {
    // return (
    //   <View style={{ borderRadius: 10, marginTop: spacing.md }}>
    //     <TouchableNativeFeedback
    //       style={{ borderRadius: 10 }}
    //       onPress={() => {
    //         setRippleColor('#fff');
    //         setRippleOverflow(!rippleOverflow);
    //         onPress();
    //       }}
    //       background={TouchableNativeFeedback.Ripple(
    //         rippleColor,
    //         rippleOverflow
    //       )}
    //     >
    //       <View
    //         style={[
    //           styles.button,
    //           // buttonStyles,
    //           {
    //             backgroundColor:
    //               type === 'cancel' ? Colors.danger : Colors.accent,
    //           },
    //         ]}
    //       >
    //         <Text style={[styles.text, textStyles]}>{title}</Text>
    //       </View>
    //     </TouchableNativeFeedback>
    //   </View>
    // );
  } else {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.button,
          buttonStyles,
          {
            backgroundColor: type === 'cancel' ? Colors.danger : Colors.accent,
          },
        ]}
      >
        <Text style={[styles.text, textStyles]}>{title}</Text>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  button: {
    marginTop: spacing.md,
    paddingVertical: 12.5,
    borderRadius: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: fontSize.md,
    // textTransform: Platform.OS === 'android' ? 'uppercase' : 'none',
  },
});

export default Button;
