import assert from 'assert';
import crypto from 'crypto';
import { userModel } from '../../models';

// import { md5Hash } from '../../services';

function md5Hash(data) {
  return crypto.createHash('md5').update(data).digest('hex');
}

export var users = [
  {
    user_id: '12454561', username: '蔡国杨', password: '12454561'
  },
  {
    user_id: '12453561', username: '潘茂林', password: '12453561'
  },
  {
    user_id: '32453561', username: '余阳', password: '32453561'
  },
  {
    user_id: '12450561', username: '衣杨', password: '12450561'
  },
  {
    user_id: '12459961', username: '郑贵锋', password: '12459961'
  },
  {
    user_id: '33453561', username: '万海', password: '33453561'
  },
  {
    user_id: '42453561', username: '王青', password: '42453561'
  },
  {
    user_id: '12473561', username: '沈鸿', password: '12473561'
  },
  {
    user_id: 'admin', username: '管理员', password: 'admin'
  }
];

export async function userModelTest1() {


  for (let user of users) {
    user.password = md5Hash(user.password)
    try {
      await userModel.createUser(user);
    } catch (err) {
      // console.log(err);
    }
  }

  for (let user of users) {
    await userModel.getUserByUserId(user.user_id, md5Hash(user.password));
  }

  for (let user of users) {
    await userModel.changePassword('123456789', user.user_id, md5Hash(user.password));
  }

  for (let user of users) {
    await userModel.getUserByUserId(user.user_id, '123456789');
  }

  await userModel.deleteAllUsers();

  for (let user of users) {
    await userModel.createUser(user);
  }

  await userModel.getAllUsersList();

  for (let user of users) {
    await userModel.getUsernameByUserID(user.user_id);
  }

  // for (let user of users) {
  //   assert.deepEqual((await userModel.deleteUser(user.user_id)).affectedRows, 1);
  // }

}

export async function userModelTest() {


  for (let user of users) {
    user.password = md5Hash(user.password);
    assert.deepEqual((await userModel.createUser(user)).affectedRows, 1);
  }

  for (let user of users) {
    // console.log(await userModel.getUserByUserId(user.user_id, md5Hash(user.password)));
    // console.log('??????')
    // assert.deepEqual((await userModel.getUserByUserId(user.user_id, md5Hash(user.password)))[0].user_id, user.user_id);
  }

  // for (let user of users) {
  //   assert.deepEqual((await userModel.changePassword(md5Hash('123456789'), user.user_id, md5Hash(user.password))).affectedRows, 1);
  // }

  // for (let user of users) {
  //   assert.deepEqual((await userModel.getUserByUserId(user.user_id, md5Hash('123456789')))[0].user_id, user.user_id);
  // }

  // assert.deepEqual((await userModel.deleteAllUsers()).affectedRows, users.length);

  // for (let user of users) {
  //   assert.deepEqual((await userModel.createUser(user)).affectedRows, 1);
  // }

  // assert.deepEqual((await userModel.getAllUsersList()).length, users.length);

  // for (let user of users) {
  //   assert.deepEqual((await userModel.getUsernameByUserID(user.user_id))[0].username, user.username);
  // }

  // for (let user of users) {
  //   assert.deepEqual((await userModel.deleteUser(user.user_id)).affectedRows, 1);
  // }

}
