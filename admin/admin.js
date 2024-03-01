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
        const userRefx = database.ref(`/utilisateurs/${usermxid}`);
        userRefx.once("value")
        .then((snapshot)=> {  
            snapshot.forEach((productSnapshot) => {
                document.getElementById('headerxx').style.display = "block" 
                document.getElementById('sendIDxww').style.display = "none" 
                document.getElementById('sendID').addEventListener('click', function(){
                    var variableunity = document.getElementById('filterx').value;
                    var myCompta = parseFloat(mxcompt);
                    var addunityForuser = parseFloat(variableunity)
                    var sommesUnity = myCompta + addunityForuser
                    document.getElementById('headerxx').style.display = "none"
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

  document.getElementById('sendIDx').addEventListener('click', function(){
    document.getElementById('headerxx').style.display = "none" 
    document.getElementById('sendIDxww').style.display = "block"  
  })