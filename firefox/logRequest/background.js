function logRequestData(details) {
  if(details.requestBody) {
    if (!('error' in details.requestBody)){
      if ('raw' in details.requestBody) {
        var postedString = '';
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
      console.log(details.method + ": " + details.url + "\r\n" + postedString);
    }
  } else if (details.method) {
    console.log(details.method + ": " + details.url);
  }
};

browser.webRequest.onBeforeRequest.addListener(
  logRequestData,
  {urls: ["<all_urls>"]},
  ["requestBody"]
);
