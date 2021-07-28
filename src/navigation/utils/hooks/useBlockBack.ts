import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect } from 'react';

/** This hook prevents users from removing a screen from the stack
 * NOTE:
 * It's recommended to also prevent the 'swipe to go back' animation
 * for iOS users. To do this, set gestureEnabled: false in the stack screen
 * config options
 */
export const useBlockBack = <P extends ParamListBase, R extends string>(
  navigation: StackNavigationProp<P, R>,
): void => {
  useEffect(() =>
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    }),
  );
};
