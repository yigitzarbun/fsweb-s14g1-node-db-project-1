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

const create = (account) => {
  // KODLAR BURAYA
  const newAccountIdArray = db("accounts").insert({ account });
  const newAccountId = newAccountIdArray[0];
  const createdAccount = db("accounts").where("id", newAccountId).first();
  return createdAccount;
};

const updateById = (id, account) => {
  // KODLAR BURAYA
};

const deleteById = (id) => {
  // KODLAR BURAYA
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
