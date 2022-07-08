import Card from '@/components/Card';
import Container from '@/components/Container';
import Search from '@/components/Search';
import Status from '@/components/status';
import { guildState, Role, rolesState } from '@/recoil/grant/atom';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState, useRecoilState } from 'recoil';

interface GrantData {
  roles: Role[];
}

const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
`;

const Grant = () => {
  const [guild, setGuild] = useRecoilState<string>(guildState);
  const { isLoading, isError, data } = useQuery(['guild', guild], {
    enabled: !!guild,
    retry: 0,
    refetchOnWindowFocus: false,
  });
  const setRoles = useSetRecoilState(rolesState);

  useEffect(() => {
    setGuild(window.location.pathname.toString().substring(1));
  }, []);

  useEffect(() => {
    if (data) {
      const { roles } = data as GrantData;
      setRoles(roles);
    }
  }, [data]);

  if (isLoading) {
    return <Status>Loading</Status>;
  }

  if (isError) {
    return <Status>Error</Status>;
  }
  return (
    <Container>
      <CardWrapper>
        <Card />
      </CardWrapper>
      <Search />
    </Container>
  );
};

export default Grant;
