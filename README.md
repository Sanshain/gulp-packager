# Gulp-packager

The simplest vanilla ts/js **packager** supporting base import/export operation. 

- Suitable for vanilla js/ts project or for beginners

- Includes a customized `gulpfile.js` with a typescript observer for quick start.

## Installation

```
npm install Sanshain/gulp-packager
```

or 

```
npm i gulp-packager
```

## Examples

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

### Example 1

`__common.ts` file: 

```javascript
let r = 7
function asd(){}

export let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export var a = 6;
export function Ads(arg){}
export class Asde{}
```

and `init.ts`:

```typescript
import * as com from "./__common"

var a = com.a;
var c = 7540;
```


turn out the content inside `init.js` in the same directory:


```js
//@modules:


const $$__commonExports = (function (exports) {
 let r = 7
	function asd() { }
	
	let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var a = 6;
	function Ads(arg) { }
	class Asde { }
	
	exports = { months, a, Ads, Asde };
	
	return exports 
})({})


//@init.ts: 
const com = $$__commonExports;

var a = com.a;
var c = 7540;
```


<detail>
<summary>Previous:</summary>

```js
{

    let r = 7
    function asd(){}

    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var a = 6;
    function Ads(arg){}
    class Asde{}

    var com = {
     		months:months,
    		a:a,
    		Ads:Ads,
    		Asde:Asde 
    }
}

var a = com.a;

var c = 7540;
```

## Example 2

`init.ts` contains:

```js
import {months, Ads} from "./__common"

var a = months;

var c = 754;
```

output: 

```js
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function Ads(arg){

}

var a = months;

var c = 754;
```


</detail>


## Attention

Recommends to use `import {name} from "./filename"` statement just for independent of any global variables classes and clear functions in imported file.

despite the fact that the standard allows such actions, the use of global variables in object-oriented programming is considered a bad practice among developers.
This is why we did not include support for this feature. 

If you have many global constants or variables in the imported file, please use  `import * as name from './filename'` statement instead.

I should also note that this plugin does not currently support importing npm packages. If your needs are beyond the scope of this package, I suggest using [rollup](https://www.npmjs.com/package/rollup).

## options:

- `release : true` - disable all comments inside importing file

## Advanced features: 

Besides using `import * as name from './...'`, `import {name} from './...'` you can also use `import './...``. 
But this option does not intended for types/class imports - what will you get a hint about in this case


## Other featres: 

If you need to skip some `import` statements, you should to wrap it into following comment with `lazy` keyword:

```js
/*-lazy*/
import * as lazy from "./__common"
/*lazy-*/
```

In this case the multiple comments with `lazy` word in output file will be removed including all `import` content between them