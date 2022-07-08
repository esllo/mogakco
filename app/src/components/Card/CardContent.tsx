import CardButton from '@/components/Card/CardButton';
import Tag from '@/components/Tag';
import { Role, rolesSelected } from '@/recoil/grant/atom';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

const CardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 16px 16px;
`;

const RoleText = styled.p`
  color: #b9bbbe;
  margin: 0;
  font-weight: 700;
  font-size: 0.75rem;
`;

const RoleList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px 4px;
`;

const CardContent = () => {
  const selected = useRecoilValue<Role[]>(rolesSelected);
  // const;

  return (
    <CardContentWrapper>
      <RoleText>역할</RoleText>
      <RoleList>
        {selected.map((item) => (
          <Tag key={item.id} item={item} />
        ))}
      </RoleList>
      <CardButton />
    </CardContentWrapper>
  );
};

export default CardContent;
