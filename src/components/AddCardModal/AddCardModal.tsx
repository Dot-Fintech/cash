import { Formik } from 'formik';
import React from 'react';
import { Modal, NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
import styled from 'styled-components';

import { RAIL_SPACING } from '../../styles/spacing';
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
  height: 100vh;
`;

type FormValues = {
  cardholderName: string;
  primaryAccountNumber: string;
  expiryDate: string;
  serviceCode: string;
};

const initialFormValues: FormValues = {
  cardholderName: '',
  primaryAccountNumber: '',
  expiryDate: '',
  serviceCode: '',
};

type Props = {
  isOpen: boolean;
  close: () => void;
};

const AddCardModal: React.FC<Props> = ({ isOpen, close }) => {
  const [createCard, { loading, error }] = useCardActions();

  const submit = async (data: FormValues) => {
    const provider = detectCardProvider(data.primaryAccountNumber);
    if (provider) {
      const { errors } = await createCard({ ...data, provider });
      if (errors) {
        alert(
          'Something went wrong. We encountered an issue while adding your card.',
        );
      }
    }
    close();
  };

  return (
    <Modal visible={isOpen} onDismiss={close}>
      <Container>
        <Typography tag="h2">Card Info</Typography>
        <Typography tag="p">
          Your info is secure and end to end encrypted.
        </Typography>
        <Spacer height={8} />
        <Formik
          validationSchema={addCardValidationSchema}
          initialValues={initialFormValues}
          onSubmit={submit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <>
              <TextField
                placeholder="Name on card"
                onChangeText={handleChange('cardholderName')}
                onBlur={handleBlur('cardholderName')}
                value={values.cardholderName}
                autoCorrect={false}
                autoCompleteType="name"
              />
              {errors.cardholderName && (
                <>
                  <Spacer height={4} />
                  <FormValidationError>
                    {errors.cardholderName}
                  </FormValidationError>
                </>
              )}
              <Spacer height={16} />
              <TextField
                placeholder="Card number"
                onChangeText={handleChange('primaryAccountNumber')}
                onBlur={handleBlur('primaryAccountNumber')}
                value={values.primaryAccountNumber}
                textContentType="creditCardNumber"
                autoCapitalize="none"
                autoCorrect={false}
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
                    placeholder="Name on card"
                    onChangeText={handleChange('cardholderName')}
                    onBlur={handleBlur('cardholderName')}
                    value={values.cardholderName}
                    autoCorrect={false}
                    autoCompleteType="name"
                  />
                  {errors.cardholderName && (
                    <>
                      <Spacer height={4} />
                      <FormValidationError>
                        {errors.cardholderName}
                      </FormValidationError>
                    </>
                  )}
                </Column>
                <Spacer width={16} />
                <Column>
                  <TextField
                    placeholder="Card number"
                    onChangeText={handleChange('primaryAccountNumber')}
                    onBlur={handleBlur('primaryAccountNumber')}
                    value={values.primaryAccountNumber}
                    textContentType="creditCardNumber"
                    autoCapitalize="none"
                    autoCorrect={false}
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
