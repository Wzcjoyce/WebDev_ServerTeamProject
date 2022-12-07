import * as userDao from "../../daos/users/users-dao.js";

import bcrypt from 'bcrypt';

const saltRounds = 10;

const AuthenticationController = (app) => {
    //sign up
    const signup = async (req, res) => {
        const newUser = req.body;
        const password = newUser.password;
        //encrypt password for storing in database
        newUser.password = await bcrypt.hash(password, saltRounds);

        const existingUser = await userDao
            .findUserByUsername(req.body.username);
        //verify unique username
        if (existingUser) {
            res.sendStatus(403);
        } else {
            const insertedUser = await userDao
                .createUser(newUser);
            // for security, return empty password back
            insertedUser.password = '';
            // @ts-ignore
            req.session['profile'] = insertedUser;
            res.json(insertedUser);
        }
    }

    //user login
    const login = async (req, res) => {
        const user = req.body;
        const username = user.username;
        const password = user.password;
        const existingUser = await userDao.findUserByUsername(username);

        // username doesn't exist
        if (!existingUser) {
            res.sendStatus(403);
        } else {
            // use bcrypt to decrypt the password stored in database,
            // then compare with password passing from front-end
            const match = await bcrypt.compare(password, existingUser.password);
            if (match) {
                existingUser.password = '*****';
                // @ts-ignore
                req.session['profile'] = existingUser;
                res.json(existingUser);
            } else {
                res.sendStatus(403);
            }
        }
    }

    //return the content of profile property in session
    const profile = (req, res) => {
        // @ts-ignore
        const profile = req.session['profile'];
        if (profile) {
            res.json(profile);
        } else {
            res.json({});
        }
    }

    //user logout, destroy session and release server-side memory
    const logout = (req, res) => {
        // @ts-ignore
        req.session.destroy();
        res.sendStatus(200);
    }

    // just for test, delete user by username
    const deleteUserByUsername = (req, res) =>
        userDao.deleteUserByUsername(req.params.username)
            .then(status => res.send(status));

    // request mapping paths
    app.post("/api/auth/signup", signup);
    app.post("/api/auth/login", login);
    app.post("/api/auth/profile", profile);
    app.post("/api/auth/logout", logout);
    app.delete("/api/auth/username/:username", deleteUserByUsername);
}

export default AuthenticationController;
