class Socket {
   connection: WebSocket | null;
   logout: boolean;

   constructor(url: string) {
      this.connection = new WebSocket(url);
      this.logout = false;
   }

   open = () => {
      this.connection?.addEventListener('open', ev => {
         if (this.logout) {
            this.logout = false;
            this.connection = null;
            // Quitting the function without reconnection
            return;
         }

         console.log('Connected');

         this.open();
      });

      this.connection?.addEventListener('message', ev => {
         console.log('Message from server ', ev.data);
      });

      this.connection?.addEventListener('close', ev => {
         console.log('close', ev);
      });

      this.connection?.addEventListener('error', err => {
         console.log('error', err);
      });
   };

   close = (logout = false) => {
      if (this.connection) {
         this.logout = logout;
         this.connection.close();
      }
   };
}

export default Socket;
