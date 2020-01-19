[self]: data/css
# [CSS][self]

[site]: https://www.w3.org/Style/CSS/Overview.en.html
[wiki]: https://ru.wikipedia.org/wiki/CSS
[Официальный сайт][site] | [Вики][wiki]

**CSS** (`Cascading Style Sheets`) - это язык описания внешнего вида (стилей) документа.

## Для чего нужен?
Для описания стилей документа, который написан на языке разметки (HTML, SVG, XML, ...). К примеру, надо сделать контент другого цвета, поменять ему позиционирование, фон и тд.

## Как использовать?
CSS описывается в обычном текстовом файле с расширением `.css` или в файле разметки. Базовый пример CSS:
```css
body {
    background-color: silver;
}
```
Существует три способа применения CSS к HTML:
1. Внутри тега `<head>` через ссылку на внешний файл стилей:
    ```html
    <link rel='stylesheet' type='text/css' href='<полный_или_относительный_путь_до_файла>.css'>
    ```
2. Внутри тега `<head>` через тег `<style>`:
    ```html
    <style>
        /* Сюда вставить стили, тогда .css файл не нужен */
        body {
            background-color: silver;
        }
    </style>
    ```
3. Написать стили непосредственно внутри элемента, к которому они применяются (inline стили), через атрибут `style`:
    ```html
    <body style='background-color: silver;'></body>
    ```

## Полезные ссылки:
- [Учебник от w3schools (англ)](https://www.w3schools.com/css)
- [Учебник от Mozilla](https://developer.mozilla.org/ru/docs/Web/CSS)
- [Самоучитель по CSS (устаревший, но не менее хороший)](http://htmlbook.ru/samcss)
