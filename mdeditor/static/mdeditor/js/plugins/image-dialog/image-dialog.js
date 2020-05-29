/*!
 * Image (upload) dialog plugin for Editor.md
 *
 * @file        image-dialog.js
 * @author      pandao
 * @version     1.3.4
 * @updateTime  2015-06-09
 * {@link       https://github.com/pandao/editor.md}
 * @license     MIT
 */

(function() {

    var factory = function (exports) {

		var pluginName   = "image-dialog";

		exports.fn.imageDialog = function() {

            var _this       = this;
            var cm          = this.cm;
            var lang        = this.lang;
            var editor      = this.editor;
            var settings    = this.settings;
            var cursor      = cm.getCursor();
            var selection   = cm.getSelection();
            var imageLang   = lang.dialog.image;
            var classPrefix = this.classPrefix;
            var iframeName  = classPrefix + "image-iframe";
			var dialogName  = classPrefix + pluginName, dialog;
			var img_width 	= "img_width";
			var img_height 	= "img_height";
			var img_per		= "img_per";
			var img_qua		= "img_qua";

			imageLang.width=imageLang.width?imageLang.width:"宽";
			imageLang.height=imageLang.height?imageLang.height:"高";
			imageLang.scaling=imageLang.scaling?imageLang.scaling:"缩放";
			imageLang.quality=imageLang.quality?imageLang.quality:"质量(小于95)";

			cm.focus();

            var loading = function(show) {
                var _loading = dialog.find("." + classPrefix + "dialog-mask");
                _loading[(show) ? "show" : "hide"]();
            };

            if (editor.find("." + dialogName).length < 1)
            {
                var guid   = (new Date).getTime();
                var action = settings.imageUploadURL + (settings.imageUploadURL.indexOf("?") >= 0 ? "&" : "?") + "guid=" + guid;

                if (settings.crossDomainUpload)
                {
                    action += "&callback=" + settings.uploadCallbackURL + "&dialog_id=editormd-image-dialog-" + guid;
                }

                var dialogContent = ( (settings.imageUpload) ? "<form id=\"form\" action=\"" + action +"\" target=\"" + iframeName + "\" method=\"post\" enctype=\"multipart/form-data\" class=\"" + classPrefix + "form\">" : "<div class=\"" + classPrefix + "form\">" ) +
                                        ( (settings.imageUpload) ? "<iframe name=\"" + iframeName + "\" id=\"" + iframeName + "\" guid=\"" + guid + "\"></iframe>" : "" ) +
                                        "<label>" + imageLang.url + "</label>" +
                                        "<input type=\"text\" data-url />"+ (function(){
                                            return (settings.imageUpload) ? "<div class=\"" + classPrefix + "file-input\">" +
                                            "<input type=\"file\" name=\"" + classPrefix + "image-file\" accept=\"image/*\" />" +
                                            "<input id=\"submit\" type=\"submit\" value=\"" + imageLang.uploadButton + "\" />" +
                                                                            "</div>" : "";
                                        })() +
                                        "<br/>" +
                                        "<label>" + imageLang.alt + "</label>" +
                                        "<input type=\"text\" value=\"" + selection + "\" data-alt />" +
                                        "<br/>" +
                                        "<label>" + imageLang.link + "</label>" +
                                        "<input type=\"text\" value=\"http://\" data-link />" +
                                        "<br/>" +
										"<label>" + imageLang.width + "</label>" +
                                      "<input  type=\"text\" value=\"\" id=\""+img_width+"\" autocomplete=\"off\" />" +
									  "<br/>" +
									  "<label>" + imageLang.height + "</label>" +
											"<input  type=\"text\" value=\"\"  id=\""+img_height+"\" autocomplete=\"off\" />"  +
											"<br/>" +
									  "<label>" + imageLang.scaling + "</label>" +
											"<input  type=\"text\" value=\"\"  id=\""+img_per+"\" autocomplete=\"off\" />"  +
											"<br/>" +
									  "<label>" + imageLang.quality + "</label>" +
											"<input  type=\"text\" value=\"\"  id=\""+img_qua+"\" autocomplete=\"off\" />"  +
                                    ( (settings.imageUpload) ? "</form>" : "</div>");

                //var imageFooterHTML = "<button class=\"" + classPrefix + "btn " + classPrefix + "image-manager-btn\" style=\"float:left;\">" + imageLang.managerButton + "</button>";


                dialog = this.createDialog({
                    title      : imageLang.title,
                    width      : (settings.imageUpload) ? 465 : 380,
                    height     : 430,
                    name       : dialogName,
                    content    : dialogContent,
                    mask       : settings.dialogShowMask,
                    drag       : settings.dialogDraggable,
                    lockScreen : settings.dialogLockScreen,
                    maskStyle  : {
                        opacity         : settings.dialogMaskOpacity,
                        backgroundColor : settings.dialogMaskBgColor
                    },
                    buttons : {
                        enter : [lang.buttons.enter, function() {
                            var url  = this.find("[data-url]").val();
                            var alt  = this.find("[data-alt]").val();
                            var link = this.find("[data-link]").val();

                            if (url === "")
                            {
                                alert(imageLang.imageURLEmpty);
                                return false;
                            }

							var altAttr = (alt !== "") ? " \"" + alt + "\"" : "";

                            if (link === "" || link === "http://")
                            {
                                cm.replaceSelection("![" + alt + "](" + url + altAttr + ")");
                            }
                            else
                            {
                                cm.replaceSelection("[![" + alt + "](" + url + altAttr + ")](" + link + altAttr + ")");
                            }

                            if (alt === "") {
                                cm.setCursor(cursor.line, cursor.ch + 2);
                            }

                            this.hide().lockScreen(false).hideMask();

                            return false;
                        }],

                        cancel : [lang.buttons.cancel, function() {
                            this.hide().lockScreen(false).hideMask();

                            return false;
                        }]
                    }
                });


                dialog.attr("id", classPrefix + "image-dialog-" + guid);

				if (!settings.imageUpload) {
                    return ;
                }

				var fileInput  = dialog.find("[name=\"" + classPrefix + "image-file\"]");

				var img_width_val = document.getElementById(img_width).value?document.getElementById(img_width).value:0;
				var img_height_val = document.getElementById(img_height).value?document.getElementById(img_height).value:0;
				var img_per_val = document.getElementById(img_per).value?document.getElementById(img_per).value:1;
				var img_qua_val = document.getElementById(img_qua).value?document.getElementById(img_qua).value:75;
				dialog.find("#"+img_width).bind("keyup",function(e){

					if(e.keyCode>=48&&e.keyCode<=57||e.keyCode==8)
					img_width_val = document.getElementById(img_width).value;
					else{
						document.getElementById(img_width).value=img_width_val;
					}

					document.getElementById("form").action=action+"&imgWidth="+img_width_val+"&imgHeight="+img_height_val+"&imgPer="+img_per_val+"&imgQua="+img_qua_val;
				});

				dialog.find("#"+img_height).bind("keyup",function(e){

					if(e.keyCode>=48&&e.keyCode<=57||e.keyCode==8)
					img_height_val = document.getElementById(img_height).value
					else{
					document.getElementById(img_height).value=img_height_val;
					}
					document.getElementById("form").action=action+"&imgWidth="+img_width_val+"&imgHeight="+img_height_val+"&imgPer="+img_per_val+"&imgQua="+img_qua_val;
				});

				dialog.find("#"+img_per).bind("keyup",function(e){

					img_per_val = document.getElementById(img_per).value
					document.getElementById("form").action=action+"&imgWidth="+img_width_val+"&imgHeight="+img_height_val+"&imgPer="+img_per_val+"&imgQua="+img_qua_val;
				})
				dialog.find("#"+img_qua).bind("keyup",function(e){

					img_qua_val = document.getElementById(img_qua).value
					document.getElementById("form").action=action+"&imgWidth="+img_width_val+"&imgHeight="+img_height_val+"&imgPer="+img_per_val+"&imgQua="+img_qua_val;
				})

				fileInput.bind("change", function() {
					var fileName  = fileInput.val();
					var isImage   = new RegExp("(\\.(" + settings.imageFormats.join("|") + "))$"); // /(\.(webp|jpg|jpeg|gif|bmp|png))$/

					if (fileName === "")
					{
						alert(imageLang.uploadFileEmpty);

                        return false;
					}

                    if (!isImage.test(fileName))
					{
						alert(imageLang.formatNotAllowed + settings.imageFormats.join(", "));
                        return false;
					}

                    loading(true);

                    var submitHandler = function() {

                        var uploadIframe = document.getElementById(iframeName);
                        uploadIframe.onload = function() {

                            loading(false);

                            var body = (uploadIframe.contentWindow ? uploadIframe.contentWindow : uploadIframe.contentDocument).document.body;
                            var json = (body.innerText) ? body.innerText : ( (body.textContent) ? body.textContent : null);

                            json = (typeof JSON.parse !== "undefined") ? JSON.parse(json) : eval("(" + json + ")");

                            if(!settings.crossDomainUpload)
                            {
                              if (json.success === 1)
                              {
                                  dialog.find("[data-url]").val(json.url);
                              }
                              else
                              {
                                  alert(json.message);
                              }
                            }
                            document.getElementById("form").action=action+"&imgWidth="+0+"&imgHeight="+0+"&imgPer="+1+"&imgQua="+75;
                            return false;
                        };
                    };

                    dialog.find("[type=\"submit\"]").bind("click", submitHandler).trigger("click");
				//		dialog.find(".editormd-enter-btn").bind("click", submitHandler).trigger("click");
				});
            }

			dialog = editor.find("." + dialogName);
			dialog.find("[type=\"text\"]").val("");
			dialog.find("[type=\"file\"]").val("");
			dialog.find("[data-link]").val("http://");

			this.dialogShowMask(dialog);
			this.dialogLockScreen();
			dialog.show();

		};

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
                var editormd = require("../../editormd");
                factory(editormd);
            });
		}
	}
	else
	{
        factory(window.editormd);
	}

})();
