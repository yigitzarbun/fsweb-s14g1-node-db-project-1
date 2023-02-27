const express = require("express");
const router = require("express").Router();
const accounts = require("./accounts-model");
const md = require("./accounts-middleware");

router.get("/", (req, res, next) => {
  // KODLAR BURAYA
  accounts
    .getAll()
    .then((accounts) => res.status(200).json(accounts))
    .catch((err) => res.status(500).json({ message: "hata oluştu" }));
});

router.get("/:id", md.checkAccountId, (req, res, next) => {
  // KODLAR BURAYA
  res.status(200).json(req.account);
});

router.post("/", md.checkAccountPayload, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    let { name, budget } = req;
    let account = {
      name: name,
      budget: budget,
    };
    let createdAccount = accounts.create(account);
    res.json(createdAccount);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", (req, res, next) => {
  // KODLAR BURAYA
});

router.delete("/:id", (req, res, next) => {
  // KODLAR BURAYA
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // KODLAR BURAYA
});

module.exports = router;
