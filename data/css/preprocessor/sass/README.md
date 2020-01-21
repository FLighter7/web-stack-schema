[self]: data/css/preprocessor/sass
# [Sass/SCSS][self]

[site]: https://sass-lang.com
[wiki]: https://ru.wikipedia.org/wiki/Sass
[Официальный сайт][site] | [Вики][wiki]

**Sass/SCSS (далее Sass)** - это препроцессор.

## Какую проблему решает?
[См. "Препроцессоры"](data/css/preprocessor)

## Как решает?
Sass - это `npm` пакет, а его файлы - это обычные текстовые файлы с расширением `.sass` или `.scss`. Может запускаться из командной строки или из-под `Node.js`. Для запуска из командной строки используется команда `sass`.
<br>
Sass имеет два синтаксиса: **Sass** и **SCSS**. Отличие в том, что Sass не использует фигурные скобки и точку с запятой, а основывается на отступах.
<br>
Также: любой CSS файл - это валидный SCSS файл.

**Sass:**
```sass
body
    color: red
```

**SCSS:**
```scss
body {
    color: red;    
}
```

Результат компиляции - CSS файл.


## Полезные ссылки:
- [npm](https://www.npmjs.com/package/sass)
- [github](https://github.com/sass/sass)
- [JS API](https://sass-lang.com/documentation/js-api)
