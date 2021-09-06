import { ErrorMessage, Field, Form } from 'formik';
import React from 'react';
import { Button, Modal } from 'react-native';
import styled, { useTheme } from 'styled-components';

import { RAIL_SPACING } from '../../styles/spacing';
import { detectCardProvider } from '../../utils/card';
import Column from '../Column';
import Row from '../Row';
import Spacer from '../Spacer';
import TextField from '../TextField';
import Typography from '../Typography';
import { useCardActions } from './useCardActions';
import {
  validateCardholderName,
  validateExpiryDate,
  validatePrimaryAccountNumber,
  validateServiceCode,
} from './validators';

const Container = styled(Column)`
  padding: 16px ${RAIL_SPACING}px;
  height: 100vh;
`;

const FullWidthForm = styled.form`
  width: 100%;
`;

const FullWidthButton = styled(Button)`
  width: 100%;
`;

type FormState = {
  cardholderName: string;
  primaryAccountNumber: string;
  expiryDate: string;
  serviceCode: string;
};

type Props = {
  isOpen: boolean;
  close: () => void;
};

const AddCardModal: React.FC<Props> = ({ isOpen, close }) => {
  const theme = useTheme();

  const [createCard, { loading, error }] = useCardActions();

  const handleSubmit = async (data: FormState) => {
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
          Your info is secure and end to end encrypted
        </Typography>
        <Spacer height={8} />
        <Form onSubmit={handleSubmit}>
          {({ formProps }) => (
            <FullWidthForm {...formProps}>
              <Field
                name="cardholderName"
                defaultValue=""
                validate={validateCardholderName}
              >
                {({ fieldProps, error }) => (
                  <>
                    <TextField
                      {...fieldProps}
                      type="text"
                      placeholder="Cardholder name"
                      maxLength={40}
                      autoComplete="off"
                    />
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                  </>
                )}
              </Field>
              <Field
                name="primaryAccountNumber"
                defaultValue=""
                validate={validatePrimaryAccountNumber}
              >
                {({ fieldProps, error }) => (
                  <>
                    <TextField
                      {...fieldProps}
                      type="number"
                      placeholder="Card number"
                      maxLength={16}
                      autoComplete="off"
                    />
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                  </>
                )}
              </Field>
              <Row fullWidth>
                <Field
                  name="expiryDate"
                  defaultValue=""
                  validate={validateExpiryDate}
                >
                  {({ fieldProps, error }) => (
                    <>
                      <TextField
                        {...fieldProps}
                        type="number"
                        placeholder="MMYY"
                        maxLength={4}
                        autoComplete="off"
                      />
                      {error && <ErrorMessage>{error}</ErrorMessage>}
                    </>
                  )}
                </Field>
                <Spacer width={8} />
                <Field
                  name="serviceCode"
                  defaultValue=""
                  validate={validateServiceCode}
                >
                  {({ fieldProps, error }) => (
                    <>
                      <TextField
                        {...fieldProps}
                        type="number"
                        placeholder="CVV"
                        maxLength={4}
                        autoComplete="off"
                      />
                      {error && <ErrorMessage>{error}</ErrorMessage>}
                    </>
                  )}
                </Field>
              </Row>
              <FormFooter>
                <FullWidthButton type="submit" disabled={loading}>
                  Add Card
                </FullWidthButton>
              </FormFooter>
            </FullWidthForm>
          )}
        </Form>
        {error && (
          <>
            <Spacer height={16} />
            <Column alignItems="center" fullWidth>
              <Typography tag="h4" textAlign="center">
                Something went wrong
              </Typography>
              <Spacer height={8} />
              <Typography
                tag="h4"
                color={theme.colors.error.primary}
                textAlign="center"
              >
                {error.message}
              </Typography>
            </Column>
          </>
        )}
      </Container>
    </Modal>
  );
};

export default AddCardModal;
