var magicSuggestConfigurations = {
    allowFreeEntries: false,
    placeholder : "Which XML would you like to display ?",
    maxSelection : 1,
    valueField : "file",
    expandOnFocus : true,
    resultAsString : true,
    renderer : function(data){
        return '<div style="padding: 5px; overflow:hidden;">' +
                    '<div style="float: left; margin-left: 5px">' +
                        '<div style="font-weight: bold; color: #333; font-size: 20px; line-height: 11px">' + data.name + '</div>' +
                        '<div style="color: #999; font-size: 16px">' + data.file + '</div>' +
                    '</div>' +
                '</div>'+
                '<div style="clear:both;"></div>';
    }
}