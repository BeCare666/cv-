const username = localStorage.getItem("usernameT")
var valVal = document.getElementById('soldeId').value
document.getElementById('submitid').value = `Transfer your Amount now`
function submitmy(username){
    document.getElementById('containerId').style.display = "none"
    Swal.fire({
      title: "Transfer...",
      html: `Dear ${username}, your transfer ${valVal}$ will be finalized in <b></b> milliseconds at the most.`,
      timer: 7000,
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
      },
      willClose: () => {
          clearInterval(timerInterval);
      }
      }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        swal.fire({
          title: "Ooops..",
          text: `Dear ${username}, your transfer is failed, contact AM_WALLET to find out more. Thank!`,
          icon: "error",
           allowOutsideClick: false,
          }).then((result)=>{
            if(result.isConfirmed){
              window.location.href = "index.html"
            }
          })
      }
      });

}