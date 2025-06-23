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
        const transfertCodeId = `${amwalette_Adress} `; // valeur que tu veux rechercher
        database.ref("/utilisateurs")
          .orderByChild("transfert_code_id")
          .equalTo(transfertCodeId)
          .once("value")
          .then(snapshot => {
            if (snapshot.exists()) {
              snapshot.forEach(childSnapshot => {
                const userIdcode = childSnapshot.key;
                localStorage.setItem("IDAFILIATE", userIdcode);
                const userData = childSnapshot.val();
                alert(userIdcode);
                var ACCOUNTPRINCIPAL = userData.ACCOUNTPRINCIPAL;
                var usernameVal = userData.username;
                var userEmail = userData.email;
                var transfert_code_id = userData.transfert_code_id;
                alert(transfert_code_id);
                // var ACCOUNTPRINCIPALACCESS = snapshot.val().ACCOUNTPRINCIPALACCESS
                var myComptaConvertis = parseFloat(ACCOUNTPRINCIPAL);
                var addCommissionConvertis = parseFloat(soldeId)
                if (balanceIDAWWx >= soldeIdX) {
                  if (amwalettuserId != unserconnectId) {
                    var myCommissionAdd = myComptaConvertis + addCommissionConvertis
                    const newData = {
                      ACCOUNTPRINCIPAL: myCommissionAdd
                    };
                    const userRefx = database.ref(`/utilisateurs/${userIdcode}`);
                    userRefx.update(newData, (error) => {
                      if (error) {
                        Swal.fire({
                          title: "Ooops",
                          confirmButtonText: "OK",
                          allowOutsideClick: false,
                          text: "Error ",
                          icon: 'error'
                        }).then((result) => {
                          if (result.isConfirmed) {
                            window.location.reload();
                          }
                        })
                      } else {
                        var soldeId = document.getElementById("soldeId").value;
                        var myComptaConvertis = parseFloat(balanceIDAWW);
                        var addCommissionConvertis = parseFloat(soldeId)
                        var myCommissionAdd = myComptaConvertis - addCommissionConvertis
                        const newData = {
                          ACCOUNTPRINCIPAL: myCommissionAdd,
                          //ACCOUNTPRINCIPALACCESS:0
                        };
                        const userRefx = database.ref(`/utilisateurs/${unserconnectId}`);
                        userRefx.update(newData, (error) => {
                          if (error) {
                            Swal.fire({
                              title: "Ooops",
                              confirmButtonText: "OK",
                              allowOutsideClick: false,
                              text: "Your transfer has failed.",
                              icon: 'error'
                            }).then((result) => {
                              if (result.isConfirmed) {
                                window.location.reload();
                              }
                            })
                          } else {

                            const amount = 1500; // Montant du transfert

                            const dateActuelle = new Date();
                            const dateFormatee = `${dateActuelle.getDate()}/${dateActuelle.getMonth() + 1}/${dateActuelle.getFullYear()} ${dateActuelle.getHours()}h:${dateActuelle.getMinutes()}min`;
                            const senderId = localStorage.getItem("unserconnect");
                            const receiverId = localStorage.getItem("IDAFILIATE");
                            const usernameT = localStorage.getItem("usernameT");
                            // Références utilisateurs
                            const senderRef = database.ref(`/utilisateurs/${senderId}`);
                            const receiverRef = database.ref(`/utilisateurs/${receiverId}`);

                            // Message pour l'expéditeur
                            const senderMessage = {
                              type: "transfert",
                              message: `Vous avez transféré ${amount} FCFA à cet utilisateur. ${amwalette_Adress}`,
                              montant: amount,
                              status: true,
                              time: dateFormatee,
                              diffuser: true,
                            };

                            // Message pour le destinataire
                            const receiverMessage = {
                              type: "réception",
                              message: `Vous avez reçu ${amount} FCFA de ${usernameT}`,
                              montant: amount,
                              status: true,
                              time: dateFormatee,
                              diffuser: true,
                            };

                            // Envoi des messages
                            senderRef.child("MESSAGES").push(senderMessage);
                            receiverRef.child("MESSAGES").push(receiverMessage);


                            Swal.fire({
                              icon: 'success',
                              title: "Succès",
                              confirmButtonText: "OK",
                              allowOutsideClick: true,
                              text: `Your transfer has been completed successfully.`,
                            }).then((result) => {
                              if (result.isConfirmed) {
                                //window.location.reload();
                              }
                            })

                            // statr envoi de mail de validation
                            const apiKey = "8641DFD6DEB84F274A242CED8BEE37881D26BCEBA376A91F443285636EE43B33260B0611BBC88F1001BF8C88FBBC26C1";
                            const apiUrl = "https://api.elasticemail.com/v2/email/send";

                            // Définir les paramètres de l'e-mail
                            const emailParams = {
                              apiKey: apiKey,
                              subject: "Notification de Commission",
                              from: "amobilewallet.inter@gmail.com",
                              fromName: "AM WALLET",
                              to: userEmail,
                              bodyHtml: `
                              <table cellpadding="10" cellspacing="0" style="background-color: #f1f1f1; padding: 20px;">
                                  <tr>
                                <td>
                                    <h1 style="color: #333;">Congratulations ${usernameVal}!</h1>
                                    <p style="font-size: 16px; color: #666;">
                                    We are pleased to inform you that you have just received ${addCommissionConvertis}$ from ${useremail} about AM WALLET. thank you!
                                    </p>
                                    <p style="font-size: 14px; color: #999;">
                                        Stay tuned for more exciting news!
                                    </p>
                                    <p style="font-size: 14px; color: #999;">
                                        Sincerely,
                                    </p>
                                    <p style="font-size: 14px; color: #999;">
                                        The AM WALLET team.
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
                                  window.location.href = "index.html"
                                  // localStorage.removeItem('IDAFILIATE');
                                  console.log("E-mail envoyé avec succès.");
                                } else {
                                  console.error("Erreur lors de l'envoi de l'e-mail.");
                                  window.location.href = "index.html"
                                }
                              })
                              .catch((error) => {
                                console.error("Erreur lors de la requête API :", error);
                                window.location.href = "index.html"
                              });
                            // end envoi de mail de validation


                          }
                        })
                      }
                    })
                  } else {
                    Swal.fire({
                      title: "Ooops",
                      confirmButtonText: "OK",
                      allowOutsideClick: false,
                      text: "This transfert isn't possible. ",
                      icon: 'error'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        window.location.reload();
                      }
                    })
                  }

                } else {
                  Swal.fire({
                    title: "Info ",
                    text: "You cannot transfer this amount",
                    icon: "error",
                    allowOutsideClick: false,
                  })
                }
              });
            } else {
              Swal.fire({
                title: "Ooops",
                confirmButtonText: "OK",
                allowOutsideClick: false,
                text: "This transfer code does not exist.",
                icon: 'error'
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              })
            }

          })
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