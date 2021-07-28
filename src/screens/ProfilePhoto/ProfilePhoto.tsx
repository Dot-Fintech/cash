import React from 'react';
import { Button } from 'react-native';
import { Text } from 'react-native';

import Screen from '../../components/Screen';

type Props = {
  next: () => void;
};

const ProfilePhoto: React.FC<Props> = ({ next }) => {
  return (
    <Screen>
      <Text>Profile Photo</Text>
      <Button title="Next" onPress={next} />
    </Screen>
  );
};

export default ProfilePhoto;
