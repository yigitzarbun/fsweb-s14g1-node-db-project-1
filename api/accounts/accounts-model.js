const db = require("./../../data/db-config");

const getAll = () => {
  // KODLAR BURAYA
  const accounts = db.select("*").from("accounts");
  return accounts;
};

const getById = (id) => {
  // KODLAR BURAYA
  const account = db("accounts").where("id", id).first();
  return account;
};

//ÇALIŞMIYOR
const create = (account) => {
  // KODLAR BURAYA
  const newAccountIdArray = db("accounts").insert({
    name: account.name,
    budget: account.budget,
  });
  const newAccountId = newAccountIdArray[0];
  const createdAccount = db("accounts").where("id", newAccountId).first();
  return createdAccount;
};

const updateById = (id, account) => {
  // KODLAR BURAYA
  return db("accounts")
    .where("id", id)
    .update(account)
    .then((count) => (count > 0 ? getById(id) : null));
};

const deleteById = (id) => {
  // KODLAR BURAYA
  return db("accounts")
    .where("id", id)
    .delete()
    .then((count) => (count > 0 ? getById(id) : null));
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
