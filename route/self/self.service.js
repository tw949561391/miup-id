const MongoPool = require('../../core/pool').MongoPool;
const ObjectId = require('mongodb').ObjectID;
const StringUtil = require('miup-utils').StringUtil;
const CommonUtil = require('util');
const log = require('../../core/log').getLogger();
const PARAMS_IDENTITY = {
    _id: 1,
    nickname: 1,
    gender: 1,
    age: 1,
    avatar: 1,
    cover: 1
};

module.exports.avatarUpload = async function avatarUpload() {

};

module.exports.coverUpload = async function coverUpload() {


};

module.exports.identityNormalUpdate = async function identityNormalUpdate(userId, profileData) {
    let db = await MongoPool.acquire();
    let updateSet = {};
    if (!StringUtil.isEmpty(profileData.nickname)) {
        updateSet.nickname = profileData.nickname;
    }
    if (!CommonUtil.isNullOrUndefined(profileData.gender)) {
        updateSet.gender = profileData.gender;
    }
    if (!CommonUtil.isNullOrUndefined(profileData.age)) {
        updateSet.age = profileData.age;
    }
    try {
        await db.collection('profile').findOneAndUpdate({_id: new ObjectId(userId)}, {$set: updateSet});
        return await db.collection('profile').findOne({_id: new ObjectId(userId)}, PARAMS_IDENTITY);
    } catch (e) {
        throw  e;
    } finally {
        MongoPool.release(db);
    }

};

/**
 * 获取用户基本数据
 * @param userId
 * @returns {Promise.<void>}
 */
module.exports.identityGetNormal = async (userId) => {
    let db = await MongoPool.acquire();
    try {
        let profiles = await db.collection('profile').findOne({'_id': new ObjectId(userId)}, PARAMS_IDENTITY);
        if (profiles) {
            return profiles;
        }
        profiles = {
            _id: new ObjectId(userId),
            nickname: '用户' + userId.substring(userId.length - 5, userId.length),
            gender: 0,
            age: 0,
            avatar: null,
            cover: null
        };
        await db.collection('profile').insertOne(profiles);
        return profiles;
    } catch (e) {
        throw  e;
    } finally {
        MongoPool.release(db);
    }
    return profiles
}

/**
 * 获取用户敏感数据
 * @type {identityGetSensitive}
 */
module.exports.identityGetSensitive = async function identityGetSensitive(userId) {


};



