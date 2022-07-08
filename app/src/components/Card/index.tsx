import CardContent from '@/components/Card/CardContent';
import CardHeader from '@/components/Card/CardHeader';
import CardImage from '@/components/Card/CardImage';
import styled from '@emotion/styled';

const CardWrapper = styled.div`
  width: 300px;
  background: var(--background-floating);
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: var(--box-shadow);

  &:before {
    content: ' ';
    display: block;
    width: 100%;
    height: 60px;
    background: var(--background-banner);
  }
`;

const Card = () => {
  return (
    <CardWrapper>
      <CardImage imageUrl="https://cdn.discordapp.com/avatars/356352192019693569/a_ab6417648f1c4efcc4271a7f800010d4.gif?size=256" />
      <CardHeader name="모각코" />
      <CardContent />
    </CardWrapper>
  );
};

export default Card;
