//Your web app's Firebase configuration
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
const balanceIDAWW = localStorage.getItem("balanceIDAWWW")
const unserconnectId = localStorage.getItem("unserconnect")
//const bilanuserId = "JyPM9obdRafgNHOZZ8e4piR1SVA3"

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var useremail = user.email
    var submitid = document.getElementById("submitid");
    submitid.addEventListener("click", submitmy)
    function submitmy() {
      var amwalette_Adress = document.getElementById("amwalette_Adress").value;
      var soldeId = document.getElementById("soldeId").value;

      if (amwalette_Adress && soldeId) {
        var soldeIdX = parseFloat(soldeId);
        var balanceIDAWWx = parseFloat(balanceIDAWW);
        const transfertCodeId = document.getElementById("transfert_code_input").value;
        const soldeToSend = parseFloat(document.getElementById("soldeId").value);
        const userSenderId = localStorage.getItem("unserconnect");
        const usernameSender = localStorage.getItem("usernameT");
        const amwalletAddress = localStorage.getItem("amwalette_adress"); // à ajuster si nécessaire
        const senderBalance = parseFloat(localStorage.getItem("balanceIDAWW")); // à récupérer dynamiquement sinon

        // Vérifie montant valide
        if (isNaN(soldeToSend) || soldeToSend <= 0) {
          Swal.fire("Erreur", "Montant de transfert invalide", "error");
          return;
        }

        // Recherche l’utilisateur cible via le transfert_code_id
        database.ref("/utilisateurs")
          .orderByChild("transfert_code_id")
          .equalTo(transfertCodeId)
          .once("value")
          .then(snapshot => {
            if (!snapshot.exists()) {
              return Swal.fire("Erreur", "Code de transfert inexistant", "error");
            }

            // On récupère l’unique utilisateur correspondant
            const receiverKey = Object.keys(snapshot.val())[0];
            const receiverData = snapshot.val()[receiverKey];

            // Empêche transfert vers soi-même
            if (userSenderId === receiverKey) {
              return Swal.fire("Erreur", "Vous ne pouvez pas vous transférer à vous-même", "error");
            }

            const receiverEmail = receiverData.email;
            const receiverName = receiverData.username;
            const receiverBalance = parseFloat(receiverData.ACCOUNTPRINCIPAL || 0);

            // Vérifie que l’expéditeur a assez d’argent
            if (senderBalance < soldeToSend) {
              return Swal.fire("Erreur", "Solde insuffisant pour effectuer ce transfert", "error");
            }

            // Calculs
            const newSenderBalance = senderBalance - soldeToSend;
            const newReceiverBalance = receiverBalance + soldeToSend;

            const now = new Date();
            const dateFormatee = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}h:${now.getMinutes()}min`;

            // Mise à jour des comptes
            const senderRef = database.ref(`/utilisateurs/${userSenderId}`);
            const receiverRef = database.ref(`/utilisateurs/${receiverKey}`);

            // Débiter l’expéditeur
            senderRef.update({ ACCOUNTPRINCIPAL: newSenderBalance }, (error) => {
              if (error) {
                return Swal.fire("Erreur", "Échec de mise à jour du solde émetteur", "error");
              }

              // Créditer le destinataire
              receiverRef.update({ ACCOUNTPRINCIPAL: newReceiverBalance }, (error) => {
                if (error) {
                  return Swal.fire("Erreur", "Échec de mise à jour du solde destinataire", "error");
                }

                // Enregistrement des notifications/messages
                const senderMessage = {
                  type: "transfert",
                  message: `Vous avez transféré ${soldeToSend} FCFA à cet utilisateur. ${amwalletAddress}`,
                  montant: soldeToSend,
                  status: true,
                  time: dateFormatee,
                  diffuser: true,
                };

                const receiverMessage = {
                  type: "réception",
                  message: `Vous avez reçu ${soldeToSend} FCFA de ${usernameSender}`,
                  montant: soldeToSend,
                  status: true,
                  time: dateFormatee,
                  diffuser: true,
                };

                senderRef.child("MESSAGES").push(senderMessage);
                receiverRef.child("MESSAGES").push(receiverMessage);

                // Envoi d’email
                const apiKey = "TA_CLE_ELASTICEMAIL";
                const apiUrl = "https://api.elasticemail.com/v2/email/send";

                const emailParams = {
                  apiKey,
                  subject: "Notification de Commission",
                  from: "amobilewallet.inter@gmail.com",
                  fromName: "AM WALLET",
                  to: receiverEmail,
                  bodyHtml: `
            <div style="padding:20px; background-color:#f9f9f9;">
              <h2 style="color:#444;">Bonjour ${receiverName},</h2>
              <p style="font-size:16px; color:#333;">
                Vous venez de recevoir <strong>${soldeToSend} FCFA</strong> de <strong>${usernameSender}</strong> sur AM Wallet.
              </p>
              <p style="font-size:14px; color:#888;">Date : ${dateFormatee}</p>
              <p style="font-size:14px; color:#888;">Merci de votre confiance.</p>
            </div>
          `
                };

                fetch(apiUrl, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  body: new URLSearchParams(emailParams)
                })
                  .then(res => res.json())
                  .then(data => {
                    Swal.fire("Succès", "Transfert effectué avec succès", "success");
                  })
                  .catch(error => {
                    console.error("Erreur email :", error);
                    Swal.fire("Succès", "Transfert effectué, mais l'email n'a pas pu être envoyé", "info");
                  });
              });
            });
          });

      } else {
        Swal.fire({
          title: "Ooops",
          confirmButtonText: "OK",
          allowOutsideClick: false,
          text: "Error link",
          icon: 'error'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        })
      }
    }
  } else {
    window.location.href = "login.html"
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