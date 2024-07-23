$("#exampleModalCenter").modal({ // 7M2AsvFsj2OeB50D8CDtQQFGP9K2
    show: true,
    backdrop: "static",
    keyboard: false,
});
const firebaseConfig = {
  apiKey: "AIzaSyDbQjciXp0J_UGQBBcqmjlCAemYK-tsR6c",
  authDomain: "am-wallet.firebaseapp.com",
  databaseURL: "https://am-wallet-default-rtdb.firebaseio.com",  
  projectId: "am-wallet", 
  storageBucket: "am-wallet.appspot.com",
  messagingSenderId: "877693231070",
  appId: "1:877693231070:web:47c59ac6220ed09af9c74f"
};
const unserconnectId = localStorage.getItem("unserconnect")
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

document.getElementById('numberIdSubmit').addEventListener('click', function(){
  var numberId = document.getElementById('numberId');
  if (numberId.value) {
      const newData = {
          TABLESLOTO: numberId.value ,
          ACCOUNTLOTO: "",
          AMONTTLOTO: "",
          dateActuelle:"",
      };

      // Get all users
      database.ref('/utilisateurs').once('value', snapshot => {
          snapshot.forEach(userSnapshot => {
              const userRef = database.ref(`/utilisateurs/${userSnapshot.key}`);
              userRef.update(newData, (error) => {
                  if (error) {
                      console.error(`Failed to update user ${userSnapshot.key}:`, error);
                  } else {
                      console.log(`User ${userSnapshot.key} updated successfully.`);
                  }
              });
          });
      });
  }
});