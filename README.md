## What have I do
### Initial project
```
mkdir init-ts-npm && cd init-ts-npm
git init
npm init -y
```

### Initial TypeScript
```
npm i -D typescript
npx tsc --init
```

### Initial tslint
```
npm i -D tslint
npx tslint --init
```

### Initial Prettier
Add `.prettierrc` to your root directory
```
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true
}
```

Then add tslint plugin:
```
npm i -D tslint-config-prettier
```

extend your tslint.json, and make sure tslint-config-prettier is at the end:
```
{
  "extends": [
    // ...
    "tslint-config-prettier"
  ]
}
```

### Initial Jest
```
npm i -D jest babel-jest @babel/core @babel/preset-env @babel/preset-typescript @types/jest
```

Then `npx jest --init`. Don't forget to add `@babel/preset-typescript` to the list of presets in your babel.config.js.
```
module.exports = {
  presets: [
    // ...
    '@babel/preset-typescript',
  ],
};
```





