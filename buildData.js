/**
 *  Structure:
    type OneObject =
    {
        id:        string,
        text:      string,
        x?:        number,
        y?:        number,
        angle?:    number,
        distance?: number,
        isGroup?:  boolean,
        scale?:    number,
        children?: OneObject[],
    }

    id       - path to the element
    text     - human-readable name
    x        - X relative to previous element
    y        - Y relative to previous element
    isGroup  - is element clickable with some info in the README.md (default false)
    scale    - scale of the element (default 20)
    angle    - 0-360 - deviation angle from the previous element
    distance - distance from the previous element
 */

const fs        = require('fs'),
      util      = require('util'),
      input     = `${__dirname}/data/`,
      readDir   = util.promisify(fs.readdir),
      readFile  = util.promisify(fs.readFile),
      isDir     = path => fs.statSync(path).isDirectory(),
      getJson   = async path =>
      {
        if(!fs.existsSync(path))
            throw `JSON config file doesn't exist on the path: ${path}`;
        const file = await readFile(path, 'utf8');
        if(!file.length)
            throw `JSON config file is empty on the path: ${path}`;
        try
        {
            return JSON.parse(file);
        }
        catch(e)
        {
            throw `Invalid JSON config file on the path: ${path}`;
        }
      },
      concat    = result => `const data = ${JSON.stringify(result, null, '    ')};\n\nexport default data;\n`,
      getCoords = ({x, y, angle, distance = 2, scale = 1}, path) =>
      {
        const defaultRadius = 20;
        if(x !== undefined && y !== undefined)
            return {x, y};
        if(angle !== undefined)
        {
            const radius = defaultRadius * (scale + 1) * distance;
            angle = angle * Math.PI / -180;
            x = Math.cos(angle) * radius;
            y = Math.sin(angle) * radius;
            return {
                x: Math.round(x),
                y: Math.round(y),
            };
        }
        throw `Couldn't find {x, y}, not enough information on path: ${path}`;
      };

async function build(path)
{
    try
    {
        const result = await walkTree(path);
        fs.writeFile(
            `${input}data.js`,
            concat(result),
            e => e ? console.error(e) : console.log('data.js saved')
        );
    }
    catch(e)
    {
        console.error(e);
    }
}

async function walkTree(currentPath, id = '/')
{
    let result = [];
    const insides = await readDir(currentPath);
    for(const name of insides)
    {
        const absolutePath = currentPath+name+'/';
        if(!isDir(absolutePath))
            continue;
        // Fill the object
        const json = await getJson(`${absolutePath}${name}.json`);
        let o =
        {
            id:   id+name,
            text: json.text,
        };
        let {x, y} = getCoords(json, absolutePath);
        o.x = x;
        o.y = y;
        /**
         * Optional parameters
         */
        // Group
        if(!fs.existsSync(`${absolutePath}README.md`))
            o.isGroup = true;
        // Scale
        json.scale && (o.scale = json.scale);
        // Children
        const children = await walkTree(absolutePath, id+name+'/');
        children.length && (o.children = children);
        // Push
        result.push(o);
    }

    return result;
}

build(input);
