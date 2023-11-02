let ismagnifierDisplayEnabled = false;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'togglemagnifierDisplay') {
    ismagnifierDisplayEnabled = !ismagnifierDisplayEnabled;
    sendResponse({isEnabled: ismagnifierDisplayEnabled});
  } else if (request.action === 'getmagnifierDisplayStatus') {
    sendResponse({isEnabled: ismagnifierDisplayEnabled});
  } else if (request.action === 'capture'){
    chrome.tabs.captureVisibleTab(null, {}, function(dataUrl) {
      sendResponse({ imgSrc: dataUrl });
    });
    return true;
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

});
