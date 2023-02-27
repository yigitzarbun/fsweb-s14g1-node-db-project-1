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

router.get("/:id", md.checkAccountId, async (req, res, next) => {
  // KODLAR BURAYA
  const account = await accounts.getById(req.params.id);
  res.status(200).json(account);
});

router.post(
  "/",
  md.checkAccountPayload,
  md.checkAccountNameUnique,
  async (req, res, next) => {
    // KODLAR BURAYA
    try {
      // let { name, budget } = req.account;
      let account = {
        name: req.body.name,
        budget: req.body.budget,
      };
      let createdAccount = await accounts.create(account);
      res.status(201).json(createdAccount);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  md.checkAccountId,
  md.checkAccountPayload,
  async (req, res, next) => {
    // KODLAR BURAYA
    try {
      let updatedAccount = await accounts.updateById(req.params.id, {
        name: req.body.name,
        budget: req.body.budget,
      });

      res.json(updatedAccount);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", md.checkAccountId, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    const deletedAccount = await accounts.deleteById(req.params.id);
    res.status(200).json(req.account);
  } catch (error) {
    res.json(error);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // KODLAR BURAYA
  res.status(err.status || 400).json({
    customMessage: "bir hata oluştu",
    message: err.message,
  });
});

module.exports = router;
