const data = [
    {
        "id": "/css",
        "text": "CSS",
        "x": -60,
        "y": 37.5,
        "scale": 2,
        "children": [
            {
                "id": "/css/postprocessor",
                "text": "Постпроцессоры",
                "x": -140,
                "y": 0,
                "scale": 2.5,
                "children": [
                    {
                        "id": "/css/postprocessor/minification",
                        "text": "Минификаторы",
                        "x": 0,
                        "y": 186,
                        "scale": 2.1,
                        "children": [
                            {
                                "id": "/css/postprocessor/minification/clean-css",
                                "text": "clean-css",
                                "x": -104,
                                "y": 0,
                                "scale": 1.6
                            },
                            {
                                "id": "/css/postprocessor/minification/cssnano",
                                "text": "cssnano",
                                "x": 0,
                                "y": 100,
                                "scale": 1.5
                            },
                            {
                                "id": "/css/postprocessor/minification/csso",
                                "text": "CSSO",
                                "x": -71,
                                "y": 71,
                                "scale": 1.5
                            }
                        ]
                    },
                    {
                        "id": "/css/postprocessor/postcss",
                        "text": "PostCSS",
                        "x": -100,
                        "y": 0,
                        "scale": 1.5,
                        "children": [
                            {
                                "id": "/css/postprocessor/postcss/autoprefixer",
                                "text": "Autoprefixer",
                                "x": -62,
                                "y": -107,
                                "scale": 2.1
                            }
                        ]
                    },
                    {
                        "id": "/css/postprocessor/stylelint",
                        "text": "stylelint",
                        "x": -156,
                        "y": 90,
                        "scale": 2
                    }
                ]
            },
            {
                "id": "/css/preprocessor",
                "text": "Препроцессоры",
                "x": -90,
                "y": -107,
                "scale": 2.5,
                "children": [
                    {
                        "id": "/css/preprocessor/less",
                        "text": "Less",
                        "x": 0,
                        "y": -100,
                        "scale": 1.5
                    },
                    {
                        "id": "/css/preprocessor/sass",
                        "text": "Sass/SCSS",
                        "x": -74,
                        "y": -74,
                        "scale": 1.6,
                        "children": [
                            {
                                "id": "/css/preprocessor/sass/node-sass",
                                "text": "Node-sass",
                                "x": -74,
                                "y": -74,
                                "scale": 1.6
                            }
                        ]
                    },
                    {
                        "id": "/css/preprocessor/stylus",
                        "text": "Stylus",
                        "x": -100,
                        "y": 0,
                        "scale": 1.5
                    }
                ]
            }
        ]
    },
    {
        "id": "/html",
        "text": "HTML",
        "x": 0,
        "y": -67.5,
        "scale": 2,
        "children": [
            {
                "id": "/html/template-engine",
                "text": "Шаблонизаторы",
                "x": 99,
                "y": -99,
                "scale": 2.5,
                "children": [
                    {
                        "id": "/html/template-engine/ejs",
                        "text": "EJS",
                        "x": 0,
                        "y": -120,
                        "scale": 2
                    },
                    {
                        "id": "/html/template-engine/pug",
                        "text": "Pug (Jade)",
                        "x": 120,
                        "y": 0,
                        "scale": 2
                    }
                ]
            }
        ]
    },
    {
        "id": "/javascript",
        "text": "JavaScript",
        "x": 60,
        "y": 37.5,
        "scale": 2
    }
];

export default data;
