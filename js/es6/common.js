((w, d) => {
    'use strict';

    d.addEventListener('DOMContentLoaded', () => {
        generateSQL();
    });

    /**
     * Generate SQL
     *
     * @returns {void}
     */
    const generateSQL = () => {
        const URL = {
            'old': getById('oldUrl'),
            'new': getById('newUrl'),
        };
        const tablePrefix = getById('tablePrefix');

        const form = getById('form');
        const btnCopy = getById('copy');
        const output = getById('output');

        let html = '', oldString, newString, prefix;

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            html = '';
            oldString = URL.old.value;
            newString = URL.new.value;
            prefix = tablePrefix.value;

            html += `UPDATE ${prefix}options SET option_value = REPLACE(option_value, '${oldString}', '${newString}') WHERE option_name = 'home' OR option_name = 'siteurl';\n`;
            html += `UPDATE ${prefix}posts SET guid = REPLACE(guid, '${oldString}', '${newString}');\n`;
            html += `UPDATE ${prefix}posts SET post_content = REPLACE(post_content, '${oldString}', '${newString}');\n`;
            html += `UPDATE ${prefix}postmeta SET meta_value = REPLACE(meta_value, '${oldString}', '${newString}');\n`;
            html += `UPDATE ${prefix}usermeta SET meta_value = REPLACE(meta_value, '${oldString}', '${newString}');\n`;
            html += `UPDATE ${prefix}links SET link_url = REPLACE(link_url, '${oldString}', '${newString}');\n`;
            html += `UPDATE ${prefix}comments SET comment_content = REPLACE(comment_content, '${oldString}', '${newString}');`;

            output.innerHTML = html;

            if (output.value !== '') {
                btnCopy.classList.remove('d-none');
            }
        });

        btnCopy.addEventListener('click', () => {
            const text = output.value;

            if (text !== '') {
                copy(text);
            }
        });
    };

    /**
     * Copy string to the clipboard
     *
     * @param {string} string
     * @returns {void}
     */
    const copy = (string) => {
        const textarea = d.createElement('textarea');
        textarea.value = string;

        d.body.appendChild(textarea);

        textarea.select();
        d.execCommand('copy');

        d.body.removeChild(textarea);
    };

    /**
     * Get By ID
     *
     * @param {string} id
     * @returns {HTMLElement}
     */
    const getById = (id) => {
        return d.getElementById(id);
    };

})(window, document);
