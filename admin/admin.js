const firebaseConfig = {
    apiKey: "AIzaSyDbQjciXp0J_UGQBBcqmjlCAemYK-tsR6c",
    authDomain: "am-wallet.firebaseapp.com",
    databaseURL: "https://am-wallet-default-rtdb.firebaseio.com",
    projectId: "am-wallet",
    storageBucket: "am-wallet.appspot.com",
    messagingSenderId: "877693231070",
    appId: "1:877693231070:web:47c59ac6220ed09af9c74f"
    };

    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
    const result = document.getElementById("result");
    const filter = document.getElementById("filter");
    const listItems = [];
    var tableOfPrice = []
    var tableEmail = []
    firebase.auth().onAuthStateChanged(function(user) { 
    if(user){
        //var userId = user.uid;
    getData();

filter.addEventListener("input", (e) => filterData(e.target.value));

 function getData() {
  const userRef = database.ref(`/utilisateurs/`);
  userRef.once("value")
  .then((snapshot)=> {
    // Clear results
  result.innerHTML = "";
    snapshot.forEach((productSnapshot) => {  
        const productData = productSnapshot.val();
        var mxcompt = productData.ACCOUNTPRINCIPAL
        const li = document.createElement("li");
        li.addEventListener('click', function () {
        li.id = `${productData.userId}`
        var usermxid =  li.id 
        Swal.fire({
            title: "Modification",
            html:`Modier le compte de <strong style="color: blue;">${productData.username}</strong>`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Augmenter",
            denyButtonText: `Diminuer`,
            cancelButtonText: "Vider",
            allowOutsideClick: false,
            footer: `
            <button id="notificationidx" style="color: white; background-color: #FFB6C1; border: none; padding: 12px; cursor: pointer; border-radius: 5px;">Notification</button>&nbsp;&nbsp;
            <button id="footerButton" style="color: white; background-color: #FFB6C1; border: none; padding: 12px; cursor: pointer; border-radius: 5px;">Quitter</button> &nbsp;&nbsp;
            <button id="footerButtonMessages" style="color: white; background-color: #FFB6C1; border: none; padding: 12px; cursor: pointer; border-radius: 5px;">Messages</button>
            `
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
             // Swal.fire("Saved!", "", "success");                    
            $("#exampleModaladd").modal({
                show: true,
                backdrop: "static",
                keyboard: false,
            });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            //  Swal.fire("OK", "", "info");
            var sendunityforuserlup = document.getElementById('sendunityforuserlupdateO');
            sendunityforuserlup.click();
       
            }else if (result.isDenied) {
                // Swal.fire("Changes are not saved", "", "info");
                $("#exampleModalupdate").modal({
                    show: true,
                    backdrop: "static",
                    keyboard: false,
                });
              }
          });  
          
          var footerButtonMessages = document.getElementById("footerButtonMessages")
footerButtonMessages.addEventListener('click', updateAllUsers)
function updateAllUsers() {
  Swal.fire({
    title: "The message",
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: "Send",
    showLoaderOnConfirm: true,
    allowOutsideClick: false,
    confirmButtonColor: '#3085d6',
    preConfirm: (messages) =>{
    if (messages){
  // Récupérer toutes les données des utilisateurs
  database.ref('utilisateurs').once('value', (snapshot) => {
    const updates = {}; // Initialise un objet pour stocker les mises à jour pour chaque utilisateur
    snapshot.forEach((childSnapshot) => {
      const userId = childSnapshot.key;
      updates[`utilisateurs/${userId}/MESSAGESAMWALLET`] = messages; // Ajouter une mise à jour pour le champ 'name' de chaque utilisateur
    });
    // Appliquer toutes les mises à jour en une seule opération
    database.ref().update(updates)
      .then(() => {
        alert('Mises à jour des utilisateurs effectuées avec succès');
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour des utilisateurs:', error);
        alert('Erreur lors de la mise à jour des utilisateurs:');
      });
  });
      }else{
        Swal.showValidationMessage("Please enter something."); 
      }
    }
  });

}

          // Sélectionnez le bouton du pied de page
          const footerButton = document.getElementById('footerButton');        
          // Ajoutez un gestionnaire d'événements clic pour le bouton du pied de page  
          footerButton.addEventListener('click', function() {
            // Fermez la boîte de dialogue
            Swal.close();
          });
          // Sélectionnez le bouton du pied de page
          const notificationidx = document.getElementById('notificationidx');
          const sendnotificationidx = document.getElementById('sendnotificationid');
          // Ajoutez un gestionnaire d'événements clic pour le bouton du pied de page 

          // start function to send notification 
          notificationidx.addEventListener('click', function() {
            Swal.close();
            $("#Modalnotificationid").modal({
              show: true,
              backdrop: "static",
              keyboard: false,
          });
          });
          sendnotificationidx.addEventListener('click', function() {
            const notificationid = document.getElementById('notificationid').value;
            const userRefx = database.ref(`/utilisateurs/${usermxid}`);
            const dateActuelle = new Date();
            // Obtenez les composantes de la date et de l'heure  
            const jour = dateActuelle.getDate();
            const mois = dateActuelle.getMonth() + 1; // Les mois commencent à 0, donc ajoutez 1
            const annee = dateActuelle.getFullYear();
            const heures = dateActuelle.getHours();
            const minutes = dateActuelle.getMinutes();
            // Formatez la date et l'heure
            const dateFormatee = `${jour}/${mois}/${annee} ${heures}h:${minutes}min`;
            //console.log(dateFormatee);
        // Function to add a gain with status to the user's gains array
        function addGainToUser(notificationid, status, time) {
            const newNotification = { notificationid: notificationid, status: status, time:time};
            userRefx.child("MESSAGES").push(newNotification);
        }              
        // Usage
        addGainToUser(notificationid, true, dateFormatee); // Add a gain of 100 with "won" status
        Swal.fire({
          icon: 'success',
          title: "Félicitations !",
          text: "La notification  a été envoyé avec succès !",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed){
              location.reload();
          }
       })
        });
        // end function to send notification 

        const userRefx = database.ref(`/utilisateurs/${usermxid}`);
        userRefx.once("value")
        .then((snapshot)=> {  
            snapshot.forEach((roductSnapshot) => {
                const productData = roductSnapshot.val();
                document.getElementById('sendunityforuseradd').addEventListener('click', function(){
                    var variableunity = document.getElementById('recipientadd').value;
                    var myCompta = parseFloat(mxcompt);
                    var addunityForuser = parseFloat(variableunity)
                    var sommesUnity = myCompta + addunityForuser
                    const newData = {
                        ACCOUNTPRINCIPAL : sommesUnity
                    };
                    const userRefx = database.ref(`/utilisateurs/${usermxid}`);
                    userRefx.update(newData, (error) => {
                      if (error){
                        alert("les données ne sont pas mise à jour " + error);
                      }else{
                        window.location.reload();
                        
                      }
                     })
                })

                document.getElementById('sendunityforuserlupdate').addEventListener('click', function(){
                    var variableunity = document.getElementById('recipientupdate').value;
                    var myCompta = parseFloat(mxcompt);
                    var addunityForuser = parseFloat(variableunity)
                    var sommesUnity = myCompta - addunityForuser
                    const newData = {
                        ACCOUNTPRINCIPAL : sommesUnity
                    };
                    const userRefx = database.ref(`/utilisateurs/${usermxid}`);
                    userRefx.update(newData, (error) => {
                      if (error){
                        alert("les données ne sont pas mise à jour " + error);
                      }else{
                        window.location.reload();
                        
                      }
                     })
                })

                document.getElementById('sendunityforuserlupdateO').addEventListener('click', function(){
                    const newData = {
                        ACCOUNTPRINCIPAL : 0
                    };
                    const userRefx = database.ref(`/utilisateurs/${usermxid}`);
                    userRefx.update(newData, (error) => {
                      if (error){
                        alert("les données ne sont pas mise à jour " + error);
                      }else{
                        window.location.reload();
                        
                      }
                     })
                })

            })
        }).catch(()=>{
            alert("il y une erreur")
        })
        })
        listItems.push(li);
        li.style.cursor = "pointer"
        li.innerHTML = `
            <img src="../img/user_logo.png" alt="">
            <div class="user-info">
                <h5 style="width: 34vh !important; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${productData.email}</h5>
                <p>${productData.username}, &nbsp; &nbsp;&nbsp; ${productData.ACCOUNTPRINCIPAL}$</p>
            </div>
            `;
        result.appendChild(li);
    })  
    })  
   
}


function filterData(searchTerm) {
  listItems.forEach((item) => {
    if (item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
}
}else{
    alert('non non')
} 

})

function validerSaisie(input) {
    const valeurSaisie = input.value;
    const regexLettresAvecEspaces = /^\d+$/;

    if (!regexLettresAvecEspaces.test(valeurSaisie)) {
      //alert("ne fait pas ça")
      // Effacez la saisie incorrecte
      input.value = input.value.replace(/\D/g, '');
     
    } else {
    }
  }
 