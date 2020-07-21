// import "fs";

var fs = require("fs");

const extensions = ['.ts','.js']
var exportedFiles = []

integrate("base.ts", 'result.js')



function integrate(from, to){

    var content = fs.readFileSync(from).toString();    

    content = removeLazy(content)

    var content = importInsert(content);    

    fs.writeFileSync(to, content)    
}

function removeLazy(content){    

    return content.replace(/\/\*-lazy\*\/[\s\S]*?\/\*lazy-\*\//, '');    
}

function importInsert(content){

    let regex = /^import \* as (?<module>\w+) from \"\.\/(?<filename>\w+)\"/gm;            
    content = content.replace(regex, unitPack);

    ///* not recommended, but easy for realization:
    regex = /^import \"\.\/(?<filename>\w+)\"/gm;
    content = content.replace(regex, allocPack); //*/

    regex = /^import {([\w, ]+)} from \".\/(\w+)\"/gm
    content = content.replace(regex, wrapPack); //*/

    // remove comments:
    /*
    content = content.replace(/\/\*[\s\S]*?\*\//g, '')
    content = content.replace(/\/\/[\s\S]*?\n/g, '\n'); //*/

    return content
}


function wrapPack(match, classNames, fileName, offset, source){

    content = getContent(fileName)
    if (content == '') return ''

    classNames = classNames.split(',').map(s => s.trim())
    matches1 = Array.from(content.matchAll(/^export (let|var) (\w+) = [^\n]+/gm))    
    matches2 = Array.from(content.matchAll(/^export (function) (\w+)[ ]*\([\w, ]*\)[\s]*{[\w\W]*?\n}/gm))
    matches3 = Array.from(content.matchAll(/^export (class) (\w+)([\s]*{[\w\W]*?\n})/gm))
    var matches = matches1.concat(matches2, matches3);

    var match = ''
    for (let unit of matches)
    {
        if (classNames.includes(unit[2])){
            
            match += unit[0].substr(7) + '\n\n'
        }        
    }
    
    content = `\n/*start of ${fileName}*/\n${match.trim()}\n/*end*/\n\n` 

    return content;
}

function unitPack(match, modulName, fileName, offset, source){

    content = getContent(fileName)
    if (content == '') return ''

    let exportList = []

    content = content.replace(/^(let|var) /gm, 'let ')
    content = content.replace(/^export (let|var|function|class) (\w+)/gm, 
    function(match, declType, varName, offset, source)
    {
        // exportList[varName] = varName

        postfix = ''
        if (declType == 'function') postfix = '.bind(window)'
        exportList.push('\t\t' + varName + ":" + varName)
        return declType + ' ' + varName;
    });

    var unitObj = exportList.join(',\n')
    content += `\n\nvar ${modulName} = {\n ${unitObj} \n}`

    content = '{\n' + content.replace(/^([\S \t])/gm, '    $1') + '\n}'    

    content = `\n/*start of ${fileName}*/\n${content}\n/*end*/\n\n`    

    return content;
}

function allocPack(match, fileName, offset, source){

    content = getContent(fileName)
    if (content == '') return ''

    var simple = false;
    if (simple){
        // w/o unique check of variable names! ie- supports
        content = content.replace(/^export /gm, '')    
    }
    else{
        // vs unique check of variable names! ie11+
        content = content.replace(/^(let|var) /gm, 'let ')
        content = content.replace(/^export (let|var) /gm, 'var ')            
        content = content.replace(/^export function (?<funcname>\w+)\(/gm, 'var $1 = function(')
        
        var warn = /^export (class) (\w+)/gm.exec(content);
        if (warn){
            throw new Error(`use "import {${warn[2]}} from './${fileName}'" `+
                        `statement for class import instead of common import *`)
        }
        content = '{\n' + content.replace(/^([\S])/gm, '    $1') + '\n}'
        
    }
    
    content = `\n/*start of ${fileName}*/\n${content}\n/*end*/\n\n`    

    return content;
}


function getContent(fileName){

    for(let ext of extensions){
        if (fs.existsSync(fileName + ext)) 
        {   
            fileName = fileName + ext;
            break;            
        }
    }

    if (exportedFiles.includes(fileName)) 
    {
        
        // let lineNumber = source.substr(0, offset).split('\n').length
        console.warn(`attempting to re-import '${fileName}' into 'base.ts' has been rejected`);
        return ''
    }
    else exportedFiles.push(fileName)
    

    var content = fs.readFileSync(fileName).toString()    

    // content = Convert(content)

    return content;
}
