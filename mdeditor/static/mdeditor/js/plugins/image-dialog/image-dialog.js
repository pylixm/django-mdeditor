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

(function () {

    var factory = function (exports) {

        var pluginName = "image-dialog";

        exports.fn.imageDialog = function () {

            var _this = this;
            var cm = this.cm;
            var lang = this.lang;
            var editor = this.editor;
            var settings = this.settings;
            var cursor = cm.getCursor();
            var selection = cm.getSelection();
            var imageLang = lang.dialog.image;
            var classPrefix = this.classPrefix;
            var iframeName = classPrefix + "image-iframe";
            var dialogName = classPrefix + pluginName, dialog;
            var img_width = "img_width";
            var img_height = "img_height";
            var img_scaling = "img_scaling";
            var img_quality = "img_quality";
            //设定默认值
            var width_default = 0;
            var height_default = 0;
            //默认不缩放
            var scaling_default = 1;
            var quality_default = 75;

            imageLang.width = imageLang.width ? imageLang.width : "宽";
            imageLang.height = imageLang.height ? imageLang.height : "高";
            imageLang.scaling = imageLang.scaling ? imageLang.scaling : "缩放";
            imageLang.quality = imageLang.quality ? imageLang.quality : "质量(小于95)";


            cm.focus();

            var loading = function (show) {
                var _loading = dialog.find("." + classPrefix + "dialog-mask");
                _loading[(show) ? "show" : "hide"]();
            };

            if (editor.find("." + dialogName).length < 1) {
                var guid = (new Date).getTime();
                var action = settings.imageUploadURL + (settings.imageUploadURL.indexOf("?") >= 0 ? "&" : "?") + "guid=" + guid;

                if (settings.crossDomainUpload) {
                    action += "&callback=" + settings.uploadCallbackURL + "&dialog_id=editormd-image-dialog-" + guid;
                }
                var imgParam = "&imgWidth=" + width_default + "&imgHeight=" + height_default + "&imgPer=" + scaling_default + "&imgQua=" + quality_default;

                var dialogContent = ((settings.imageUpload) ? "<form id=\"form\" action=\"" + action + imgParam + "\" target=\"" + iframeName + "\" method=\"post\" enctype=\"multipart/form-data\" class=\"" + classPrefix + "form\">" : "<div class=\"" + classPrefix + "form\">") +

                    "<label>" + imageLang.alt + "</label>" +
                    "<input type=\"text\" value=\"" + selection + "\" data-alt />" +
                    "<br/>" +
                    "<label>" + imageLang.link + "</label>" +
                    "<input type=\"text\" value=\"http://\" data-link />" +
                    "<br/>" +
                    "<label>" + imageLang.width + "</label>" +
                    "<input  type=\"text\" value=\"" + width_default + "\" id=\"" + img_width + "\" autocomplete=\"off\" />" +
                    "<br/>" +
                    "<label>" + imageLang.height + "</label>" +
                    "<input  type=\"text\" value=\"" + height_default + "\"  id=\"" + img_height + "\" autocomplete=\"off\" />" +
                    "<br/>" +
                    "<label>" + imageLang.scaling + "</label>" +
                    "<input  type=\"text\" value=\"" + scaling_default + "\"  id=\"" + img_scaling + "\" autocomplete=\"off\" />" +
                    "<br/>" +
                    "<label>" + imageLang.quality + "</label>" +
                    "<input  type=\"text\" value=\"" + quality_default + "\"  id=\"" + img_quality + "\" autocomplete=\"off\" /><br>" +

                    ((settings.imageUpload) ? "<iframe name=\"" + iframeName + "\" id=\"" + iframeName + "\" guid=\"" + guid + "\"></iframe>" : "") +
                    "<label>" + imageLang.url + "</label>" +
                    "<input type=\"text\" data-url />" + (function () {
                        return (settings.imageUpload) ? "<div class=\"" + classPrefix + "file-input\">" +
                            "<input type=\"file\" name=\"" + classPrefix + "image-file\" accept=\"image/*\" />" +
                            "<input id=\"submit\" type=\"submit\" value=\"" + imageLang.uploadButton + "\" />" +
                            "</div>" : "";
                    })() +
                    "<br/>" +
                    ((settings.imageUpload) ? "</form>" : "</div>");

                //var imageFooterHTML = "<button class=\"" + classPrefix + "btn " + classPrefix + "image-manager-btn\" style=\"float:left;\">" + imageLang.managerButton + "</button>";


                dialog = this.createDialog({
                    title: imageLang.title,
                    width: (settings.imageUpload) ? 465 : 380,
                    height: 430,
                    name: dialogName,
                    content: dialogContent,
                    mask: settings.dialogShowMask,
                    drag: settings.dialogDraggable,
                    lockScreen: settings.dialogLockScreen,
                    maskStyle: {
                        opacity: settings.dialogMaskOpacity,
                        backgroundColor: settings.dialogMaskBgColor
                    },
                    buttons: {
                        enter: [lang.buttons.enter, function () {
                            var url = this.find("[data-url]").val();
                            var alt = this.find("[data-alt]").val();
                            var link = this.find("[data-link]").val();
                            dialog.find("#form").attr("action", action + imgParam);
                            if (url === "") {
                                alert(imageLang.imageURLEmpty);
                                return false;
                            }

                            var altAttr = (alt !== "") ? " \"" + alt + "\"" : "";

                            if (link === "" || link === "http://") {
                                cm.replaceSelection("![" + alt + "](" + url + altAttr + ")");
                            } else {
                                cm.replaceSelection("[![" + alt + "](" + url + altAttr + ")](" + link + altAttr + ")");
                            }

                            if (alt === "") {
                                cm.setCursor(cursor.line, cursor.ch + 2);
                            }

                            this.hide().lockScreen(false).hideMask();

                            return false;
                        }],

                        cancel: [lang.buttons.cancel, function () {
                            this.hide().lockScreen(false).hideMask();
                            dialog.find("#form").attr("action", action + imgParam);
                            return false;
                        }]
                    }
                });

                //document.getElementById("form").action = action + "&imgWidth=" + width_default + "&imgHeight=" + height_default + "&imgPer=" + scaling_default + "&imgQua=" + quality_default;


                dialog.attr("id", classPrefix + "image-dialog-" + guid);

                if (!settings.imageUpload) {
                    return;
                }

                var fileInput = dialog.find("[name=\"" + classPrefix + "image-file\"]");
                var img_width_val = document.getElementById(img_width).value ? document.getElementById(img_width).value : width_default;
                var img_height_val = document.getElementById(img_height).value ? document.getElementById(img_height).value : height_default;
                var img_scaling_val = document.getElementById(img_scaling).value ? document.getElementById(img_scaling).value : scaling_default;
                var img_quality_val = document.getElementById(img_quality).value ? document.getElementById(img_quality).value : quality_default;
                dialog.find("#" + img_width).bind("blur", function (e) {
                    img_width_val = resizeImg(img_width, width_default, action);
                    document.getElementById("form").action = action + "&imgWidth=" + img_width_val + "&imgHeight=" + img_height_val + "&imgPer=" + img_scaling_val + "&imgQua=" + img_quality_val;

                });

                dialog.find("#" + img_height).bind("blur", function () {
                    img_height_val = resizeImg(img_height, height_default, action);
                    document.getElementById("form").action = action + "&imgWidth=" + img_width_val + "&imgHeight=" + img_height_val + "&imgPer=" + img_scaling_val + "&imgQua=" + img_quality_val;

                });

                dialog.find("#" + img_scaling).bind("blur", function (e) {
                    img_scaling_val = resizeImg(img_scaling, scaling_default, action);
                    document.getElementById("form").action = action + "&imgWidth=" + img_width_val + "&imgHeight=" + img_height_val + "&imgPer=" + img_scaling_val + "&imgQua=" + img_quality_val;

                });
                dialog.find("#" + img_quality).bind("blur", function (e) {
                    img_quality_val = resizeImg(img_quality, quality_default, action);
                    document.getElementById("form").action = action + "&imgWidth=" + img_width_val + "&imgHeight=" + img_height_val + "&imgPer=" + img_scaling_val + "&imgQua=" + img_quality_val;


                });

                fileInput.bind("change", function () {
                    var fileName = fileInput.val();
                    var isImage = new RegExp("(\\.(" + settings.imageFormats.join("|") + "))$"); // /(\.(webp|jpg|jpeg|gif|bmp|png))$/

                    if (fileName === "") {
                        alert(imageLang.uploadFileEmpty);
                        return false;
                    }

                    if (!isImage.test(fileName)) {
                        alert(imageLang.formatNotAllowed + settings.imageFormats.join(", "));
                        return false;
                    }
                    loading(true);

                    var submitHandler = function () {

                        var uploadIframe = document.getElementById(iframeName);
                        uploadIframe.onload = function () {

                            loading(false);

                            var body = (uploadIframe.contentWindow ? uploadIframe.contentWindow : uploadIframe.contentDocument).document.body;
                            var json = (body.innerText) ? body.innerText : ((body.textContent) ? body.textContent : null);

                            json = (typeof JSON.parse !== "undefined") ? JSON.parse(json) : eval("(" + json + ")");

                            if (!settings.crossDomainUpload) {
                                if (json.success === 1) {
                                    dialog.find("[data-url]").val(json.url);
                                } else {
                                    alert(json.message);
                                }
                            }
                            /*  dialog.find("#" + img_width).val(width_default);
                              dialog.find("#" + img_height).val(height__default);
                              dialog.find("#" + img_scaling).val(scaling_default);
                              dialog.find("#" + img_quality).val(quality_default);
                              document.getElementById("form").action = action + "&imgWidth=" + 0 + "&imgHeight=" + 0 + "&imgPer=" + 1 + "&imgQua=" + 75;

                             */
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
            dialog.find("#" + img_width).val(width_default);
            dialog.find("#" + img_height).val(height_default);
            dialog.find("#" + img_scaling).val(scaling_default);
            dialog.find("#" + img_quality).val(quality_default);

            this.dialogShowMask(dialog);
            this.dialogLockScreen();
            dialog.show();

        };

    };

    // CommonJS/Node.js
    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        module.exports = factory;
    } else if (typeof define === "function")  // AMD/CMD/Sea.js
    {
        if (define.amd) { // for Require.js

            define(["editormd"], function (editormd) {
                factory(editormd);
            });

        } else { // for Sea.js
            define(function (require) {
                var editormd = require("../../editormd");
                factory(editormd);
            });
        }
    } else {
        factory(window.editormd);
    }

    function checkRate(input, defaultNum) {
        var re = /^[0-9]+.?[0-9]*$/;   //判断字符串是否为数字     //判断正整数 /^[1-9]+[0-9]*]*$/
        var number = document.getElementById(input).value;
        if (!re.test(number)) {
            if (number == "") {
                return false;
            }
            alert("请输入正确的数字");
            document.getElementById(id).value = defaultNum;
            return false;
        }
        return true;
    }

    function resizeImg(id, defaultNum, action) {
        if (checkRate(id))
            return document.getElementById(id).value;
        else {

            //document.getElementById(id).value = val;
            return defaultNum;
        }
    }

})();
