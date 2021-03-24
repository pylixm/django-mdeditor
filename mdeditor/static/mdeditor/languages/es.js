(function(){
    var factory = function (exports) {
        var lang = {
            name : "ex",
            description : "Open source online Markdown editor.",
            tocTitle    : "Índice",
            toolbar : {
                undo             : "Deshacer (Ctrl+Z)",
                redo             : "Rehacer (Ctrl+Y)",
                bold             : "Bold",
                del              : "Tachado",
                italic           : "Cursiva",
                quote            : "Citar",
                ucwords          : "Primera letra de las en mayúsculas",
                uppercase        : "Convertir la selección a mayúsculas",
                lowercase        : "Convertir la selección a minúsculas",
                h1               : "Título 1",
                h2               : "Título 2",
                h3               : "Título 3",
                h4               : "Título 4",
                h5               : "Título 5",
                h6               : "Título 6",
                "list-ul"        : "Lista no ordenada",
                "list-ol"        : "Lista ordenada",
                hr               : "Línea horizontal",
                link             : "Enlace",
                "reference-link" : "Referencia a enlace",
                image            : "Imagen",
                code             : "Código",
                "preformatted-text" : "Texto preformateado / Bloque de código (Indentado por Tab)",
                "code-block"     : "Bloque de código (Multi-lenguaje)",
                table            : "Tables",
                datetime         : "Datetime",
                emoji            : "Emoji",
                "html-entities"  : "Entidades HTML",
                pagebreak        : "Salto de página",
                watch            : "Unwatch",
                unwatch          : "Watch",
                preview          : "Vista previa HTML (Shift + ESC para salir)",
                fullscreen       : "Pantalla completa (ESC para salir)",
                clear            : "Borrar",
                search           : "Buscar",
                help             : "Ayuda",
                info             : "Sobre " + exports.title
            },
            buttons : {
                enter  : "Intro",
                cancel : "Cancelar",
                close  : "Cerrar"
            },
            dialog : {
                link : {
                    title    : "Enlace",
                    url      : "Dirección",
                    urlTitle : "Título",
                    urlEmpty : "Error: Introduzca la dirección del enlace."
                },
                referenceLink : {
                    title    : "Referencia a enlace",
                    name     : "Nombre",
                    url      : "Dirección",
                    urlId    : "ID",
                    urlTitle : "Título",
                    nameEmpty: "Error: El nombre no puede estar vacío.",
                    idEmpty  : "Error: Introduzca un ID.",
                    urlEmpty : "Error: Introduzca una dirección URL."
                },
                image : {
                    title    : "Imagen",
                    url      : "Dirección",
                    link     : "Enlace",
                    alt      : "Título",
                    uploadButton     : "Cargar",
                    imageURLEmpty    : "Error: La dirección URL de la imagen no pueder estar vacia.",
                    uploadFileEmpty  : "Error: upload pictures cannot be empty!",
                    formatNotAllowed : "Error: Sólo se pueden cargar ficheros de imagen, los formatos permitidos son:"
                },
                preformattedText : {
                    title             : "Texto preformateado / Código", 
                    emptyAlert        : "Error: Introduzca el texto preformateado o el código.",
                    placeholder       : "Código...."
                },
                codeBlock : {
                    title             : "Bloque de código",         
                    selectLabel       : "Lenguajes: ",
                    selectDefaultText : "Selecciona un lenguaje...",
                    otherLanguage     : "Otros",
                    unselectedLanguageAlert : "Error: Selecciona un lenguaje.",
                    codeEmptyAlert    : "Error: Introduce el código.",
                    placeholder       : "Código...."
                },
                htmlEntities : {
                    title : "Entidades HTML"
                },
                help : {
                    title : "Ayuda"
                }
            }
        };
        
        exports.defaults.lang = lang;
    };
    
    // CommonJS/Node.js
    if (typeof require === "function" && typeof exports === "object" && typeof module === "object")
    { 
        module.exports = factory;
    }
    else if (typeof define === "function")  // AMD/CMD/Sea.js
    {
        if (define.amd) { // for Require.js

            define(["editormd"], function(editormd) {
                factory(editormd);
            });

        } else { // for Sea.js
            define(function(require) {
                var editormd = require("../editormd");
                factory(editormd);
            });
        }
    } 
    else
    {
        factory(window.editormd);
    }
    
})();
