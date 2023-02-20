const showMessages = async (room, previousMessages, currentUser, usersInThisRoom) => {
      try {

            const updateMessages = document.getElementById("oldMessages");

            if (sessionStorage.roomName === room) {

                  updateMessages.innerHTML = "";
                  for (message of previousMessages) {

                        if (sessionStorage.userName === message.nomUsuari) {
                              updateMessages.innerHTML += `<br><span style = 'float: right'><strong>${message.nomUsuari}: </strong><span>${message.missatge} </span>`;

                        } else {
                              updateMessages.innerHTML += `<br><span style = 'float: left;'><strong>${message.nomUsuari}: </strong><span>${message.missatge}</span> <br>`;
                        };
                  };
            };

      } catch (error) {
            return { status: "error", message: error };
      };
};

const sendMessage = async () => {
      try {
            const newMessageUser = document.querySelector('.xatForm input[name="newMessage"]').value;
            document.querySelector('.xatForm input[name="newMessage"]').value = ""

            const room = { roomName: sessionStorage.roomName };

            if (newMessageUser) {
                  socket.emit("newMessage", newMessageUser, room);
            };

      } catch (error) {
            return { status: "error", message: error };
      };
};



const showNewMessage = async (newMessage, currentUser, room) => {
      try {
            const updateMessages = document.getElementById("oldMessages");

            if (sessionStorage.roomName === room) {

                  if (sessionStorage.userId == newMessage.idUsuari) {
                        updateMessages.innerHTML += `<br><span  style = 'float: right;'><strong> ${newMessage.nomUsuari}: </strong><span style='color: #822252;'>${newMessage.missatge} </span> `;
                  } else {
                        updateMessages.innerHTML += `<br><span style = 'float:left;'><strong>${newMessage.nomUsuari}: </strong><span>${newMessage.missatge} </span><br>`;
                  };
            };
      } catch (error) {
            return { status: "error", message: error };
      };
};



const showDataMessage = (message) => {
      document.getElementById('notificationRoom').removeAttribute('id');
      console.log(message)
      const updateMessage = document.getElementById("notificationRoom");
      updateMessage.innerHTML += message;
      setTimeout(() => {
            updateMessage.innerHTML = updateMessage.innerHTML.replace(message, "");
      }, 5000); 

};
