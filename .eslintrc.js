module.exports = {
  root: true,
  extends: ['eslint:recommended'],

  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
      modules: true,
    },
  },

  env: {
    browser: true,
    node: true,
    es6: true,
  },

  rules: {
    'max-len': [1, {code: 150}],
    indent: ['error', 2],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'eol-last': ['error', 'always'],
    'quote-props': ['error', 'as-needed'],
    quotes: ['error', 'single'],
    semi: 'error',
    'semi-spacing': 'error',
    'comma-spacing': 'error',
    'comma-style': ['error', 'last'],
    'prefer-const': 'error',
  },

  globals: {
    // globals in tests
    it: "readonly",
    describe: "readonly",
    qingstor_sdk: "readonly",
    qingstor_config: "readonly",
    qingstor_test_config: "readonly",
  }
};
