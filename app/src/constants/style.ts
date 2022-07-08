import { css } from '@emotion/react';

const Style = {
  rootStyle: css`
    :root {
      --background-primary: #36393f;
      --background-secondary: #2f3136;
      --background-secondary-alt: #292b2f;
      --background-tertiary: #202225;
      --background-accent: #4f545c;
      --background-floating: #18191c;
      --background-banner: #2e2f2e;
      --border: rgba(79, 84, 92, 0.48);
      --box-shadow: 0 8px 16px rgba(0, 0, 0, 0.24);
    }
    * {
      font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
        'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR',
        'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
        sans-serif;
    }
  `,
};

export default Style;
