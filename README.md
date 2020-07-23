# Gulp-packager

The simplest vanilla ts/js **packager** supporting base import/export operation. 

- Suitable for vanilla js/ts project or for beginners

- Includes a customized `gulpfile.js` with a typescript observer for quick start.

## Installation

```
npm install Sanshain/gulp-packager
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
var c = 75408;
```


turn out the content inside `init.js` in the same directory:

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

## Attention

Recommends to use `import {name} from "./filename"` statement just for independent of any global variables classes and clear functions in imported file.

despite the fact that the standard allows such actions, the use of global variables in object-oriented programming is considered a bad practice among developers.
This is why we did not include support for this feature. 

If you have many global constants or variables in the imported file, use  `import * as name from './filename'` statement instead and 
never use its with `class` and `type` declaration in same file.

## options:

- `release : true` - disable all comments inside importing file

## Advanced features: 

Besides using `import * as name from './...'`, `import {name} from './...'` you can also use `import './...``. 
But this option does not intended for types/class imports - what will you get a hint about in this case




