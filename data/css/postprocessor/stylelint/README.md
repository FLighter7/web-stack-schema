[self]: data/css/postprocessor/stylelint
# [stylelint][self]

[site]: https://stylelint.io
[Официальный сайт][site]

**stylelint** - это постпроцессор.

## Для чего нужен?
Основываясь на двух аксиомах:
- Людям свойственно ошибаться
- Разные разработчики пишут код в разном стиле

stylelint берёт на себя следующие задачи:
- Анализ CSS на наличие ошибок и предупреждение о них разработчика
- Проверка единообразия кода

## Как использовать?
[1]: https://stylelint.io/#getting-started
[2]: https://stylelint.io/user-guide/node-api#syntax
stylelint - это `npm` пакет, который может запускаться из командной строки, из-под `Node.js` через собственный API, в качестве PostCSS плагина или быть частью какой-либо [системы сборки][1]. Для запуска из командной строки используется команда `stylelint`.
<br>stylelint понимает не только CSS, но и Sass, Less и [другие синтаксисы][2]. Но, возможно, понадобится установить дополнительные плагины к stylelint, которые смогут анализировать ошибки в этих синтаксисах.

## Полезные ссылки:
- [npm](https://www.npmjs.com/package/stylelint)
- [github](https://github.com/stylelint/stylelint)
