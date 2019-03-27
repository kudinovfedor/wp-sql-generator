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
        const btnDownload = getById('download');
        const output = getById('output');

        let html = '', oldString, newString, prefix, file, text;

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            html = '';
            oldString = URL.old.value;
            newString = URL.new.value;
            prefix = tablePrefix.value;

            html += `UPDATE \`${prefix}posts\` SET \`guid\` = REPLACE(\`guid\`, '${oldString}', '${newString}');\n`;
            html += `UPDATE \`${prefix}posts\` SET \`post_content\` = REPLACE(\`post_content\`, '${oldString}', '${newString}');\n`;
            html += `UPDATE \`${prefix}posts\` SET \`post_excerpt\` = REPLACE(\`post_excerpt\`, '${oldString}', '${newString}');\n`;
            html += `UPDATE \`${prefix}links\` SET \`link_url\` = REPLACE(\`link_url\`, '${oldString}', '${newString}');\n`;
            html += `UPDATE \`${prefix}links\` SET \`link_image\` = REPLACE(\`link_image\`, '${oldString}', '${newString}');\n`;
            html += `UPDATE \`${prefix}postmeta\` SET \`meta_value\` = REPLACE(\`meta_value\`, '${oldString}', '${newString}');\n`;
            html += `UPDATE \`${prefix}usermeta\` SET \`meta_value\` = REPLACE(\`meta_value\`, '${oldString}', '${newString}');\n`;
            html += `UPDATE \`${prefix}comments\` SET \`comment_content\` = REPLACE(\`comment_content\`, '${oldString}', '${newString}');\n`;
            html += `UPDATE \`${prefix}comments\` SET \`comment_author_url\` = REPLACE(\`comment_author_url\`, '${oldString}', '${newString}');\n`;
            html += `UPDATE \`${prefix}options\` SET \`option_value\` = REPLACE(\`option_value\`, '${oldString}', '${newString}') WHERE \`option_name\` = 'home' OR \`option_name\` = 'siteurl';`;

            output.innerHTML = html;

            text = output.value;

            if (text !== '') {
                btnCopy.classList.remove('d-none');
                btnDownload.classList.remove('d-none');

                file = createFile(text);

                downloadFile(btnDownload, file)
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
     * Create File
     *
     * @param {string} data - File content
     * @param {string} [fileName] - File name with extension
     * @param {string} [mimeType] - Multipurpose Internet Mail Extensions (MIME) type
     * @returns {{name: string, url: string}}
     */
    const createFile = (data, fileName = 'update.sql', mimeType = 'application/sql') => {
        const file = new Blob([data], {type: mimeType});

        return {
            url: URL.createObjectURL(file),
            name: fileName,
        };
    };

    /**
     * Download File
     *
     * @param {string|Element} element - Selected element
     * @param {Object} file - Object with keys (url, name)
     *
     * @returns {void}
     */
    const downloadFile = (element, file) => {
        let link = element;

        if (typeof element === 'string') {
            link = getById(link);
        }

        link.href = file.url;
        link.download = file.name;
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
