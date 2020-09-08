const Company = require ('../models/company');



async function addCompany(req, res) {
    const { name, code, description } = req.body;
  
    const company = new Company({
      name,
      code,
      description
    });
    await company.save();
    return res.json(company);
  }

async function getCompany(req, res){
    const {id: code } = req.params;
    const company = await Company.findById(code);
    if (!company){
        return res.status(404).json('company not found');
    }
    return res.json(company);

}

async function getAllCompanies(req, res){
   const companies = await Company.find().exec();
   return res.json(companies);
}

async function updateCompany(req, res) {
    const { id: code } = req.params;
    const { name, description } = req.body;
    const newCompany = await Company.findByIdAndUpdate(
      code,
      { name, description },
      {
        new: true // return the updated object
        // runValidators: true // run validator against new value
      }
    );
    if (!newCompany) {
      return res.status(404).json('Company not found');
    }
    return res.json(newCompany);
  }

async function deleteCompany(req, res){
    const { id: code } = req.params;
    const company = await Company.findByIdAndDelete(code);
    if (!company) {
        return res.status(404).json('company not found');
    }
    //return res.sendStatus(204);
    return res.status(204).json(company);

}

module.exports = {
    addCompany,
    getCompany,
    getAllCompanies,
    updateCompany,
    deleteCompany
}