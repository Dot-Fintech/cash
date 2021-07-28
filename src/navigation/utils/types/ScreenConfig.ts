import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';

type BaseScreenConfig = {
  component: React.ComponentType<any>;
};

export type StackScreenConfig = BaseScreenConfig & {
  options?: StackNavigationOptions;
};

export type TabScreenConfig = BaseScreenConfig & {
  options?: BottomTabNavigationOptions;
};
