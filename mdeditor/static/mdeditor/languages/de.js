(function(){
    var factory = function (exports) {
        var lang = {
            name : "de",
            description : "Open source online Markdown editor.",
            tocTitle    : "Inhalt",
            toolbar : {
                undo             : "Rückgängig(Ctrl+Z)",
                redo             : "Wiederholen(Ctrl+Y)",
                bold             : "Fett",
                del              : "Durchgestrichen",
                italic           : "Kursiv",
                quote            : "Block Zitat",
                ucwords          : "Erster Buchstabe des Worts groß",
                uppercase        : "Auswahltext in Großbuchstaben konvertieren",
                lowercase        : "Auswahltext in Kleinbuchstaben konvertieren",
                h1               : "Überschrift 1",
                h2               : "Überschrift 2",
                h3               : "Überschrift 3",
                h4               : "Überschrift 4",
                h5               : "Überschrift 5",
                h6               : "Überschrift 6",
                "list-ul"        : "Ungeordnete Liste",
                "list-ol"        : "Geordnete Liste",
                hr               : "Horizontale Linie",
                link             : "Link",
                "reference-link" : "Referenzlink",
                image            : "Bild",
                code             : "Code inline",
                "preformatted-text" : "Vorformatierter Text / Codeblock (Tab Einrückung)",
                "code-block"     : "Codeblock (Multi-languages)",
                table            : "Tabellen",
                datetime         : "Datum & Zeit",
                emoji            : "Emoji",
                "html-entities"  : "HTML Entities",
                pagebreak        : "Seitenumbruch",
                watch            : "Unwatch",
                unwatch          : "Watch",
                preview          : "HTML Vorschau (Shift + ESC zum verlassen)",
                fullscreen       : "Vollbild (ESC zum verlassen)",
                clear            : "Löschen",
                search           : "Suchen",
                help             : "Hilfe",
                info             : "Über " + exports.title
            },
            buttons : {
                enter  : "Eingeben",
                cancel : "Abbrechen",
                close  : "Schließen"
            },
            dialog : {
                link : {
                    title    : "Link",
                    url      : "Adresse",
                    urlTitle : "Titel",
                    urlEmpty : "Fehler: Bitte Link Adresse angeben."
                },
                referenceLink : {
                    title    : "Referenzlink",
                    name     : "Name",
                    url      : "Adresse",
                    urlId    : "ID",
                    urlTitle : "Titel",
                    nameEmpty: "Fehler: Referenzlink Name kann nicht leer sein.",
                    idEmpty  : "Fehler: Bitte Referenzlink ID angeben.",
                    urlEmpty : "Fehler: Bitte Referenzlink URL Adresse angeben."
                },
                image : {
                    title    : "Bild",
                    url      : "Adresse",
                    link     : "Link",
                    alt      : "Titel",
                    uploadButton     : "Hochladen",
                    imageURLEmpty    : "Fehler: Bild URL Adresse darf nciht leer sein.",
                    uploadFileEmpty  : "Fehler: Bild darf nicht leer sein!",
                    formatNotAllowed : "Fehler: nur Bilddatei upload möglich. Bitte im Format:"
                },
                preformattedText : {
                    title             : "Vorformatierter Text / Codeblock ",
                    emptyAlert        : "Fehler: Bitte den vorformatierten text oder Code Inhalt eingeben.",
                    placeholder       : "Codiere jetzt ..."
                },
                codeBlock : {
                    title             : "Codeblock",
                    selectLabel       : "Sprachen: ",
                    selectDefaultText : "Programmiersprache wählen...",
                    otherLanguage     : "Andere sprachen",
                    unselectedLanguageAlert : "Fehler: Bitte Programmiersprache wählen.",
                    codeEmptyAlert    : "Fehler: Bitte den Code Inhalt eingeben.",
                    placeholder       : "Codiere jetzt ..."
                },
                htmlEntities : {
                    title : "HTML Entities"
                },
                help : {
                    title : "Hilfe"
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