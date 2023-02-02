import fs from 'fs';
import Path from 'path';
import JSON5 from 'json5';

const basePath = './plugins';
const contributorPath = './contributors';

const compiled = {
  contributors: {},
  categories: [],
  plugins: []
};

console.log(' - Processing plugins');

const categories = fs.readdirSync(basePath);

for (const category of categories) {
  compiled.categories.push(category);

  const pluginsPath = Path.join(basePath, category);
  const plugins = fs.readdirSync(pluginsPath);

  for (const plugin of plugins) {
    const file = fs.readFileSync(Path.join(pluginsPath, plugin, 'module.json5'));
    const info = JSON5.parse(file);

    info.category = category;

    compiled.plugins.push(info);
  }

  console.log(`Processed ${ category } category`);
}

console.log(' - Processing contributors');

const contributors = fs.readdirSync(contributorPath);

for (const contributor of contributors) {
  const file = fs.readFileSync(Path.join(contributorPath, contributor));
  const info = JSON5.parse(file);

  compiled.contributors[contributor.split('.')[0]] = info;
}

fs.writeFileSync('./public/build.json', JSON.stringify(compiled));

console.log(' - Done');
