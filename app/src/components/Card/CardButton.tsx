import Button from '@/components/Button';
import { guildState, roleIdSelected } from '@/recoil/grant/atom';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useMutation } from 'react-query';
import styled from '@emotion/styled';

const CodeText = styled.p`
  color: white;
  background: var(--background-tertiary);
  border-radius: 6px;
  height: 32px;
  padding: 2px 16px;
  line-height: 32px;
  margin: 0;
`;

const CardButton = () => {
  const guild = useRecoilValue<string>(guildState);
  const selected = useRecoilValue<string[]>(roleIdSelected);
  const [code, setCode] = useState<string>('');
  const codeRef = useRef<HTMLParagraphElement>(null);

  async function generateCode(data: { guild: string; roles: string[] }) {
    const { data: repsonse } = await axios.post(
      'https://mgc.esllo.com/api/grant/generate',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return repsonse;
  }

  const { mutate, isLoading } = useMutation(generateCode, {
    onSuccess(data) {
      if (data) {
        console.log(data);
        setCode(data.code);
      }
    },
    onError(error) {
      console.error(error);
    },
  });

  function handleGenerateClick() {
    mutate({
      guild: guild.split('/')[1] || '',
      roles: selected,
    });
  }

  function handleCodeClick() {
    if (codeRef.current) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(codeRef.current);
      selection?.removeAllRanges();
      selection?.addRange(range);
      if (navigator.clipboard) {
        navigator.clipboard.writeText(codeRef.current.textContent || '');
      }
    }
  }

  return (
    <>
      {code && (
        <CodeText ref={codeRef} onClick={handleCodeClick}>
          {!isLoading && code}
        </CodeText>
      )}
      <Button onClick={isLoading ? () => 1 : handleGenerateClick}>
        {isLoading ? '생성중' : '코드 생성하기'}
      </Button>
    </>
  );
};

export default CardButton;
