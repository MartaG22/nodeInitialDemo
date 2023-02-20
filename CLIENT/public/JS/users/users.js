const showUsers = (room, usersInThisRoom, currentUser) => {

      try {
            const usersInRoom = document.getElementById("usersList");
            const newMessages = document.getElementById("newMessages");

            if (sessionStorage.roomName === room) {
                  
                  usersInRoom.innerHTML = "";
                  for (const user of usersInThisRoom) {
                        if (sessionStorage.userName === user) {
                              usersInRoom.innerHTML += `<span style='color: rgb(205, 111, 186);'>${user}</span> <br>`
                        } else if (sessionStorage.userName !== user) {
                              usersInRoom.innerHTML += `${user} <br>`
                        }
                  };

                  if (sessionStorage.userName == currentUser) {
                        document.getElementById("showCurrentRoom").innerHTML = `${room} <br>`
                  };
            };

      } catch (error) {
            return { status: "error", message: error };
      };
};

//! MENSAJE 
const showUserNewRoom = (room, usuari) => {
      try {
            const usersInRoom = document.getElementById("usersList");
            const dataMessage = document.getElementById("notificationRoom")
            usersInRoom.innerHTML = "";
            dataMessage.innerHTML = "";

            if (sessionStorage.userName !== usuari.userName) {

                  const message = `L'usuari ${usuari.userName} ha creat la ROOM ${room}`;
                  dataMessage.innerHTML += message;
                  setTimeout(() => {
                        dataMessage.innerHTML = dataMessage.innerHTML.replace(message, "");
                  }, 5000); 

            };

            if (sessionStorage.userName === usuari.userName) {
                  usersInRoom.innerHTML += `<span style='color: rgb(205, 111, 186);'>${user}</span> <br>`
                  document.getElementById("showCurrentRoom").innerHTML = `${room} <br>`
            };

      } catch (error) {
            return { status: "error", message: error };
      };
};



const showUsersChangeRoom = (room, usersInThisRoom, currentUser) => {

      try {
            const usersInRoom = document.getElementById("usersList");
            usersInRoom.innerHTML = "";

            for (const user of usersInThisRoom) {

                  if (sessionStorage.userName === user) {
                        usersInRoom.innerHTML += `<span style='color: rgb(205, 111, 186);'>${user}</span> <br>`
                  }
            };

            document.getElementById("showCurrentRoom").innerHTML = `${room} <br>`

      } catch (error) {
            return { status: "error", message: error };
      };

};