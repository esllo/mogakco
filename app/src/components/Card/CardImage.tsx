import styled from '@emotion/styled';

interface Props {
  imageUrl: string;
}

const CardImageWrapper = styled.div`
  width: 92px;
  height: 92px;
  position: absolute;
  left: 16px;
  top: 16px;
  background: var(--background-floating);
  border-radius: 46px;
`;

const CardCircledImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin: 6px;
`;

const CardImage = ({ imageUrl }: Props) => (
  <CardImageWrapper>
    <CardCircledImage src={imageUrl} />
  </CardImageWrapper>
);

export default CardImage;
