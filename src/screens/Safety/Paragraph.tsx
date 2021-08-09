import React from 'react';
import styled from 'styled-components';

import Column from '../../components/Column';
import Spacer from '../../components/Spacer';
import Typography from '../../components/Typography';

type ContainerProps = {
  width: number;
};
const Container = styled(Column)<ContainerProps>`
  width: ${({ width }) => width}px;
`;

type Props = ContainerProps & {
  title: string;
  description: string;
};

const Paragraph: React.FC<Props> = ({ title, description, width }) => {
  return (
    <Container width={width}>
      <Typography tag="h5">{title}</Typography>
      <Spacer height={4} />
      <Typography tag="p">{description}</Typography>
    </Container>
  );
};

export default Paragraph;
