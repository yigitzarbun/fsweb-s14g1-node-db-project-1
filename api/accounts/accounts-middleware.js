const accounts = require("./accounts-model");
const yup = require("yup");

const accountsSchema = yup.object().shape({
  name: yup
    .string("name and budget are required")
    .required("name and budget are required")
    .min(3, "name of account must be between 3 and 100")
    .max(100, "name of account must be between 3 and 100"),
  budget: yup
    .number("budget of account must be a number")
    .required("name and budget are required")
    .min(0, "budget of account is too large or too small")
    .max(1000000, "budget of account is too large or too small"),
});

/*
exports.checkAccountPayload = (req, res, next) => {
  // KODLAR BURAYA
  // Not: Validasyon için Yup(şu an yüklü değil!) kullanabilirsiniz veya kendiniz manuel yazabilirsiniz.
  let { name, budget } = req.body;
  try {
    if (!name || !budget) {
      res.status(400).json({ message: "name and budget are required" });
    } else if (name.length < 3 || name.length > 100) {
      res
        .status(400)
        .json({ message: "name of account must be between 3 and 100" });
    } else if (budget < 0 || budget > 1000000) {
      res
        .status(400)
        .json({ message: "budget of account is too large or too small" });
    } else {
      req.name = name;
      req.budget = budget;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: " checkAccountPayload hata oluştu" });
  }
};
*/
exports.checkAccountPayload = async (req, res, next) => {
  // KODLAR BURAYA
  // Not: Validasyon için Yup(şu an yüklü değil!) kullanabilirsiniz veya kendiniz manuel yazabilirsiniz.
  try {
    if (req.body && req.body.name) {
      req.body.name = req.body.name.trim();
    }
    await accountsSchema.validate(req.body);
    req.account = req.body;
  } catch (error) {
    res.status(400).json({ message: error.message || "Hata oluştu" });
  }
  next();
};

exports.checkAccountNameUnique = async (req, res, next) => {
  // KODLAR BURAYA
  try {
    if (req.body && req.body.name) {
      req.body.name = req.body.name.trim();
    }
    await accountsSchema.validate(req.body);
    let allAccounts = await accounts.getAll();
    let isFound = false;
    for (let i = 0; i < allAccounts.length; i++) {
      if (allAccounts[i].name == req.body.name) {
        isFound = true;
        break;
      }
    }
    if (isFound) {
      res.status(400).json({ message: "that name is taken" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message || "Hata oluştu" });
  }
  next();
};

/*
exports.checkAccountId = async (req, res, next) => {
  // KODLAR BURAYA
  let { id } = req.params;
  try {
    let selectedAccount = await accounts.getById(id);
    if (!selectedAccount) {
      res.status(404).json({ message: "account not found" });
    } else {
      req.account = selectedAccount;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "hata oluştu" });
  }
};
*/
exports.checkAccountId = async (req, res, next) => {
  try {
    let isExist = await accounts.getById(req.params.id);
    if (!isExist) {
      res.status(404).json({ message: "account not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "checkAccountId has error" });
  }
  next();
};
