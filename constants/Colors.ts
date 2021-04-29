import { Theme } from '@react-navigation/native';

const theme = {
  text: '#eee',
  background: '#000',
  contentBackground: '#222',
  navigationBackground: 'teal',
  tintColor: 'white',
  accent: 'teal',
  danger: '#b8291f',
};

export default {
  text: theme.text,
  background: theme.background,
  contentBackground: theme.contentBackground,
  tint: theme.tintColor,
  accent: theme.accent,
  tabIconDefault: '#eee',
  tabIconSelected: theme.tintColor,
  danger: theme.danger,
};

export const NavigationColorTheme: { dark: Theme; light: Theme } = {
  dark: {
    dark: true,
    colors: {
      background: theme.navigationBackground,
      border: theme.navigationBackground,
      card: theme.navigationBackground,
      notification: '#fff',
      primary: theme.text,
      text: theme.text,
    },
  },
  light: {
    dark: false,
    colors: {
      background: theme.navigationBackground,
      border: theme.navigationBackground,
      card: theme.navigationBackground,
      notification: '#fff',
      primary: theme.text,
      text: theme.text,
    },
  },
};
