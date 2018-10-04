// Create
let db = firebase.firestore();
function userPost() {
  let message = document.getElementById('messageArea').value;
  if (message === '') {
    alert('Por favor ingresa un mensaje');
  } else {
    db.collection('userMessages').add({
      textMessage: message,
    })
      .then(function(docRef) {
        console.log('Texto escrito con ID: ', docRef.id);
        document.getElementById('messageArea').value = '';
      })
      .catch(function(error) {
        console.error('Error al agregar documento: ', error);
      });
  };
}

// Read
let container = document.getElementById('messageContainer');
db.collection('userMessages').onSnapshot((querySnapshot) => {
  container.innerHTML = '';
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().textMessage}`);
    container.innerHTML += `
      <div class="col-12" id="divContainer">
      <p>${doc.data().textMessage}</p>
      <i type="button" class="far fa-edit 2x" onclick="edit('${doc.id}','${doc.data().textMessage}')"> </i>
      <i type="button" class="fas fa-trash-alt 2x" onclick="deletePost('${doc.id}')"></i>
      </div>
      `;
  });
});

