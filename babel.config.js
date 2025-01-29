module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': './source/',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
