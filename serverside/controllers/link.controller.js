import mongoose from "mongoose";

import Link from "../models/link.model.js";

export const getLinks = async (req, res) => {

	try {

		const links = await Link.find({});

		res.status(200).json({ 
            
            success: true, 
            
            data: links });

	} 
    
    catch (error) {
        
		console.log("error in fetching links:", error.message);

		res.status(500).json({ 
            
            success: false, 
            
            message: "Server Error" });
	}
};

export const createLink = async (req, res) => {

	const link = req.body; // user will send this data

	if (!link.url) {

		return res.status(400).json({ 
            
            success: false, 
            
            message: "Please provide all fields" });
	}

	const newLink = new Link(link);

	try {

		await newLink.save();

		res.status(201).json({ 
            
            success: true, 
            
            data: newLink });

	} 
    
    catch (error) {

		console.error("Error in Creating Short Link:", error.message);

		res.status(500).json({ 
            
            success: false, 
            
            message: "Server Error" });
	}
};


export const updateLink = async (req, res) => {

	const { id } = req.params;

	const link = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {

		return res.status(404).json({ 
            
            success: false, 
            
            message: "Invalid Link Id" });

	}

	try {

		const updatedLink = await Link.findByIdAndUpdate(id, link, { new: true });

		res.status(200).json({ 
            
            success: true, 
            
            data: updatedLink });

	} 
    
    catch (error) {

		res.status(500).json({ 
            
            success: false, 
            
            message: "Server Error" });
	}
};

export const deleteLink = async (req, res) => {

	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {

		return res.status(404).json({ 
            
            success: false, 
            
            message: "Invalid Product Id" });

	}

	try {

		await Link.findByIdAndDelete(id);

		res.status(200).json({ 
            
            success: true, 
            
            message: "Link deleted" });

	} 
    
    catch (error) {

		console.log("error in deleting Link:", error.message);

		res.status(500).json({ 
            
            success: false, 
            
            message: "Server Error" });
	}
};

export const redirectToTarget = async (req, res) => {

    const { short } = req.params;
  
    try {

      // Find the link by its short identifier

      const link = await Link.findOne({ short });

      if (!link) {

        return res.status(404).json({ error: "URL not found" });

      }
  
      let targetUrl = link.url;

      if (!/^https?:\/\//i.test(targetUrl)) {

        targetUrl = `https://${targetUrl}`; // You can use https if that's preferable

      }

      // Redirect the user to the absolute target URL

      return res.redirect(targetUrl);
   
      } 
      
    
    catch (error) {

      console.error("Error in redirecting:", error);

      return res.status(500).json({ 
        
        success: false, 
        
        message: "Server error." });
    }
  };