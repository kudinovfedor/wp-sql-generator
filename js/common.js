"use strict";

(function(w, d) {
    "use strict";
    d.addEventListener("DOMContentLoaded", function() {
        generateSQL();
    });
    var generateSQL = function generateSQL() {
        var URL = {
            old: getById("oldUrl"),
            new: getById("newUrl")
        };
        var tablePrefix = getById("tablePrefix");
        var form = getById("form");
        var btnCopy = getById("copy");
        var output = getById("output");
        var html = "", oldString, newString, prefix;
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            html = "";
            oldString = URL.old.value;
            newString = URL.new.value;
            prefix = tablePrefix.value;
            html += "UPDATE ".concat(prefix, "options SET option_value = REPLACE(option_value, '").concat(oldString, "', '").concat(newString, "') WHERE option_name = 'home' OR option_name = 'siteurl';\n");
            html += "UPDATE ".concat(prefix, "posts SET guid = REPLACE(guid, '").concat(oldString, "', '").concat(newString, "');\n");
            html += "UPDATE ".concat(prefix, "posts SET post_content = REPLACE(post_content, '").concat(oldString, "', '").concat(newString, "');\n");
            html += "UPDATE ".concat(prefix, "postmeta SET meta_value = REPLACE(meta_value, '").concat(oldString, "', '").concat(newString, "');");
            output.innerHTML = html;
            if (output.value !== "") {
                btnCopy.classList.remove("d-none");
            }
        });
        btnCopy.addEventListener("click", function() {
            var text = output.value;
            if (text !== "") {
                copy(text);
            }
        });
    };
    var copy = function copy(string) {
        var textarea = d.createElement("textarea");
        textarea.value = string;
        d.body.appendChild(textarea);
        textarea.select();
        d.execCommand("copy");
        d.body.removeChild(textarea);
    };
    var getById = function getById(id) {
        return d.getElementById(id);
    };
})(window, document);