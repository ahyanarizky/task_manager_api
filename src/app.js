/**
 * Import express and store in a constant.
 */
import express from "express";
import User from "./../db/models/user.js";
import {sequelize} from "../db/db.js";
/**
 * Create an express application by running express as a function,
 * and store it to a constant.
 */
const app = express();

/**
 * Define the port number that the express application should use.
 */
const port = 3000;


/**
 * Create a anonymous function to establish the database connection.
 * After the connection is established, start the server.
 */
const initApp = async () => {
    console.log("Testing the database connection..");
    /**
     * Test the connection.
     * You can use the .authenticate() function to test if the connection works.
     */
    app.use(express.json());
    // app.use(express.urlencoded());
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        /**
         * Start the web server on the specified port.
         */
        app.listen(port, () => {
            console.log(`Server is up and running at: http://localhost:${port}`);
        });

        app.get('/', (req, res) => {
            res.send('Hello, World!');
          });
          
          // Get all users
          app.get('/users', async (req, res) => {
            try {
              const users = await User.findAll();
              res.json(users);
            } catch (error) {
              console.error(error);
              res.status(500).json({ message: 'Server Error' });
            }
          });
          
          // Get a user by ID
          app.get('/users/:id', async (req, res) => {
            const { id } = req.params;
            try {
              const user = await User.findByPk(id);
              if (user) {
                res.json(user);
              } else {
                res.status(404).json({ message: 'User not found' });
              }
            } catch (error) {
              console.error(error);
              res.status(500).json({ message: 'Server Error' });
            }
          });

          // Create a user
app.post('/users', async (req, res) => {
  console.log(req)
  const { username, password, first_name, last_name, email } = req.body;
  try {
    const user = await User.create({ username, password, first_name, last_name, email });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a user by ID
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, password, first_name, last_name, email } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.username = username;
      user.password = password;
      user.first_name = first_name;
      user.last_name = last_name;
      user.email = email;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a user by ID
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
          
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

/**
 * Initialize the application.
 */
initApp();