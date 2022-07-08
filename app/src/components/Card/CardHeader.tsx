import styled from '@emotion/styled';

interface Props {
  name: string;
}

const CardHeaderWrapper = styled.div`
  padding: 64px 16px 16px;
  font-size: 1.25rem;
  color: white;
`;

const CardHeader = ({ name }: Props) => <CardHeaderWrapper>{name}</CardHeaderWrapper>;

export default CardHeader;
