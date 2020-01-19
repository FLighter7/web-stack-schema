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
                        "id": "/css/postprocessor/postcss",
                        "text": "PostCSS",
                        "x": -100,
                        "y": 0,
                        "isGroup": true,
                        "scale": 1.5,
                        "children": [
                            {
                                "id": "/css/postprocessor/postcss/autoprefixer",
                                "text": "Autoprefixer",
                                "x": -124,
                                "y": 0,
                                "isGroup": true,
                                "scale": 2.1
                            }
                        ]
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
                        "isGroup": true,
                        "scale": 1.5
                    },
                    {
                        "id": "/css/preprocessor/sass",
                        "text": "Sass",
                        "x": -71,
                        "y": -71,
                        "isGroup": true,
                        "scale": 1.5
                    },
                    {
                        "id": "/css/preprocessor/stylus",
                        "text": "Stylus",
                        "x": -100,
                        "y": 0,
                        "isGroup": true,
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
