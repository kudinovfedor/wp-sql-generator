<?php
error_reporting(E_ALL);

/**
 * Sanitize
 *
 * @param string $value
 * @return string
 */
function sanitize($value) {
    return trim(strip_tags($value));
}

/**
 * Validate URL
 *
 * @param string $url
 * @return mixed
 */
function validateUrl($url) {
    return filter_var($url, FILTER_VALIDATE_URL);
}

$oldUrl = !empty($_GET['old_url']) && validateUrl($_GET['old_url']) ? sanitize($_GET['old_url']) : 'http://joompress.biz';
$newUrl = !empty($_GET['new_url']) && validateUrl($_GET['new_url']) ? sanitize($_GET['new_url']) : 'https://joompress.biz';
$dbPrefix = !empty($_GET['db_prefix']) && strlen($_GET['db_prefix']) >= 3 ? sanitize($_GET['db_prefix']) : 'wp_';

$queryData = [
    'old_url' => $oldUrl,
    'new_url' => $newUrl,
    'db_prefix' => $dbPrefix,
];

$query = http_build_query($queryData);

$host = $_SERVER['HTTP_HOST'];
$host = $host === 'joompress.biz' ? "$host/wp-sql-generator" : $host;

$siteUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$host/";
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>SQL Generator to Change Website Domain</title>
    <meta name="description" content="This tool generates ready to use SQL queries which you need when transfering WordPress-based website to a new domain location.">
    <link rel="stylesheet" href="./css/bootstrap.min.css">
    <style>html,body{height:100%}body{min-width:320px}textarea.form-control{font-size:14px}</style>
</head>
<body>
<div class="container py-1 py-sm-5 h-100 d-flex flex-column">
    <div class="d-flex my-auto flex-column">
        <div class="text-center mb-3 mb-sm-5">
            <h1 class="font-weight-bold">WordPress SQL Generator</h1>
            <p class="mb-0">You can use the GET parameters to fill out the form fields. For example: <br><small><?= $siteUrl . '?' . $query ?></small></p>
        </div>
        <div class="row">
            <form id="form" class="col-12 col-md-10 col-lg-9 mx-auto">
                <div class="row">
                    <div class="col-sm-12 col-md-6">
                        <div class="form-group">
                            <label for="oldUrl">Old site URL</label>
                            <input type="url" name="oldUrl" id="oldUrl" class="form-control" placeholder="Enter old site URL" value="<?= $oldUrl ?>" minlength="12" required>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6">
                        <div class="form-group">
                            <label for="newUrl">New site URL</label>
                            <input type="url" name="newUrl" id="newUrl" class="form-control" placeholder="Enter new site URL" value="<?= $newUrl ?>" minlength="12" required>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6 col-md-4">
                        <div class="form-group">
                            <label for="tablePrefix">Table Prefix</label>
                            <input type="text" name="dbPrefix" id="tablePrefix" class="form-control" placeholder="Enter table prefix" value="<?= $dbPrefix ?>" minlength="3" required>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <button id="generate" type="submit" class="btn btn-secondary">Generate</button>
                            <button id="copy" type="button" class="btn btn-success d-none">Copy</button>
                            <a id="download" href="#" class="btn btn-primary d-none">Download</a>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="output"><b>Generated SQL:</b></label>
                    <textarea name="output" id="output" rows="11" class="form-control text-nowrap"></textarea>
                </div>
            </form>
        </div>
    </div>

</div>
<script src="./js/common.min.js"></script>
</body>
</html>
