import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components';

import Column from '../../components/Column';
import MainHeader from '../../components/MainHeader';
import Numberpad from '../../components/Numberpad';
import Pill from '../../components/Pill';
import Row from '../../components/Row';
import Screen from '../../components/Screen';
import SlideSelect, { SlideSelectOption } from '../../components/SlideSelect';
import Spacer from '../../components/Spacer';
import Typography from '../../components/Typography';
import { UserContext } from '../../context/user/state';
import { P2P_Transaction_Type } from '../../generated/graphql';
import { TAB_BAR_HEIGHT } from '../../navigation/MainTabs/TabBar';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { MoneyStackParamList } from '../../navigation/utils/paramLists/MoneyStack';
import { formatter } from '../../utils/money';
import RequestFromConnectionsModal from './RequestFromConnectionsModal';
import { validateTransaction } from './utils';

const Container = styled(Column)`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SlideSelectContainer = styled(Column)`
  width: 200px;
`;

type AbsoluteContainerProps = {
  bottomInset: number;
};
const AbsoluteContainer = styled(Column)<AbsoluteContainerProps>`
  position: absolute;
  bottom: ${({ bottomInset }) => bottomInset + TAB_BAR_HEIGHT + 16}px;
  width: 100%;
`;

const options: SlideSelectOption[] = [
  {
    id: P2P_Transaction_Type.Send,
    label: 'Send',
  },
  {
    id: P2P_Transaction_Type.Request,
    label: 'Request',
  },
];

const Money: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<MoneyStackParamList, SCREENS.MONEY>>();

  const { top, bottom } = useSafeAreaInsets();

  const { user } = useContext(UserContext);

  const [amount, setAmount] = useState(0);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const type = selectedOption.id as P2P_Transaction_Type;

  const handleContinue = () => {
    if (validateTransaction({ amount, type, user })) {
      setAmount(0);
      navigation.push(SCREENS.TRANSACTION_WITH_AMOUNT, { amount, type });
    }
  };

  return (
    <Screen unsafe>
      <>
        <Container alignItems="center">
          <Spacer height={top} />
          <MainHeader />
          <Spacer height={16} />
          <SlideSelectContainer>
            <SlideSelect
              options={options}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          </SlideSelectContainer>
          <Spacer height={16} />
          <Typography tag={amount < 1000 ? 'h1' : 'h2'}>
            {formatter.format(amount)}
          </Typography>
          <AbsoluteContainer bottomInset={bottom}>
            <Numberpad amount={amount} setAmount={setAmount} />
            <Spacer height={8} />
            <Row justifyContent="center" fullWidth>
              <Pill onPress={handleContinue}>Continue</Pill>
            </Row>
          </AbsoluteContainer>
        </Container>
        {type === P2P_Transaction_Type.Request && (
          <RequestFromConnectionsModal />
        )}
      </>
    </Screen>
  );
};

export default Money;
