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

//ÇALIŞMIYOR
router.post("/", md.checkAccountPayload, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    let { name, budget } = req;
    let account = {
      name: name,
      budget: budget,
    };
    let createdAccount = await accounts.create(account);
    res.json(createdAccount);
  } catch (error) {
    next(error);
  }
});

// MD CHECKACCOUNTPAYLOAD ÇALIŞMIYOR. ÇIKARINCA ÇALIŞIYOR
router.put(
  "/:id",
  md.checkAccountId,
  md.checkAccountPayload,
  async (req, res, next) => {
    // KODLAR BURAYA
    try {
      let updatedAccount = await accounts.updateById(req.params.id, {
        name: req.name,
        budget: req.budget,
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
});

module.exports = router;
