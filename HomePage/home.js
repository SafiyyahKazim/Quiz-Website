// Get the button ID in index.html and make it clickable.
// When it's close on, it will run the function.
document.getElementById('button').addEventListener('click',
 function() {
    document.querySelector('.memberBox').style.display = 'flex';
 });

 // function for the close button on the modal.
 document.querySelector('.memberClose').addEventListener('click', 
 function() {
    document.querySelector('.memberBox').style.display = 'none';
 });
