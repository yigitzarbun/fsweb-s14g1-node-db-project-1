const accounts = require("./accounts-model");

exports.checkAccountPayload = async (req, res, next) => {
  // KODLAR BURAYA
  // Not: Validasyon için Yup(şu an yüklü değil!) kullanabilirsiniz veya kendiniz manuel yazabilirsiniz.
  let { name, budget } = req.body;
  try {
    if (name == null || body == null) {
      res.status(400).json({ message: "name and budget are required" });
    } else {
      req.name = name;
      req.budget = budget;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: " checkAccountPayload hata oluştu" });
  }
};

exports.checkAccountNameUnique = (req, res, next) => {
  // KODLAR BURAYA
};

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
