document.querySelector('.logout-button').addEventListener('click', () => {
      const leaveRoom = confirm("Vols desconnectar?");
      if(leaveRoom){
          sessionStorage.clear();
          window.location.replace("./login.html");
      }
  })
