import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as LocalAuthentication from 'expo-local-authentication';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components';

import Button from '../../components/Button';
import Column from '../../components/Column';
import Row from '../../components/Row';
import Screen from '../../components/Screen';
import Spacer from '../../components/Spacer';
import SafetyPaymentsIcon from '../../icons/SafetyPaymentsIcon';
import SafetyPersonalIcon from '../../icons/SafetyPersonalIcon';
import SafetySavingIcon from '../../icons/SafetySavingIcon';
import { NAVIGATORS } from '../../navigation/utils/enums/navigators';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { RootStackParamList } from '../../navigation/utils/screenConfigs/RootStack';
import { SignUpStackParamList } from '../../navigation/utils/screenConfigs/SignUpStack';
import Paragraph from './Paragraph';

const RAIL_SPACING = 16;
const MIDDLE_SPACER_WIDTH = 16;

const Container = styled(Column)`
  padding: 0 ${RAIL_SPACING}px;
  width: 100%;
  height: 100%;
`;

const Safety: React.FC = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<
        RootStackParamList & SignUpStackParamList,
        SCREENS.SAFETY
      >
    >();

  const { width } = useWindowDimensions();

  const next = async () => {
    if (await LocalAuthentication.hasHardwareAsync()) {
      navigation.push(SCREENS.BIOMETRICS);
    } else {
      navigation.push(NAVIGATORS.MAIN_STACK);
    }
  };

  const ICON_WIDTH = Math.min(
    Math.floor((width - 2 * RAIL_SPACING - 0.5 * MIDDLE_SPACER_WIDTH) / 2),
    220,
  );

  return (
    <Screen>
      <Container justifyContent="space-around" alignItems="center">
        <Row fullWidth>
          <SafetyPaymentsIcon width={ICON_WIDTH} maxHeight={150} />
          <Spacer width={MIDDLE_SPACER_WIDTH} />
          <Paragraph
            width={ICON_WIDTH}
            title="Safe"
            description="Now it's easier than ever before to send money, and Dot utilizes a myriad of safety features to process transactions."
          />
        </Row>
        <Row fullWidth>
          <Paragraph
            width={ICON_WIDTH}
            title="Secure"
            description="PCI-DSS certified means that we protect all of your data. Dot allows you to move money around with confidence."
          />
          <Spacer width={MIDDLE_SPACER_WIDTH} />
          <SafetyPersonalIcon width={ICON_WIDTH} maxHeight={150} />
        </Row>
        <Row fullWidth>
          <SafetySavingIcon width={ICON_WIDTH} maxHeight={150} />
          <Spacer width={MIDDLE_SPACER_WIDTH} />
          <Paragraph
            width={ICON_WIDTH}
            title="Robust"
            description="Security is our top priority and we invest a lot of resources ensuring that Dot protects its customers."
          />
        </Row>
        <Button onPress={next}>Continue</Button>
      </Container>
    </Screen>
  );
};

export default Safety;
