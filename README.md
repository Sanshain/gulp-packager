# Gulp-packager

The simplest plugin to build scripts supporting base import/export expressions. Suitable for small simple vanilla javascript projects.

Consider [example](https://github.com/Sanshain/gulp-packager/blob/bundler/tests/gulpfile.js) section to quick jump into.

## Installation

```
npm install Sanshain/gulp-packager
```

or 

```
npm i gulp-packager
```

## Using with gulp:

For descriptive reasons the examples below assumes the following task in `gulpfile.js`:

```ts

gulp.task('build', function() {

    let src = './samples/**/init.ts';
    
    return gulp.src(src)                       
        .pipe(cache(src))
        .pipe(rename((path) => path.extname = '.js'))                              
        .pipe(packager({ release : true })) 
        // .pipe(ts())
        .pipe(gulp.dest('./samples'))
});
```

### gulp example: expand the detail:

<details>
<summary>gulp example</summary>


#### source:

`__common.ts` file: 

```javascript
export let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let r = 7
export var a = 66;

export function Ads(arg){}

function asd(){}

export function f(){}

export class Asde{constructor(){}}
```

and `init.ts`:

```typescript
import { months, Ads } from "./button/__common"

var a = months;

var c = 754;

console.log(a);
```

#### result:

turn out the content inside `init.js` in the same directory:

```js
const $$button$__commonExports = (function (exports) {
	let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let r = 7
	var a = 66;

	function Ads(arg){}

	function asd(){}

	function f(){}

	class Asde{constructor(){}}

	exports = { months, a, Ads, f, Asde };

	return exports 
})({})


const {  months, Ads  } = $$button$__commonExports;

var a = months;

var c = 754;

console.log(a);
```


</details>




## Using as API (w/o gulp):


```js
const build = require('gulp-packager/pack').integrate

const r = build("samples/init.ts")
console.log(r);

```


</detail>


## Attention

## Notes


* does not currently support importing npm packages. If your needs are beyond the scope of this package, suggest using [rollup](https://www.npmjs.com/package/rollup).
* no sourcemap support (may be TODO)
* not supported combined recipes of imports like following forms: 
```
import defaultExport, * as name from "./module-name";
import defaultExport, { export } from "./module-name";
```


## options:

- `release : true` - removes comments all over inside built file


## remarks: 

Besides using `import * as name from './...'`, `import {name} from './...'` you can also use `import './...``. 
But this option does not intended for types/class imports - what will you get a hint about in this case


## Advanced features: 

If you need to skip some `import` statements, you should to wrap it into following comment with `lazy` keyword:

```js
/*-lazy*/
import * as lazy from "./__common"
/*lazy-*/
```

In this case the multiple comments with `lazy` word in output file will be removed including all `import` content between them
