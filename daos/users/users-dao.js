/**
 * @file Implements DAO managing data storage of users. Uses mongoose UserModel
 * to integrate with MongoDB
 */
import UserModel from "./users-model.js";

/**
 * Retrieve all user documents from users collection
 */
export const findAllUsersWithoutMe = async (uid) =>
    UserModel.find({_id: {$ne: uid}})
        .exec();

/**
 * Retrieve single user document from users collection
 * @param {string} uid User's primary key
 */

export const findUserById = async (uid) =>
    UserModel
        .findById(uid)

/**
 * Uses UserModel to retrieve single user document from users collection
 * by their username
 * @param {string} username User's username
 */
export const findUserByUsername = async (username) =>
    UserModel.findOne({username});

/**
 * Inserts user instance into the database
 * @param user Instance to be inserted into the database
 */
export const createUser = async (user) =>
    UserModel.create(user);

/**
 * Removes user by id from the database
 * @param {string} uid Primary key of user to be removed
 */
export const deleteUser = async (uid) =>
    UserModel.deleteOne({_id: uid});

/**
 * Updates user with new values in database
 * @param {string} uid Primary key of user to be modified
 * @param user User object containing properties and their new values
 */
export const updateUser = async (uid, user) =>
    UserModel.updateOne(
        {_id: uid},
        {$set: user});

// just for test, delete user by username
export const deleteUserByUsername = async (username) =>
    UserModel.deleteMany({username: username});

// login
export const findUserByCredentials = async (username, password) =>
    UserModel.findOne({username: username, password: password});
