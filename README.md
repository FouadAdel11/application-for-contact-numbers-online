
MEAN Stack Contact Management Application:
  This project is a MEAN (MongoDB, Express.js, Angular, Node.js) stack application for managing contact numbers online. The application 
  allows users to add, edit, delete, and list contacts with server-side pagination and filters. It includes a login page with hard-coded 
  credentials and user management functionalities.
****************************************************************
Features:
1-Add New Contact
  Add a contact with Name, Phone, Address, and Notes.
2-List Contacts
  Display contacts in a grid with server-side pagination (5 contacts per page).
  Add column filters to the grid for quick searching.
3-Edit Contact
  Edit contact details directly in the grid.
  Lock contacts being edited to prevent conflicts.
  Delete Contact
4-Delete a contact with a confirmation prompt.
5- User Authentication
  Login page with hard-coded credentials:
    User 1: user1 / user1
    User 2: user2 / user2
6-Real-time Updates
  Real-time updates for contact edits, ensuring changes appear to other users without needing to refresh the    page.

  **********************************************************************
  Installation:
    1-  Clone the repository:
      git clone https://github.com/FouadAdel11/application-for-contact-numbers-online
      cd application-for-contact-numbers-online
    2-Backend Setup (Node.js/Express)
      -Navigate to the backend directory and install dependencies:
        cd backend
        npm install
      -Create a .env file and add your MongoDB connection string:
        MONGO_URI=your_mongodb_connection_string
      -Start the backend server:
        npm start
    3-Frontend Setup (Angular)
    -Navigate to the frontend directory and install dependencies:
      cd frontend
      npm install
    -Start the Angular development server:
      ng serve
********************************************************************
Project Structure:
  -Backend (Node.js/Express)
  -Server Initialization: server.js
  -API Routes: routes/contactRoutes.js, routes/userRoutes.js
  -Models: models/Contact.js, models/User.js
  -Controllers: controllers/contactController.js, controllers/userController.js
  -Real-time Functionality: services/socketService.js
Frontend (Angular)
  Components:
    app/components/login: Login page
    app/components/list: Contact list with pagination and filters
    app/components/creatr-contact: Add
    app/components/edit-contact: Edit contact form
  Services:
    app/services/backend.service.ts: Service for contact operations
    app/services/auth.service.ts: Service for authentication
Modules:
  app/modules/material.module.ts: Angular Material imports for UI components
************************************************
Usage:
  1-Login:
    Access the login page and use the provided credentials to log in.
  2-Manage Contacts:
    Add new contacts using the form.
    Edit contacts directly in the grid and observe real-time updates.
    Delete contacts with confirmation.
  3-Filtering and Pagination:
    Use the filters to quickly search for contacts.
    Navigate through pages to view different sets of contacts.
**************************************************************
Real-time Functionality:
  The application uses Socket.io to handle real-time updates for contact edits. When a user edits a contact, it is locked for other   
  users, and the changes are reflected in real-time.
  *******************************************************************
Contribution:
  Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would 
  like to change.
*********************************************************
License:
  This project is licensed under the MIT License.
****************************************************************
GitHub Repository:
  Link to GitHub Repository https://github.com/FouadAdel11/application-for-contact-numbers-online
******************************************
Contact:
  For any queries or support, please contact me at fouad.attallaah@gmail.com.
 
