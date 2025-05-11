const User = require("../models/AuthSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const Singup = async (req, res) => {
//     let { username, email, password } = req.body;
//     if (!username || !email || !password) {
//         res.status(401).json({ error: "all fields are requried" });
//     }

//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             res.status(409).json({ error: "User already registered with this email" });
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new User({ username, email, password: hashedPassword });
//         await user.save()


//         res.status(201).json({ message: "User Created successfuly",} );
//     } catch (error) {
//          res.status(500).json({ error: "Error Creating User", message: error});
//     }
// }

const Singup = async (req, res) => {
    let { username, email, password } = req.body;
    const profileImage = req.file ? req.file.filename : "default.png";

    if (!username || !email || !password) {
        return res.status(401).json({ error: "all fields are required" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "User already registered with this email" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword,
            profileImage
        });

        await user.save();

        res.status(201).json({ message: "User Created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error Creating User", message: error });
    }
}



const Login = async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password) {
        return res.status(401).json({ error: "all fields are requried" });
    }

    try {
        const user = await User.findOne({ email });


        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, "shazimjwtsecretkey")
        console.log(token);

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage
            },
            token
        });


    } catch (error) {
        return res.status(500).json({ error: "Login failed", message: error });
    }


}


module.exports = {
    Singup,
    Login
}