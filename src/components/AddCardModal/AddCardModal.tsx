import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import React, { useContext } from 'react';
import {
  Alert,
  Modal,
  NativeSyntheticEvent,
  NativeTouchEvent,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components';

import { UserContext } from '../../context/user/state';
import { RAIL_SPACING } from '../../styles/spacing';
import { Color } from '../../theme';
import { detectCardProvider } from '../../utils/card';
import Button from '../Button';
import Column from '../Column';
import Error from '../Error';
import FormValidationError from '../FormValidationError';
import Row from '../Row';
import Spacer from '../Spacer';
import TextField from '../TextField';
import Typography from '../Typography';
import { useCardActions } from './useCardActions';
import { addCardValidationSchema } from './validators';

const Container = styled(Column)`
  padding: 16px ${RAIL_SPACING}px;
  height: 100%;
  background-color: ${({ theme }) =>
    theme.colors.background.primary.toString()};
`;

type FormValues = {
  primaryAccountNumber: string;
  expiryDate: string;
  serviceCode: string;
  nickname: string;
};

const initialFormValues: FormValues = {
  primaryAccountNumber: '',
  expiryDate: '',
  serviceCode: '',
  nickname: '',
};

type Props = {
  isOpen: boolean;
  close: () => void;
};

const AddCardModal: React.FC<Props> = ({ isOpen, close }) => {
  const theme = useTheme();

  const { user } = useContext(UserContext);

  const { top } = useSafeAreaInsets();

  const [createCard, { loading, error }] = useCardActions();

  const submit = async (data: FormValues) => {
    const provider = detectCardProvider(data.primaryAccountNumber);
    if (provider) {
      const { errors } = await createCard({ ...data, provider });
      if (errors) {
        Alert.alert(
          'Something went wrong.',
          'We encountered an issue while adding your card.',
        );
      }
    }
    close();
  };

  return (
    <Modal visible={isOpen} onDismiss={close} animationType="slide">
      <Container>
        <Spacer height={top} />
        <Row justifyContent="space-between" alignItems="center" fullWidth>
          <Typography tag="h2">Card Info</Typography>
          <TouchableOpacity onPress={close}>
            <Ionicons
              name="close"
              size={32}
              color={theme.colors.text.primary.toString()}
            />
          </TouchableOpacity>
        </Row>
        <Spacer height={8} />
        <Typography tag="p">
          Your info is secure and end to end encrypted.
        </Typography>
        <Spacer height={16} />
        <Formik
          validationSchema={addCardValidationSchema}
          initialValues={initialFormValues}
          onSubmit={submit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <>
              <TextField
                value={`${user?.firstName} ${user?.lastName}`}
                placeholder="Name on card"
                editable={false}
                underlineColorAndroid="transparent"
                selectTextOnFocus={false}
                borderColor={
                  new Color({ ...theme.colors.text.primary, opacity: 0.5 })
                }
              />
              <Spacer height={16} />
              <TextField
                placeholder="Card number"
                onChangeText={handleChange('primaryAccountNumber')}
                onBlur={handleBlur('primaryAccountNumber')}
                value={values.primaryAccountNumber}
                textContentType="creditCardNumber"
                keyboardType="numeric"
                autoCompleteType="cc-number"
              />
              {errors.primaryAccountNumber && (
                <>
                  <Spacer height={4} />
                  <FormValidationError>
                    {errors.primaryAccountNumber}
                  </FormValidationError>
                </>
              )}
              <Spacer height={16} />
              <Row alignItems="center" fullWidth>
                <Column>
                  <TextField
                    placeholder="MMYY"
                    onChangeText={handleChange('expiryDate')}
                    onBlur={handleBlur('expiryDate')}
                    value={values.expiryDate}
                    keyboardType="numeric"
                    autoCompleteType="cc-exp"
                  />
                  {errors.expiryDate && (
                    <>
                      <Spacer height={4} />
                      <FormValidationError>
                        {errors.expiryDate}
                      </FormValidationError>
                    </>
                  )}
                </Column>
                <Spacer width={16} />
                <Column>
                  <TextField
                    placeholder="CVV"
                    onChangeText={handleChange('serviceCode')}
                    onBlur={handleBlur('serviceCode')}
                    value={values.serviceCode}
                    keyboardType="numeric"
                    autoCompleteType="cc-csc"
                  />
                  {errors.serviceCode && (
                    <>
                      <Spacer height={4} />
                      <FormValidationError>
                        {errors.serviceCode}
                      </FormValidationError>
                    </>
                  )}
                </Column>
              </Row>
              <Spacer height={16} />
              <Button
                onPress={
                  handleSubmit as unknown as (
                    e: NativeSyntheticEvent<NativeTouchEvent>,
                  ) => void
                }
                disabled={loading}
                fullWidth
              >
                Add Card
              </Button>
            </>
          )}
        </Formik>
        {error && (
          <>
            <Spacer height={16} />
            <Error
              error={error}
              message="We can't add that card to your account right now."
            />
          </>
        )}
      </Container>
    </Modal>
  );
};

export default AddCardModal;
