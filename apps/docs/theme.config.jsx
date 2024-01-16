import Image from 'next/image';

const config = {
  logo: (
    <Image src="/assets/icon.png" alt="ZIX DEV" width={40} height={40} />
  ),
  project: {
    link: 'https://github.com/zixdev/zix',
  },
  // ... other theme options
  useNextSeoProps() {
    return {
      titleTemplate: '%s - ZIX DEV',
    };
  },
};

export default config;
