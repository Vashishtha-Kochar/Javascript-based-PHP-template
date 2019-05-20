<?php

$xml = $_GET["xml"];
$filename = "XML_samples/" . $xml;

if (file_exists($filename)) {
    if(isset($_SERVER['HTTP_IF_MODIFIED_SINCE'])){
        if(filemtime($filename) < $_SERVER['HTTP_IF_MODIFIED_SINCE']){
            http_response_code(304);
            return ;
        }
    }
    $myFile = fopen($filename, "r") or die("Unable to open file!");
    echo fread($myFile,filesize($filename));
    fclose($myFile);
}
else{
    echo "$filename not found.";
}

?>