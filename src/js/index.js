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
      <i type="button" class="far fa-edit icon" onclick="edit('${doc.id}','${doc.data().textMessage}')"> </i>
      <i type="button" class="fas fa-trash-alt icon" onclick="deletePost('${doc.id}')"></i>
      </div>
      `;
  });
});

// Delete
function deletePost(id) {
  let removeMessage = confirm('¿Quiere eliminar la publicación?');
  if (removeMessage === true) {
    db.collection('userMessages').doc(id).delete().then(function() {
      console.log('Document successfully deleted!');
    }).catch(function(error) {
      console.error('Error removing document: ', error);
    });
  }
}

// Update
function edit(id, message) {
  document.getElementById('messageArea').value = message;
  let btnPost = document.getElementById('btnPost');
  btnPost.innerHTML = 'Guardar cambios';

  btnPost.onclick = function() {
    let editPost = db.collection('userMessages').doc(id);

    let message = document.getElementById('messageArea').value;

    return editPost.update(
      {
        textMessage: message
      })
      .then(function() {
        console.log('Document successfully updated!');
        btnPost.innerHTML = 'Publicar';
        btnPost.onclick = userPost;
        document.getElementById('messageArea').value = '';
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  };
} 