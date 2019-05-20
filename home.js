var refreshInterval = 5000;
var chosen = "";

function loadxml(xmlfile) {
  chosen = xmlfile;
  $.ajax({
    url: "getxml.php?xml=" + xmlfile,
    cache: true,
    complete: showxml
  });
};

function showxml(jqXHR)
{
  $("#xml_content").html(jqXHR.responseText);
}

//To refresh cache after every x milliseconds
window.setInterval(function(){
  for (var key in localCache.data) {
    if(key == ("getxml.php?xml=" + chosen)){
      var func = showxml;
    }
    else{
      var func = $.noop;
    }
    $.ajax({
      url: key,
      cache: true,
      complete : func
    });
  }
}, refreshInterval);

$(function() {
  var ms = $('#magicsuggest').magicSuggest({
    allowFreeEntries: false,
    maxSelection : 1,
    data: [{
      "id" : "note.xml",
      "name":'Note'
    }, {
      "id" : "cd_catalog.xml",
      "name" : 'CD Catalog'
    }, {
      "id" : "simple.xml",
      "name" : 'Breakfast menu'
    }, {
      "id" : "plant_catalog.xml",
      "name" : 'Plant catalog'
    }, {
      "id" : "book_catalog.xml",
      "name" : 'Book catalog'
    }],
    expandOnFocus : true,
  });
  $(ms).on('selectionchange', function(e,m){
    loadxml(this.getValue())
  });
});


// // Stylesheet not displaying background
// // Multiple stylesheets linked when clicked multiple times
// function linkstylesheet(stylesheet)
// {
//   var link = document.createElement( "link" );
//   link.href = stylesheet;
//   link.type = "text/css";
//   link.rel = "stylesheet";
//   link.media = "screen,print";
//   document.getElementsByTagName( "head" )[0].appendChild( link );
// }

// This is javascript that has been replaced by jquery version 
// function loadxml(xmlfile) {

//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
      
//       // var stylepath = xmlpath.substr( 0, xmlpath.lastIndexOf( "." ) ) + "_rule.css";
//       // linkstylesheet(stylepath);
//     }
//   };
//   xhttp.open("GET","getxml.php?xml=" + xmlfile , true);
//   xhttp.send();
// }