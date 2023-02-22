/**
	Structure:
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
const fs = require('fs');
const path = require('path');
const util = require('util');
const input = `${__dirname}/data/`;
const readDir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const isDir = path => fs.statSync(path).isDirectory();

const getJson = async (path) => {
	if(!fs.existsSync(path)) {
		throw `JSON config file doesn't exist on the path: ${path}`;
	}

	const file = await readFile(path, 'utf8');

	if(!file.length) {
		throw `JSON config file is empty on the path: ${path}`;
	}

	try {
		return JSON.parse(file);
	} catch(e) {
		throw `Invalid JSON config file on the path: ${path}`;
	}
};

const getCoords = ({x, y, angle, distance = 2, scale = 1}, path) => {
	const defaultRadius = 20;

	if(x !== undefined && y !== undefined) {
		return {x, y};
	}

	if(angle !== undefined) {
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

async function walkTree(currentPath, id = '/') {
	let result = [];
	const insides = await readDir(currentPath);

	for(const name of insides) {
		const absolutePath = currentPath+name+'/';

		if(!isDir(absolutePath)) {
			continue;
		}

		// Fill the object
		const json = await getJson(`${absolutePath}${name}.json`);
		const o = {
			id:   id+name,
			text: json.text,
		};
		const {x, y} = getCoords(json, absolutePath);
		o.x = x;
		o.y = y;

		/**
		 * Optional parameters
		 */
		// Group
		if(!fs.existsSync(`${absolutePath}README.md`)) {
			o.isGroup = true;
		}

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

(async () => {
	try {
		const result = await walkTree(input);
		const output = path.join(input, '/index.js');
		const data = `const data = ${JSON.stringify(result, null, '\t')};\n\nexport default data;\n`;

		fs.writeFile(output, data, (e) => e ? console.error(e) : console.log('data/index.js saved'));
	} catch(e) {
		console.error(e);
	}
})();
