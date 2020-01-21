[self]: data/css/preprocessor/sass/node-sass
# [Node-sass][self]

[site]: https://sass-lang.com
[wiki]: https://ru.wikipedia.org/wiki/Sass
[Официальный сайт][site] | [Вики][wiki]

**Node-sass** - это реализация препроцессора Sass на языке C++.

## Для чего?
Для ускорения работы Sass. Пакет `sass` реализован на чистом JS, `node-sass` использует скомпилированный C++. Поскольку C++ ближе к железу, чем JS, то целесообразнее будет использовать `node-sass`. Зачем тогда `sass`? Для использования в командной строке.

## Как использовать?
Node-sass - это `npm` пакет. Достаточно установить его и использовать через `Node.js`. API у него такой же, как у `sass`.

## Полезные ссылки:
- [npm](https://www.npmjs.com/package/node-sass)
- [github](https://github.com/sass/node-sass)
- [JS API](https://sass-lang.com/documentation/js-api)
