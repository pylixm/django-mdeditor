(function(){
    var factory = function (exports) {
        var lang = {
            name : "pt_BR",
            description : "Open source online Markdown editor.",
            tocTitle    : "Índice",
            toolbar : {
                undo             : "Desfazer(Ctrl+Z)",
                redo             : "Refazer(Ctrl+Y)",
                bold             : "Negrito",
                del              : "Tachado",
                italic           : "Itálico",
                quote            : "Bloco de Citação",
                ucwords          : "Palavras com a primeira letra em maiúscula",
                uppercase        : "Texto em maiúsculas",
                lowercase        : "Texto em minúsculas",
                h1               : "Título 1",
                h2               : "Título 2",
                h3               : "Título 3",
                h4               : "Título 4",
                h5               : "Título 5",
                h6               : "Título 6",
                "list-ul"        : "Lista não ordenada",
                "list-ol"        : "Lista ordenada",
                hr               : "Linha Horizontal",
                link             : "Link",
                "reference-link" : "Link de referência",
                image            : "Imagem",
                code             : "Código embutído",
                "preformatted-text" : "Texto pré-formatado / Bloco de Código (Identado por Tab)",
                "code-block"     : "Bloco de Código (Multi-linguagens)",
                table            : "Tabelas",
                datetime         : "Data/hora",
                emoji            : "Emoji",
                "html-entities"  : "Elemento de HTML",
                pagebreak        : "Quebra de página",
                watch            : "Não Ver",
                unwatch          : "Ver",
                preview          : "HTML Preview (Pressione Shift + ESC para sair)",
                fullscreen       : "Tela Cheia (Pressione ESC para sair)",
                clear            : "Limpar",
                search           : "Procurar",
                help             : "Ajuda",
                info             : "Sobre " + exports.title
            },
            buttons : {
                enter  : "OK",
                cancel : "Cancelar",
                close  : "Fechar"
            },
            dialog : {
                link : {
                    title    : "Link",
                    url      : "Endereço",
                    urlTitle : "Titulo",
                    urlEmpty : "Erro: Pro favor, preença o endereço do link."
                },
                referenceLink : {
                    title    : "Link de referência",
                    name     : "Nome",
                    url      : "Endereço",
                    urlId    : "ID",
                    urlTitle : "Titulo",
                    nameEmpty: "Erro: Nome de referência não pode estar vazio.",
                    idEmpty  : "Erro: Por favor preencha o link de refeência com id válido.",
                    urlEmpty : "Erro: Por favor preencha o link com uma url de referência correta."
                },
                image : {
                    title    : "Imagem",
                    url      : "Endereço",
                    link     : "Link",
                    alt      : "Titulo",
                    uploadButton     : "Envio",
                    imageURLEmpty    : "Erro: Endereço da imagem não pode estar em branco.",
                    uploadFileEmpty  : "Erro: É necessário enviar a imagem. Não pode estar vazio!",
                    formatNotAllowed : "Erro: Somente é possível enviar arquivos de figuras, Formatos permitidos:"
                },
                preformattedText : {
                    title             : "Texto pré-formatado / Código",
                    emptyAlert        : "Erro: Por favor preencher aqui com seu texto pré formatado / código.",
                    placeholder       : "codificando agora...."
                },
                codeBlock : {
                    title             : "Bloco de Código",
                    selectLabel       : "Linguagens: ",
                    selectDefaultText : "selecione o tipo de linguagem ...",
                    otherLanguage     : "Outras linguagenss",
                    unselectedLanguageAlert : "Erro: Por favor selecione a linguagem do código.",
                    codeEmptyAlert    : "Erro: Por favor selecione o conteúdo de código.",
                    placeholder       : "codificando agora...."
                },
                htmlEntities : {
                    title : "Elementos HTML"
                },
                help : {
                    title : "Ajuda"
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
