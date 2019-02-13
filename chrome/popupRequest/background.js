chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if(details.requestBody) {
      if (!('error' in details.requestBody)){
        if ('raw' in details.requestBody) {
          postedString = '';
          for (var i = 0; i < details.requestBody.raw.length; i++) {
            postedString += decodeURIComponent(String.fromCharCode.apply(null, new Uint8Array(details.requestBody.raw[i].bytes)));
          }          
        } else if ('formData' in details.requestBody) {
          postedString = '{';
          for (var k in details.requestBody.formData) {
            postedString += '"' + k + '":"' + details.requestBody.formData[k] + '",';
          }
          postedString += '}';
        }
        alert(details.url + "\r\n" + postedString);
      } else {
        alert(details.url);
      }
    }
  },
  {urls: ["<all_urls>"]},
  ["requestBody"]
);
