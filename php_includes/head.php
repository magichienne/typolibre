<!doctype html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">

    <!-- favicon -->
    <link rel="icon" href="favicon.png" type="image/png">

    <link rel="stylesheet" type="text/css" href="css/reset.css">
    <link rel="stylesheet" type="text/css" href="fonts/fonts.css">
    <link id="theme-stylesheet" rel="stylesheet" type="text/css" href="css/stylesheet.css">
    <?php
    // PAGE CSS SPECIFIQUE
    if (isset($pageCSS)) {
        echo "<link rel='stylesheet' href='$pageCSS'>";
    }
    ?>

    <?php
    // PAGE SCRIPT SPECIFIQUE
    if (isset($pageScript)) {
        echo "<script src='$pageScript'></script>";
    }
    ?>

    <title><?php echo isset($pageTitle) ? $pageTitle : 'typolibres'; ?></title>

</head>