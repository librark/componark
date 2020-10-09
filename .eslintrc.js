module.exports = {
  env: {
    browser: true,
    es2021: true,
    jasmine: true,
    node: true
  },
  extends: [
    'standard'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'don-notation': false,
    'no-tabs': 0,
    "max-len": [
      "error",
      80,
      2
    ],
  }
}
