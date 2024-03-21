window.onload = function(){
if (/Mobi|Android/i.test(navigator.userAgent)) { 
  // Code pour appareil mobile
  //document.body.style.fontSize = "16px"; // Modifier la taille de la police pour appareils mobiles
 var wallet =  document.getElementById('wallet-containerId'); 
 var HistoryId =  document.getElementById('historyId');
 var ImgNodata =  document.getElementById('imgNodata');
 var PhistoryId =  document.getElementById('phistoryId');
 var IdTogetwallet = document.getElementById('idTogetwallet');
 wallet.style.height = "100%"
 wallet.style.width = "100%"
 wallet.style.setProperty("font-size", "75px", "important");
 var ComeBackId =  document.getElementById('comeBackId');
 ComeBackId.style.fontSize = "2vh"
 IdTogetwallet.style.fontSize = "2vh"
 //wallet.style.marginTop = "1%"
 //HistoryId.style.marginTop = "46%"
 ImgNodata.style.height = "30vh"
 PhistoryId.style.height = "55vh"
  //document.getElementById('contentSignup').style.marginTop = "5vh"
  } else {
      // Code pour ordinateur de bureau
      var ComeBackId =  document.getElementById('comeBackId');
      var IdTogetwallet = document.getElementById('idTogetwallet');
      ComeBackId.style.fontSize = "2vh"
      IdTogetwallet.style.fontSize = "2vh"
  }
  //star function to comBack
  document.getElementById('comeBackId').addEventListener('click', function(){
    window.location.href = "../index.html"
  })
  // end function tocomeBack
  // Configuration Firebase
// Créez une nouvelle instance de l'objet Date
const firebaseConfig = {
  apiKey: "AIzaSyDbQjciXp0J_UGQBBcqmjlCAemYK-tsR6c",
  authDomain: "am-wallet.firebaseapp.com",
  databaseURL: "https://am-wallet-default-rtdb.firebaseio.com",
  projectId: "am-wallet",
  storageBucket: "am-wallet.appspot.com",
  messagingSenderId: "877693231070",
  appId: "1:877693231070:web:47c59ac6220ed09af9c74f"
  };
  const UserConnectuser = localStorage.getItem("unserconnect");
  // Initialisation de Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Récupérer un utilisateur par son ID
  function getUserById(userId) {
    const database = firebase.database();
    const userRef = database.ref(`/utilisateurs/${userId}`);
  
    userRef.once("value")
      .then((snapshot) => {
        const user = snapshot.val();
        if (user) {
          //console.log("Utilisateur récupéré :", user);
          document.getElementById('preloader').style.display = "none"
          var UserCOMMISSON = user.ACCOUNTPRINCIPALX
         
          var emailUser = user.email
          var fullname = user.fullname

          var Amount = document.getElementById('amount');
          var ImgNodata = document.getElementById('imgNodata');
          var PhistoryId = document.getElementById('phistoryId');
          var IdTogetwallet = document.getElementById('idTogetwallet');
          Amount.innerHTML = `${UserCOMMISSON} $`
          if(UserCOMMISSON >= 9){
            IdTogetwallet.disabled = false
          }else{
            IdTogetwallet.disabled =  true
          }
          //function to creat the liste p
          // Sélectionnez la balise p
          const userListP = document.getElementById("phistoryId");
          const userListUl = document.createElement("span");
          //console.log("Utilisateur récupéré :", user);
          var UserGETALLWALLET = user.GETALLWALLET
          //console.log("Utilisateur récupéré :", UserGETALLWALLET);
        // Convertir l'objet d'utilisateurs en un tableau d'objets
        const userArray = Object.entries(UserGETALLWALLET).map(([key, value]) => ({ id: key, ...value }));
        //function to controle the paiement
        if(userArray.length == 0){
            ImgNodata.style.display = "block"
            PhistoryId.style.display = "none"
          }else{
            ImgNodata.style.display = "none"
            PhistoryId.style.display = "block"
          }
        // Trier le tableau en fonction de la valeur du champ "comptValidé"
        userArray.sort((a, b) => {
        // Mettre les comptes validés en bas
        if (a.status && !b.status) {
            return -1;
        }
        // Mettre les comptes non validés en haut
        if (!a.status && b.status) {
            return 1;
        }
        // Garder l'ordre actuel si les deux utilisateurs ont la même valeur pour "comptValidé"
        return 0;
        });
        // Parcourez les données des utilisateurs et ajoutez-les à la liste
        for (const userId in userArray) {
            const usergal = userArray[userId];
            const userLi = document.createElement("p");
            userLi.innerHTML = `${usergal.status ? `<p class="txn-list" style="cursor: pointer !important; border-radius: 5px !important;">
            <strong id="IDTRANSLATEWALLETU">En cours</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>${usergal.time} 
            </strong><span class="debit-amount" style="color: green !important;">${usergal.gain} $</span></p>`: 
            `<p class="txn-list" style="cursor: pointer !important; border-radius: 5px !important;">
            <strong id="IDTRANSLATEWALLETX">Payé</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>${usergal.time} 
            </strong><span class="debit-amount" style="color:#FFB6C1 !important;">${usergal.gain} $</span></p>`} `;
            
            userListUl.appendChild(userLi);
           
        }
        // Ajoutez la liste à la balise p
        userListP.appendChild(userListUl);

            //function to get my wallet
            var IdTogetwallet = document.getElementById('idTogetwallet');
            IdTogetwallet.addEventListener('click', function(){

                document.getElementById('preloader').style.display = "block"
                const UserConnectuserId = localStorage.getItem("unserconnect");
                const userRef = database.ref(`/utilisateurs/${UserConnectuserId}`);
                const newData = {
                    ACCOUNTPRINCIPALX: 0
                  };
                  userRef.update(newData, (error) => {
                    if (error) {
                        document.getElementById('preloader').style.display = "none"
                        Swal.fire({
                            icon: 'error',
                            title: "Désolé",
                            text: "Votre transfert a échoué. Veuillez réessayer plus tard.", 
                            allowOutsideClick: false,
                          }).then((result) => {
                            if (result.isConfirmed){
                                location.reload();
                            }
                         })
                      //console.error("La mise à jour a échoué : " + error);
                    } else {
                    document.getElementById('preloader').style.display = "none"
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
                function addGainToUser(gain, status, time) {
                    const newGain = { gain: gain, status: status, time:time};
                    userRef.child("GETALLWALLET").push(newGain);
                }              
                // Usage
                addGainToUser(UserCOMMISSON, true, dateFormatee); // Add a gain of 100 with "won" status
                //console.log("La mise à jour a réussi !");
                Swal.fire({
                    icon: 'success',
                    title: "Félicitations !",
                    text: "Votre transfert a été effectué avec succès !",
                    allowOutsideClick: false,
                  }).then((result) => {
                    if (result.isConfirmed){
                        location.reload();
                    }
                 })
                 // statr envoi de mail de validation
                 const apiKey = "34F593452254BAB8CACDA4A39FC9C44BFC0D3E63B8842CD369FF37BBE4AC5017DA7917B6E03C3C8EB379F906C80E9DED";
                 const apiUrl = "https://api.elasticemail.com/v2/email/send";
                 
                 // Définir les paramètres de l'e-mail
                 const emailParams = {
                 apiKey: apiKey,
                 subject: "Gain de point",
                 from: emailUser,
                 fromName: "illicolove",
                 to: "validation@illicolove.com",
                 bodyHtml: `
                 <table cellpadding="10" cellspacing="0" style="background-color: #f1f1f1; padding: 20px;">
                 <tr>
                     <td>
                     <h1 style="color: #333;">Salut, illicolove !</h1>
                     <div style="text-align: center;">
                         <img src="https://illicolove.com/assets/img/illicolove-.png" style="max-width: 100%; height: auto; display: inline-block;" />
                     </div>
                     <p style="font-size: 16px; color: #666;">
                     Nous avons le plaisir de vous informer que ${fullname} a récemment retiré ${UserCOMMISSON} de son portefeuille. Nous vous prions de bien vouloir confirmer cette transaction. 
                     </p>
                     <ul>
                         <li><a href="https://illicolove.com/v/profil.html">Vous pouvez visiter son profil.</a></li>
                     </ul>
                     <p style="font-size: 14px; color: #999;">
                         Restez à l'écoute pour recevoir d'autres nouvelles passionnantes !     
                     </p>
                     <p style="font-size: 14px; color: #999;">
                         Cordialement,     
                     </p>
                     <p style="font-size: 14px; color: #999;">
                         L'équipe illicolove.      
                     </p>
                     </td>
                 </tr>
                 </table>
                 `
                 };

                // Effectuer une requête POST vers l'API ElasticEmail
                fetch(apiUrl, {
                method: "POST",
                headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams(emailParams)
                })
                .then((response) => response.json())
                .then((data) => {
                //console.log(data); // Afficher la réponse de l'API ElasticEmail
                if (data.success) {
                //console.log("E-mail envoyé avec succès.");
                 } else {
                 // console.error("Erreur lors de l'envoi de l'e-mail.");
                 }
                })
                .catch((error) => {
                //console.error("Erreur lors de la requête API :", error);
                });
                // end envoi de mail de validation
                }
                  });

            })
        } else {
          //console.log("Utilisateur introuvable.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
      });
  }
  
  // Exemple d'utilisation : Remplacez "ID_DE_L_UTILISATEUR" par l'ID de l'utilisateur que vous souhaitez récupérer.
  getUserById(UserConnectuser);
 }