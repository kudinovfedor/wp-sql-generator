"use strict";

(function(w, d) {
    'use strict';
    d.addEventListener('DOMContentLoaded', function() {
        generateSQL();
    });
    var generateSQL = function generateSQL() {
        var URL = {
            old: getById('oldUrl'),
            new: getById('newUrl')
        };
        var tablePrefix = getById('tablePrefix');
        var form = getById('form');
        var btnCopy = getById('copy');
        var btnDownload = getById('download');
        var output = getById('output');
        var html = '', oldString, newString, prefix, file, text;
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            html = '';
            oldString = URL.old.value;
            newString = URL["new"].value;
            prefix = tablePrefix.value;
            html += "UPDATE `".concat(prefix, "posts` SET `guid` = REPLACE(`guid`, '").concat(oldString, "', '").concat(newString, "');\n");
            html += "UPDATE `".concat(prefix, "posts` SET `post_content` = REPLACE(`post_content`, '").concat(oldString, "', '").concat(newString, "');\n");
            html += "UPDATE `".concat(prefix, "posts` SET `post_excerpt` = REPLACE(`post_excerpt`, '").concat(oldString, "', '").concat(newString, "');\n");
            html += "UPDATE `".concat(prefix, "links` SET `link_url` = REPLACE(`link_url`, '").concat(oldString, "', '").concat(newString, "');\n");
            html += "UPDATE `".concat(prefix, "links` SET `link_image` = REPLACE(`link_image`, '").concat(oldString, "', '").concat(newString, "');\n");
            html += "UPDATE `".concat(prefix, "postmeta` SET `meta_value` = REPLACE(`meta_value`, '").concat(oldString, "', '").concat(newString, "');\n");
            html += "UPDATE `".concat(prefix, "usermeta` SET `meta_value` = REPLACE(`meta_value`, '").concat(oldString, "', '").concat(newString, "');\n");
            html += "UPDATE `".concat(prefix, "comments` SET `comment_content` = REPLACE(`comment_content`, '").concat(oldString, "', '").concat(newString, "');\n");
            html += "UPDATE `".concat(prefix, "comments` SET `comment_author_url` = REPLACE(`comment_author_url`, '").concat(oldString, "', '").concat(newString, "');\n");
            html += "UPDATE `".concat(prefix, "options` SET `option_value` = REPLACE(`option_value`, '").concat(oldString, "', '").concat(newString, "') WHERE `option_name` = 'home' OR `option_name` = 'siteurl';");
            output.innerHTML = html;
            text = output.value;
            if (text !== '') {
                btnCopy.classList.remove('d-none');
                if (typeof Blob === 'function') {
                    btnDownload.classList.remove('d-none');
                    file = createFile(text);
                    downloadFile(btnDownload, file);
                }
            }
        });
        btnCopy.addEventListener('click', function() {
            var text = output.value;
            if (text !== '') {
                copy(text);
            }
        });
    };
    var createFile = function createFile(data) {
        var fileName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'update.sql';
        var mimeType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'application/sql';
        var file = new Blob([ data ], {
            type: mimeType
        });
        return {
            url: URL.createObjectURL(file),
            name: fileName
        };
    };
    var downloadFile = function downloadFile(element, file) {
        var link = element;
        if (typeof element === 'string') {
            link = getById(link);
        }
        link.href = file.url;
        link.download = file.name;
    };
    var copy = function copy(string) {
        var textarea = d.createElement('textarea');
        textarea.value = string;
        d.body.appendChild(textarea);
        textarea.select();
        d.execCommand('copy');
        d.body.removeChild(textarea);
    };
    var getById = function getById(id) {
        return d.getElementById(id);
    };
})(window, document);