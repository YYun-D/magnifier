var magnifierElement = document.createElement('div');
magnifierElement.style.position = 'fixed';
magnifierElement.style.border = '1px solid black';
magnifierElement.style.borderRadius = '50%';
magnifierElement.style.width = '250px';
magnifierElement.style.height = '250px';
magnifierElement.style.backgroundColor = 'rgba(255, 255, 255, 0)';
magnifierElement.style.display = 'none';
magnifierElement.style.zIndex = '10001';
magnifierElement.id = 'magnifier';

document.body.appendChild(magnifierElement);

const magnifier = document.getElementById('magnifier');

magnifierElement.style.backgroundSize = '1000%';

document.addEventListener('mousemove', (event) => {
  magnifier.style.left = event.clientX - 125 + 'px';
  magnifier.style.top = event.clientY - 125 + 'px';

  magnifier.style.backgroundPosition = `-${event.clientX}px -${event.clientY}px`; 
});