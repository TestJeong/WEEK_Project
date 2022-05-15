module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          '@': './src',
          '@Components': './src/Components',
          '@db': './src/db',
          '@utils': './src/utils',
          '@homeScreen': './src/pages/homeScreen',
          '@images': './src/assets/img',
        },
      },
    ],
  ],
};
