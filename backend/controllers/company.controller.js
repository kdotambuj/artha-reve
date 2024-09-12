import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      res.status(400).json({
        message: "Provide company name",
        success: false,
      });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "Same company already exists",
        success: true,
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompanies = async (req, res) => {
  try {
    const userId = req.id; //logged in user id (we need the company which is registered by the user)
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(400).json({
        message: "Companies not found",
        success: false,
      });
    }

    return res.status(200).json({
      message:"Companies found",
      companies,
      success:true
    })
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(400).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: false,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    // cloudinary

    const updateData = { name, description, website, location };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company updated",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
