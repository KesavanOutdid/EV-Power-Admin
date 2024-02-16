const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const razorpay = require('razorpay');
const crypto = require('crypto');
const app = express();
const database = require('./db');
const {  ObjectId } = require('mongodb');
const logger = require('./logger');
const router = express.Router();
router.use(cors());

dotenv.config();
app.use(bodyParser.json());
router.use(cors());
router.use(express.urlencoded({ extended: true }));


// Razorpay configuration
const instance = new razorpay({
    key_id: process.env.KEY,
    key_secret: process.env.SECRET,
});

// Middleware for JSON parsing
router.use(bodyParser.json());

// Register Route
router.post('/register', async (req, res) => {
        try {
        const { username, phone, password } = req.body;
        const db = await database.connectToDatabase();
        const User = db.collection('users');
    
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(403).json({ message: 'You are already registered' });
        }
    
        // Parse walletBalance to double
        const walletBalance = parseFloat(req.body.walletBalance);
    
        await User.insertOne({
            username,
            phone,
            password,
            roleID: '1', // Default value "user"
            walletBalance: isNaN(walletBalance) ? 0.00 : walletBalance, // Set default value if NaN
        });
    
        res.status(201).json({ message: 'User registered successfully' });
        console.log('New user have been registered successfully' )
        logger.info('New user have been registered successfully' )
        } catch (error) {
        console.error('Error in registering user:', error);
        logger.error(`Error in registering user: ${error}`)
        res.status(500).json({ message: 'Internal Server Error' });
        }
    });

// Login Route
router.post('/login', async (req, res) => {    
        try {
        const { username, password } = req.body;
        const db = await database.connectToDatabase();
        const User = db.collection('users');
    
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }else 
        console.log(user.username + " has logged in");
        logger.info(user.username + " has logged in");
    
        const token = jwt.sign({ username }, 'secret-key', { expiresIn: '1h' });
    
        let roleID = '1'; // Default role
        if (user.admin) {
            // role = 'admin';\
            roleID = '2';
        }
    
        res.status(200).json({
            token,
            _id:user._id,
            username: user.username,
            phone: user.phone,
            password:user.password,
            roleID:user.roleID, // Include role in the response
        });
        } catch (error) {
        console.error('Error logging in:', error);
        logger.error(`Error logging in: ${error}`);
        res.status(500).json({ message: 'Internal Server Error' });
        }
    });
    

//Manage User Routes
// Admin route for managing users
router.get('/ManageUser', async (req, res) => {
    try {
        const db = await database.connectToDatabase();
        const User = db.collection("users")
        const users = await User.find().toArray();
        res.json({ success: true, users });
        } catch (error) {
            console.error('Error fetching chargers:', error);
            logger.error(`Error fetching users: ${error}`)
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    });
// Create a new user
router.post('/ManageUser/createUser', async (req, res) => {    
        try {
        const { username, phone, walletBalance, password, roleID } = req.body;
        const db = await database.connectToDatabase();
        const User = db.collection('users');
    
        // Check if username or phone number already exist in the database
        const existingUser = await User.findOne({ $or: [{ username }, { phone }] });
        if (existingUser) {
            console.log('Username or phone number already exists');
            logger.info('Username or phone number already exists');
            return res.status(400).json({ message: 'Username or phone number already exists' });
        } else {
            try {
            console.log('User creating');
            await User.insertOne({
                username,
                phone,
                roleID, // Set the admin based on the role
                password,
                walletBalance: parseFloat(walletBalance), // Parse walletBalance to double
    
            });
            return res.status(201).json({ message: 'User created successfully' });
            } catch (error) {
            console.error('Error creating user:', error);
            logger.error(`Error creating user: ${error}`);
            return res.status(500).json({ message: 'Internal Server Error' });
            }
        }
        } catch (error) {
        console.error('Error creating user:', error);
        logger.error(`Error creating user: ${error}`);
        res.status(500).json({ message: 'Internal Server Error' });
        }
    });
// Update User Route
router.put('/ManageUser/updateUser/:id', async (req, res) => {    
        try {
        const userId = req.params.id;
        const { username, phone, password, walletBalance ,roleID} = req.body;
        const db = await database.connectToDatabase();
        const User = db.collection('users');
    
        const result = await User.updateOne(
            { _id:new ObjectId(userId) },
            { $set: { username,password, phone, walletBalance ,roleID} }
        );
        if (result.modifiedCount === 1) {
            console.log('User updated successfully',username);
            logger.info('User updated successfully'+username);
            res.status(200).json({ message: 'User updated successfully' });
        } else {
            console.log('User not found or details not updated');
            logger.warn('User not found or details not updated');
            res.status(404).json({ message: 'User not found or details not updated' });
        }
        } catch (error) {
        console.error(error);
        logger.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        }
    });
// Delete User Route
router.delete('/ManageUser/deleteUser/:id', async (req, res) => {
        try {
        const userId = req.params.id;
        console.log("Received DELETE request for user ID:", userId);
        logger.info("Received DELETE request for user ID:"+ userId);
        const db = await database.connectToDatabase();
        const User = db.collection('users');
    
        const result = await User.deleteOne({_id:new ObjectId(userId) });
    
        if (result.deletedCount) {
            console.log('User deleted successfully',userId);
            logger.info('User deleted successfully'+ userId);
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            console.log('User not found or not deleted');
            logger.warn('User not found or not deleted');
            res.status(404).json({ message: 'User not found or not deleted' });
        }
        } catch (error) {
        console.error(error);
        logger.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        }
    });
// View SessionHistory in ManageUser Route
router.get('/ManageUser/ViewSession/:username', async (req, res) => {
        try {
        const username = req.params.username;
        
        const db = await database.connectToDatabase();
        const ChargerSessionHistory = db.collection('charging_session');
        const chargers = await ChargerSessionHistory.find({ user: username }).toArray();
        res.status(200).json({ chargers });
        } catch (error) {
        console.error(error);
        logger.error(error);
        res.status(500).json({ message: "Internal Server Error" });
        }
    });
// View Wallet Transaction in ManageUser Route
router.get('/ManageUser/ViewWalletTransaction/:username', async (req, res) => {
        try {
        const username = req.params.username;
        
        const db = await database.connectToDatabase();
        //Charging session
        const ChargerSession = db.collection('charging_session');
        const session = await ChargerSession.find({ user: username }).toArray();
        //Payment Details
        const PaymentDetails = db.collection('paymentDetails');
        const payment = await PaymentDetails.find({ user: username }).toArray();
        const Debited = session.map(item => ({ price: item.price, date_time: item.StopTimestamp ,Status:"Debited"}));
        const Credited = payment.map(item => ({ price: item.RechargeAmt, date_time: item.date_time ,Status:"Credited"}));
        // Combine Debited and Credited arrays
        const Transactions = [...Debited, ...Credited];
    
        res.status(200).json({ Transactions });
        } catch (error) {
        console.error(error);
        logger.error(error);
        res.status(500).json({ message: "Internal Server Error" });
        }
    });
    

// Chargerlist Routes...
// Read all chargers
router.get('/ManageCharger', async (req, res) => {
        try {
        const db = await database.connectToDatabase();
        const ChargerList = db.collection("ev_details")
        const chargers = await ChargerList.find().toArray();
    
        res.json({ success: true, chargers });
        } catch (error) {
            console.error('Error fetching chargers:', error);
            logger.info('Error fetching Chargers : ' + error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    });
// Create a new charger
router.post('/ChargerList/chargers', async (req, res) => {
        try {
        const {ChargerID, transactionId, ChargerTagID, charger_model, charger_type, current_phase, gun_connector,
            max_current, max_power, socket_count, current_or_active_user, ip,} = req.body;
        const db = await database.connectToDatabase();
        const ChargerList = db.collection("ev_details")
    
        await ChargerList.insertOne({
            ChargerID,
            transactionId: null, // Initialize transactionId to null
            ChargerTagID,
            charger_model,
            charger_type,
            current_phase,
            gun_connector,
            max_current,
            max_power,
            socket_count,
            current_or_active_user: null, // Initialize current_or_active_user to null
            ip: null, // Initialize ip to null
        });
    
        res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
        console.error(error);
        logger.info(`Error creating user: ${error}`);
        res.status(500).json({ message: 'Internal Server Error' });
        }
    });
    
// deleting a charger
router.delete('/ManageCharger/deleteCharger/:id', async (req, res) => {
        try {
            const chargerId = req.params.id;
            console.log('Received DELETE request for charger ID:', chargerId);
            logger.info('Received DELETE request for charger ID:'+ chargerId);
        
            const db = await database.connectToDatabase();
            const Charger = db.collection('ev_details');
    
            const result = await Charger.deleteOne({ _id:new ObjectId(chargerId) });
            
            if (result.deletedCount ==1) {
                console.log('Charger deleted successfully',chargerId);
                logger.info('Charger deleted successfully' + chargerId);
                res.status(200).json({ message: 'Charger deleted successfully' });
            } else {
                console.log('Charger not found or not deleted');
                logger.info('Charger not found or not deleted');
                res.status(404).json({ message: 'Charger not found or not deleted' });
            }
        } catch (error) {
            console.error('Error deleting charger:', error);
            logger.info('Error deleting charger: '+  error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
// Update Charger 
router.put('/ManageCharger/updateCharger/:id', async (req, res) => {
        try {
        const chargerId = req.params.id;
        const {
        ChargerID, transactionId, ChargerTagID, charger_model, charger_type, current_phase, gun_connector,
        max_current, max_power, socket_count, current_or_active_user, ip,
        } = req.body;
        const db = await database.connectToDatabase();
        const Charger = db.collection("ev_details");
    
        const result = await Charger.updateOne(
            { _id: new ObjectId(chargerId) }, // Filter for the charger to update
            {
            $set: {
                ChargerID, transactionId, ChargerTagID, charger_model, charger_type, current_phase, gun_connector,
                max_current, max_power, socket_count, current_or_active_user, ip
            }
            } // New values for the charger
        );
    
        if (result.modifiedCount === 1) {
            console.log("Charger updated successfully");
            logger.info("Charger updated successfully");
            res.status(200).json({ message: "Charger updated successfully" });
        } else {
            console.log("Charger not found or details not updated");
            logger.info("Charger not found or details not updated", `Transaction ID ${transactionId}`);
            res.status(404).json({ message: "Charger not found or details not updated" });
        }
        } catch (error) {
        console.error(error);
        logger.error(`Failed to update charger: ${error}`, `Transaction ID ${req.body.transactionId}`);
        res.status(500).json({ message: "Internal Server Error" });
        }
    });


// User Roles Routes...
//Read all UserRoles
router.get('/ManageUserRoles', async (req, res) => {
        try {
        const db = await database.connectToDatabase();
        const UserRole = db.collection("User_Roles");
        const roles = await UserRole.find().toArray();
    
        res.json({ success: true, roles });
        } catch (error) {
            console.error('Error fetching roles:', error);
            logger.error('Error fetching roles:'+ error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    });
// Create a new user role
router.post('/createUserRoles', async (req, res) => {    
        try {
        const { roleID, roleName } = req.body;
        const db = await database.connectToDatabase();
        const UserRole = db.collection("User_Roles");
        
        await UserRole.insertOne({
            roleID, roleName 
        });
    
        
        res.status(201).json({ message: 'new User role created successfully' });
        } catch (error) {
        console.error(error);
        logger.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        }
    });
// Update user role
router.put('/ManageUserRoles/UpdateuserRoles/:id', async (req, res) => {
        try {
        const { roleID, roleName } = req.body;
        const Use5rRoleID = req.params.id;
        const db = await database.connectToDatabase();
        const UserRole = db.collection("User_Roles");
        
        const result = await UserRole.updateOne(
            { _id: new ObjectId(Use5rRoleID) }, // Use req.params.id here
            {
            $set: {
                roleID,
                roleName
            }
            }
        );
        
        if (result.modifiedCount === 1) {
            console.log("UserRole updated successfully");
            logger.info(`Updated User Role with ID ${Use5rRoleID}`);
            res.status(200).json({ message: "UserRole updated successfully" });
        } else {
            console.log("UserRole not found or details not updated");
            logger.warn(`Failed to update User Role with ID ${Use5rRoleID}. Either the UserRole was not found or no changes were made.`);
            res.status(404).json({ message: "UserRole not found or details not updated" });
        }
        } catch (error) {
        console.error(error);
        logger.error(error);
        res.status(500).json({ message: "Internal Server Error" });
        }
    });
// Delete a user role
router.delete('/ManageUserRoles/deleteuserRoles/:id', async (req, res) => {    
        try {
            const userId = req.params.id;
            console.log('Received DELETE request for Use5rRole ID :', userId);
            logger.info('Received DELETE request for Use5rRole ID :'+  userId);

            const db = await database.connectToDatabase();
            const UserRole = db.collection("User_Roles");
    
            const result = await UserRole.deleteOne({_id: new ObjectId(userId) });
            if (result.deletedCount ==1) {
                console.log('UserRole deleted successfully',userId);
                logger.info(`Deleted User Role with ID ${userId}`);
                res.status(200).json({ message: 'UserRole deleted successfully' });
            } else {
                console.log('UserRole not found or not deleted');
                logger.warn(`Failed to delete User Role with ID ${userId}. Either the UserRole was not found or there was an error.`);
                res.status(404).json({ message: 'UserRole not found or not deleted' });
            }
        } catch (error) {
            console.error('Error deleting charger:', error);
            logger.error('Error deleting charger:%o'+  error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });


// SessionHistory Routes...
// Read all SessionHistory
router.get('/ManageSessionHistory', async (req, res) => {
        try {
        const db = await database.connectToDatabase();
        const ChargerList = db.collection("ev_details")
        const chargers = await ChargerList.find().toArray();
    
        res.json({ success: true, chargers });
        } catch (error) {
            console.error('Error fetching chargers:', error);
            logger.info('Error fetching Chargers:%o'+  error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    });
// View SessionHistory  Route
router.get('/ManageSessionHistory/ViewSessionHistory/:chargerID', async (req, res) => {
        try {
        const chargerID = req.params.chargerID;
        const db = await database.connectToDatabase();
        const ChargerSessionHistory = db.collection('charging_session');
        const chargers = await ChargerSessionHistory.find({ ChargerID: chargerID }).toArray();
    
        res.status(200).json({ chargers });
        } catch (error) {
        console.error(error);
        logger.error('Error in getting the session history for a charger :%o'+ error);
        res.status(500).json({ message: "Internal Server Error" });
        }
    });
    

//Price Route...
// Read  Price
router.get('/ManagePrice', async (req, res) => {
    try {
        const db = await database.connectToDatabase();
        const ev_pricing = db.collection("ev_pricing")
        const Pricing = await ev_pricing.find().toArray();
        res.json({ success: true, Pricing });
        } catch (error) {
            console.error('Error fetching Price:', error);
            logger.error(`Error fetching Price: ${error}`)
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    });
//Update price
router.put('/ManagePrice/UpdatePrice/:id', async (req, res) => {
    try {
    const updatedPrice  = req.body;
    const id = req.params.id;
    console.log(id);
    const db = await database.connectToDatabase();
    const ev_pricing = db.collection("ev_pricing")
    
    const result = await ev_pricing.updateOne(
        { _id: new ObjectId(id) }, // Use req.params.id here
        {
        $set: {
            UnitPrice:parseFloat(updatedPrice.UnitPrice),
        }
        }
    );
    
    if (result.modifiedCount === 1) {
        console.log("Price updated successfully");
        logger.info(`Updated Price with ID ${id}`);
        res.status(200).json({ message: "Price updated successfully" });
    } else {
        console.log("Price not found or details not updated");
        logger.warn(`Failed to update Price with ID ${id}.`);
        res.status(404).json({ message: "UserRole not found or details not updated" });
    }
    } catch (error) {
    console.error(error);
    logger.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    }
});


//TotalRevenue Route
// Read all TotalRevenue
router.get('/ManageTotalRevenue', async (req, res) => {
    try {
        const db = await database.connectToDatabase();
        const paymentDetails = db.collection("paymentDetails")
        const Revenue = await paymentDetails.find().toArray();

        const TotalRevenue = Revenue.reduce((total, payment) => total + payment.RechargeAmt, 0);
        
        res.json({ success: true, TotalRevenue: TotalRevenue, Revenue: Revenue });
        } catch (error) {
            console.error('Error fetching TotalRevenue:', error);
            logger.error(`Error fetching TotalRevenue: ${error}`)
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    });
// Profile Routes...
router.get('/ManageProfile', async (req, res) => {
        try {
        const db = await database.connectToDatabase();
        const User = db.collection('users');
        const users = await User.find().toArray();
        res.status(200).json({ users });
        } catch (error) {
        console.error('Error fetching users:', error);
        logger.error('Error fetching users:'+ error);
        res.status(500).json({ error: 'Internal Server Error' });
        }
    });
// Update profile
router.put('/ManageProfile/updateProfile/:id', async (req, res) => {
        try {
        const userId = req.params.id;
        const { username, phone, password, email, address } = req.body;
        const db = await database.connectToDatabase();
        const User = db.collection('users');
    
        const result = await User.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { username, phone, password, email, address } }
        );
    
        if (result.modifiedCount === 1) {
            console.log('Profile updated successfully');
            logger.info('Profile updated successfully');
            // Fetch and send updated user data in the response
            const updatedUser = await User.findOne({ _id: new ObjectId(userId) });
            res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
        } else {
            console.log('Profile not found or details not updated');
            logger.warn('Profile not found or details not updated');
            res.status(404).json({ message: 'Profile not found or details not updated' });
        }
    
        } catch (error) {
        console.error('Error updating user:', error);
        logger.error('Error updating user: %O'+ error);
        res.status(500).json({ message: 'Internal Server Error' });
        }
    });


// Payment verification route
router.post('/paymentverification', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.SECRET).update(body).digest('hex');
    const isAuth = expectedSignature === razorpay_signature;

    const db = await database.connectToDatabase();
    const Payment = db.collection('Payment_details');

    if (isAuth) {
        try {
        const fetchedOrder = await instance.orders.fetch(razorpay_order_id);
        const User = db.collection('users');
        const userName = fetchedOrder.notes.username;
        const correctAmount = parseFloat((fetchedOrder.amount / 100).toFixed(2)); // Convert to double with two decimal places

        // Insert payment details
        const paymentResult = await Payment.insertOne({
            username: userName, // Use the fetched username
            RechargeAmt: correctAmount,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            date_time: new Date().toLocaleString(),
        });

        if (!paymentResult) {
            throw new Error('Failed to save payment details');
        }

        // Update user's wallet
        const updateResult = await User.updateOne({ username: userName }, { $inc: { walletBalance: correctAmount } });
        if (updateResult.modifiedCount === 1) {
            console.log('Wallet updated successfully');
            logger.info('Wallet updated successfully');
            return res.redirect('http://192.168.1.12:4244/paymentsuccess');
        } else {
            throw new Error('Failed to update user wallet');
        }
        } catch (error) {
        console.error('Error fetching order details:', error);
        logger.error(`Error fetching order details: ${error}`);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    } else {
        res.status(400).json({ success: false });
    }
    });


// Wallet Balance Route
router.get('/GetWalletBalance', async (req, res) => {
    try {
        const username = req.query.username;
        const db = await database.connectToDatabase();
        const User = db.collection('users');
        const user = await User.findOne({ username });

        if (!user) {
        const errorMessage = 'Username not found to get wallet details';
        return res.status(404).json({ message: errorMessage });
        }

        res.status(200).json({ balance: user.walletBalance });
    } catch (error) {
        console.error('Error retrieving wallet balance:', error);
        logger.error('Error retrieving wallet balance:'+ error);
        const errorMessage = 'Internal Server Error';
        return res.status(500).json({ message: errorMessage });
    }
    });


router.get('/api/getkey', (req, res) => {
    return res.status(200).json({ key: process.env.KEY });
});

module.exports = router;
