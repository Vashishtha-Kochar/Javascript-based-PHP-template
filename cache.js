// We create a class whose object will store cache
class Cache {
    constructor() {
        this.data = {};
    }
    remove(url) {
        delete localCache.data[url];
    }
    exist(url) {
        return (localCache.data.hasOwnProperty(url) && localCache.data[url] !== null );
    }
    getData (url) {
        console.log('Getting from cache for url : ' + url);
        return localCache.data[url].data;
    }
    getTimestamp (url){
        return localCache.data[url].timestamp;
    }
    set(url, cachedData, callback) {
        console.log('Adding in cache for url : ' + url);
        localCache.remove(url);
        localCache.data[url] = {
            //timestamp is in seconds 
            timestamp : new Date().getTime() /1000,    
            data : cachedData
        };
        if ($.isFunction(callback)) callback(cachedData);
    }
};

var localCache = new Cache;
$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    
    if (originalOptions.cache) {
        var complete = originalOptions.complete || $.noop,
            url = originalOptions.url;
        //remove jQuery cache as we have our own localCache
        options.cache = false;
        options.beforeSend = function (request) {
            if (localCache.exist(url)) {
                request.setRequestHeader("If-Modified-Since", localCache.getTimestamp(url));
            }
            return true;
        };
        options.complete = function (jqXHR, textStatus) {
            if(textStatus == "success"){
                localCache.set(url, jqXHR, complete);
            }
            else if(textStatus == "notmodified"){
                console.log("The url has not been modified and cache is not updated : " + url);
                if(complete !=  $.noop ){
                    complete(localCache.getData(url));
                }
            }
            else{
                // The status returned can be "nocontent", "error", "timeout", "abort", or "parsererror"
                console.log("Error occurred. The response for the url : " + url + " is " + textStatus);
            }
        };
    }
});