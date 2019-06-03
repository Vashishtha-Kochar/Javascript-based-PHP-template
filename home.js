const refreshInterval = 5000;
var chosen = "";
const magicSuggestConfigurationFile = "magic_suggest_template.xml";
const magicSuggestID = '#magicsuggest';
const outputDivID = "#xml_content";
const xmlRequestUrl = "getxml.php?xml=";

$(function() {
  // Request to get the file and display magicSuggest on success
  
  $.ajax({
    type : "GET",
    url: magicSuggestConfigurationFile,
    dataType: "xml",
    cache: false,
    success: showmagicSuggest
  }); 
});

function showmagicSuggest(responsexml){

  // Attach the required javascript for the configuration settings
  var maggicsuggestconfigurationjs = $.trim($(responsexml).find('setting').text());
  
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.onload = function() {

    // Attach data to the settings
    var dataxml = $(responsexml).find('data');
    var dataArray = [];
    dataxml.find('element').each(function(key,value){
      dataArray.push(xml_to_JSON(value));
    });
    magicSuggestConfigurations.data = dataArray;

    //Load the magicSuggest
    var ms = $(magicSuggestID).magicSuggest(magicSuggestConfigurations);
    $(ms).on('selectionchange', function(e,m){
      if ($.isEmptyObject(this.getValue()))
      {
        console.log("Selection cleared");
      }
      else
      {
        loadxml(this.getValue());
      }
    });
  }
  script.src = maggicsuggestconfigurationjs;
  head.appendChild(script);
}

function xml_to_JSON(xml){
  var dataObj = {}
  $(xml).children().each(function(index){
    
    if(this.childElementCount == 0){
      dataObj[this.tagName] = this.innerHTML;
    }
    else{
      dataObj[this.tagName] = xml_to_JSON($( xml ).children()[index]);
    }
  })
  return dataObj;
}

// Make a request for the file
function loadxml(xmlfile) {
  chosen = xmlfile;
  $.ajax({
    url: xmlRequestUrl + xmlfile,
    cache: true,
    complete: showxml
  });
};

function showxml(jqXHR)
{
  $(outputDivID).html(jqXHR.responseText);
}

//To refresh cache after every x milliseconds
window.setInterval(function(){
  if(chosen != "")  {loadxml(chosen)}
},
refreshInterval);