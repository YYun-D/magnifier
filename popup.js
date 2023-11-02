document.addEventListener('DOMContentLoaded', function() {
  var toggleButton = document.getElementById('magnifieronoff');

  // 초기 on/off 상태 확인
  chrome.runtime.sendMessage({action: 'getmagnifierDisplayStatus'}, function(response) {
    var ismagnifierDisplayEnabled = response.isEnabled;
    toggleButton.checked = ismagnifierDisplayEnabled ? true : false;
  });

  // on/off 상태 변경
  toggleButton.addEventListener('click', function() {
    chrome.runtime.sendMessage({action: 'togglemagnifierDisplay'}, function(response) {
      var ismagnifierDisplayEnabled = response.isEnabled;
      toggleButton.checked = ismagnifierDisplayEnabled ? true : false;
      if (ismagnifierDisplayEnabled) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            func: enablemagnifierDisplay
          });
        });
      } else {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            func: disablemagnifierDisplay
          });
        });
      }
    });
  });

  // magnifierDisplay 활성화
  function enablemagnifierDisplay() {
    var magnifierElement = document.getElementById('magnifier');
    if (magnifierElement) {
      magnifierElement.style.display = 'block';
    }
    chrome.runtime.sendMessage({action: "capture"}, function(response) {
      magnifierElement.style.backgroundImage = `url("${response.imgSrc}")`;
    });
    document.body.style.overflow = 'hidden';
  }

  // magnifierDisplay 비활성화
  function disablemagnifierDisplay() {
    var magnifierElement = document.getElementById('magnifier');
    if (magnifierElement) {
      magnifierElement.style.display = 'none';
    }
    document.body.style.overflow = 'auto';
  }
});