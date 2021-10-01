import debounce from 'debounce';
import React, { useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import styled from 'styled-components';

import BottomBlock from '../../../components/BottomBlock';
import Column from '../../../components/Column';
import Error from '../../../components/Error';
import { LoadingList } from '../../../components/Loading';
import Screen from '../../../components/Screen';
import Spacer from '../../../components/Spacer';
import TopBlock from '../../../components/TopBlock';
import UserListItem from '../../../components/UserListItem';
import { useSearchUsersLazyQuery } from '../../../generated/graphql';
import { SCREENS } from '../../../navigation/utils/enums/screens';
import { RAIL_SPACING } from '../../../styles/spacing';
import SearchGroup from '../SearchGroup';

const { width } = Dimensions.get('window');

const BottomContainer = styled(Column)`
  padding: 0 ${RAIL_SPACING}px;
`;

const ListItemWrapper = styled(View)`
  width: ${width - 2 * RAIL_SPACING}px;
`;

const People: React.FC = () => {
  const [showResults, setShowResults] = useState(false);
  const [search, { data, loading, error }] = useSearchUsersLazyQuery();

  const handleSearchQuery = (query: string) => {
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
            onChangeText={handleSearchQuery}
          />
        </TopBlock>
        <BottomBlock>
          <BottomContainer>
            {data && showResults ? (
              <FlatList
                data={data.searchUsers.users}
                keyExtractor={(user) => user._id}
                renderItem={({ item }) => (
                  <ListItemWrapper>
                    <Spacer height={16} />
                    <UserListItem user={item} showConnectionStatus />
                  </ListItemWrapper>
                )}
              />
            ) : loading ? (
              <LoadingList width={width - 2 * RAIL_SPACING} numRows={8} />
            ) : error ? (
              <Column alignItems="center" fullWidth>
                <Error
                  error={error}
                  message="We can't get those users right now."
                />
              </Column>
            ) : null}
          </BottomContainer>
        </BottomBlock>
      </>
    </Screen>
  );
};

export default People;
