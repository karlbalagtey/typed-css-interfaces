# typed-css-interfaces

Creates TypeScript definition files with interfaces from  .css files.
This is a fork of typed-css-modules with added interface support.

Given the following CSS:
```css
/* styles.css */
@value primary: red;
.myClass {
  color: primary;
}
```
The original project generated the following output:
```
export const primary: string;
export const myClass: string;
```

So you could do:
```ts
/* app.ts */
import * as styles from './styles.css';
console.log(`<div class="${styles.myClass}"></div>`);
console.log(`<div style="color: ${styles.primary}"></div>`);
```

But, if you wanted to dynamically assign styles, like so:
```
let var = 'style-' + name;
console.log(`<div class="${styles[var]}"></div>`);
```
You will get a TS error about no index signature.
To get around this, this project generates the following output:

```ts
/* styles.css.d.ts */
interface Styles {
[name:string]:string;
primary: string;
myClass: string;
}
declare var styles:Styles;
export styles;
```

The `[name:string]: string` is the important part - it defines an index signature that allows Typescript to validate dynamically declared styles.

## CLI

```sh
npm install -g typed-css-interfaces
```

To maintain backwards compatibility with `typed-css-modules`, this project uses the command `tcmi`

Exec `tcmi <input directory>`.
For example, if you have .css files under `src` directory, exec the following:

```sh
tcmi src
```

Then, this creates `*.css.d.ts` files under the directory which has original .css file.

```text
(your project root)
- src/
    | myStyle.css
    | myStyle.css.d.ts [created]
```

#### output directory
Use `-o` or `--outDir` option.

For example:

```sh
tcmi -o dist src
```

```text
(your project root)
- src/
    | myStyle.css
- dist/
    | myStyle.css.d.ts [created]
```

#### file name pattern

By the default, this tool searches `**/*.css` files under `<input directory>`.
If you can customize glob pattern, you can use `--pattern` or `-p` option.

```sh
tcmi -p src/**/*.icss
```

#### watch
With `-w` or `--watch`, this CLI watches files in the input directory.

#### camelize CSS token
With `-c` or `--camelCase`, kebab-cased CSS classes(such as `.my-class {...}`) are exported as camelized TypeScript varibale name(`export const myClass: string`).


You can pass `--camelCase dashes` to only camelize dashes in the class name. Since version `0.27.1` in the
webpack `css-loader`. This will keep upperCase class names intact, e.g.:

```css
.SomeComponent {
  height: 10px;
}
```

becomes

```typescript
interface Styles {
SomeComponent: string;
}
declare var styles;
export = styles;
```

See also [webpack css-loader's camelCase option](https://github.com/webpack/css-loader#camelcase).

## API
No changes from the original project

## Example
There is a minimum example in this repository `example` folder. Clone this repository and run `cd example; npm i; npm start`.

Or please see [https://github.com/Quramy/typescript-css-modules-demo](https://github.com/Quramy/typescript-css-modules-demo). It's a working demonstration of CSS Modules with React and TypeScript.

## License
This software is released under the MIT License, see LICENSE.txt.
