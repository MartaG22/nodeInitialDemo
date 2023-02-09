const showUsers = (room, usersInThisRoom, currentUser) => {

      try {
            const usersInRoom = document.getElementById("usersList");
            console.log( "LLEGA A PUBLIC/SHOWUSERS:", room, usersInThisRoom, currentUser);

            for (const user of usersInThisRoom) {
                  console.log('USER:', user);
                  if (user === currentUser){
                        usersInRoom.innerHTML += `<span style='color:#ff0000;'>${user}</span> <br>`;

                  } else {
                        usersInRoom.innerHTML += `${user} <br>`;
                  }
            };

            document.getElementById("showCurrentRoom").innerHTML = `${room} <br>`;

      } catch (error) {
            return { status: "error", message: error };
      }

}