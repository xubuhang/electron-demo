document.getElementById('close-btn').addEventListener('click', () => {  
  window.electronAPI.actionbarMessage( 'close');  
});  

document.getElementById('minimize-btn').addEventListener('click', () => {  
  window.electronAPI.actionbarMessage( 'minimize');  
});  

document.getElementById('maximize-btn').addEventListener('click', () => {  
  window.electronAPI.actionbarMessage( 'maximize');  
});  