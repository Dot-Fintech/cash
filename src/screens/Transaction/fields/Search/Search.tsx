import { Ionicons } from '@expo/vector-icons';
import debounce from 'debounce';
import { FormikProps } from 'formik';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import styled, { useTheme } from 'styled-components';

import Column from '../../../../components/Column';
import Row from '../../../../components/Row';
import Spacer from '../../../../components/Spacer';
import TextField from '../../../../components/TextField';
import Typography from '../../../../components/Typography';
import UserListItem from '../../../../components/UserListItem';
import {
  P2P_Transaction_Type,
  UserListItemFragment,
  useSearchUsersLazyQuery,
} from '../../../../generated/graphql';
import { Colors } from '../../../../theme';
import { FormValues } from '../../types';
import {
  LABEL_SPACER_WIDTH,
  LABEL_WRAPPER_WIDTH,
  RESULTS_CONTAINER_PADDING,
  TEXT_FIELD_WIDTH,
} from '../utils';

const ResultsContainer = styled(View)`
  position: absolute;
  z-index: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) =>
    theme.colors.background.primary.toString()};

  width: ${TEXT_FIELD_WIDTH}px;
  margin-top: -2px;
  margin-left: ${LABEL_WRAPPER_WIDTH + LABEL_SPACER_WIDTH}px;
  padding: ${RESULTS_CONTAINER_PADDING}px;
  border-radius: 3px;
`;

const LabelWrapper = styled(View)`
  width: ${LABEL_WRAPPER_WIDTH}px;
`;

const TextFieldWrapper = styled(View)`
  width: ${TEXT_FIELD_WIDTH}px;
`;

const ListItem = styled(View)`
  width: 100%;
`;

const SelectedUserRow = styled(Row)`
  min-height: 42px;
  width: ${TEXT_FIELD_WIDTH}px;
`;

type Props = FormikProps<FormValues> & {
  type: P2P_Transaction_Type;
  userState: [
    UserListItemFragment | undefined,
    React.Dispatch<React.SetStateAction<UserListItemFragment | undefined>>,
  ];
  showResultsState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  variant?: 'default' | 'white';
};

const Search: React.FC<Props> = ({
  type,
  handleChange,
  handleBlur,
  values,
  userState,
  showResultsState,
  variant,
}) => {
  const theme = useTheme();

  const color = variant === 'white' ? Colors.white : undefined;

  const [user, setUser] = userState;
  const [showResults, setShowResults] = showResultsState;

  const [search, { data, loading, error }] = useSearchUsersLazyQuery();

  const handleSearchQuery = (query: string) => {
    handleChange('search')(query);
    if (query.length > 2) {
      if (!showResults) {
        setShowResults(true);
      }
      debounce(() => {
        search({
          variables: {
            data: {
              query,
              connected: type === P2P_Transaction_Type.Request,
            },
            pageData: { pageNumber: 0, pageSize: 5 },
          },
        });
      }, 750)();
    } else {
      setShowResults(false);
    }
  };

  const handleUserClick = (user: UserListItemFragment) => {
    setUser(user);
    setShowResults(false);
  };

  const handleClearUser = () => {
    setUser(undefined);
    setShowResults(true);
  };

  return (
    <Column>
      <Row alignItems="center" fullWidth>
        <LabelWrapper>
          <Typography tag="h5" color={color}>
            To
          </Typography>
        </LabelWrapper>
        <Spacer width={LABEL_SPACER_WIDTH} />
        {user ? (
          <SelectedUserRow justifyContent="space-between" alignItems="center">
            <Typography tag="h5" color={color}>
              {user.firstName} {user.lastName}
            </Typography>
            <TouchableOpacity onPress={handleClearUser}>
              <Ionicons name="close" size={24} color={color?.toString()} />
            </TouchableOpacity>
          </SelectedUserRow>
        ) : (
          <TextFieldWrapper>
            <TextField
              placeholder="Name, username"
              onChangeText={handleSearchQuery}
              onBlur={handleBlur('search')}
              value={values.search}
              color={color}
              borderColor={color ?? theme.colors.text.primary}
              search
            />
          </TextFieldWrapper>
        )}
      </Row>
      {((showResults &&
        data?.searchUsers &&
        data.searchUsers.users.length > 0) ||
        loading ||
        error) && (
        <Row fullWidth>
          <ResultsContainer>
            {data ? (
              <FlatList
                data={data.searchUsers.users}
                keyExtractor={(user) => user._id}
                renderItem={({ item, index }) => (
                  <ListItem>
                    {index > 0 && <Spacer height={4} />}
                    <UserListItem user={item} onPress={handleUserClick} />
                  </ListItem>
                )}
              />
            ) : loading ? (
              <>
                <Spacer height={8} />
                <ActivityIndicator
                  color={theme.colors.main.secondary.toString()}
                />
              </>
            ) : error ? (
              <Typography tag="h3">We couldn't find any users</Typography>
            ) : null}
          </ResultsContainer>
        </Row>
      )}
    </Column>
  );
};

export default Search;
