import debounce from 'debounce';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import styled, { useTheme } from 'styled-components';

import BottomBlock from '../../../components/BottomBlock';
import Column from '../../../components/Column';
import { LoadingList } from '../../../components/Loading';
import Screen from '../../../components/Screen';
import Spacer from '../../../components/Spacer';
import TopBlock from '../../../components/TopBlock';
import Typography from '../../../components/Typography';
import UserListItem from '../../../components/UserListItem';
import { useSearchUsersLazyQuery } from '../../../generated/graphql';
import { SCREENS } from '../../../navigation/utils/enums/screens';
import { RAIL_SPACING } from '../../../styles/spacing';
import SearchGroup from '../SearchGroup';

const BottomContainer = styled(Column)`
  padding: 16px ${RAIL_SPACING}px 0;
`;

const People: React.FC = () => {
  const theme = useTheme();

  const [showResults, setShowResults] = useState(false);
  const [search, { data, loading, error }] = useSearchUsersLazyQuery();

  const handleSearchQuery = (value: unknown) => {
    const query = String(value);
    if (query.length > 2) {
      setShowResults(true);
      debounce(() => {
        search({
          variables: {
            data: { query },
            pageData: { pageNumber: 0, pageSize: 10 },
          },
        });
      }, 750)();
    } else {
      setShowResults(false);
    }
  };

  return (
    <Screen>
      <>
        <TopBlock>
          <SearchGroup
            screen={SCREENS.EXPLORE_PEOPLE}
            onChange={handleSearchQuery}
          />
        </TopBlock>
        <BottomBlock>
          <BottomContainer>
            {data && showResults ? (
              data.searchUsers.users.map((user, index) => (
                <Column key={user._id} fullWidth>
                  {index > 0 && <Spacer height={16} />}
                  <UserListItem user={user} showConnectionStatus />
                </Column>
              ))
            ) : loading ? (
              <LoadingList
                width={Dimensions.get('window').width - 2 * RAIL_SPACING}
                numRows={8}
              />
            ) : error ? (
              <Column alignItems="center" fullWidth>
                <Typography tag="h4" textAlign="center">
                  Something went wrong
                </Typography>
                <Spacer width={16} />
                <Typography tag="h5" textAlign="center">
                  There was an issue fetching users
                </Typography>
                <Spacer width={16} />
                <Typography
                  tag="p"
                  color={theme.colors.error.primary}
                  textAlign="center"
                >
                  {error.message}
                </Typography>
              </Column>
            ) : null}
          </BottomContainer>
        </BottomBlock>
      </>
    </Screen>
  );
};

export default People;
