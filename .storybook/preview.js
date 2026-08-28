import '../src/index.css';

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'light', value: '#f8fafc' },
        { name: 'dark', value: '#0b0f19' },
        { name: 'high-contrast', value: '#000000' },
      ],
    },
  },
};

export default preview;
