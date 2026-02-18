module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          jsxImportSource: "nativewind",
        },
      ],
      "nativewind/babel", // Asegúrate de tener este preset si usas NativeWind v4+
    ],
    plugins: [
      // Reanimated siempre debe ir al final de la lista de plugins
      "react-native-reanimated/plugin",
    ],
  };
};
