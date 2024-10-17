import React from 'react';

import { useState } from "react";

import { useToast } from "@chakra-ui/react";

import { PiTargetBold } from "react-icons/pi";

import { SiGoogleanalytics } from "react-icons/si";

import { BiCustomize } from "react-icons/bi";

import { useLinkStore } from "../store/link";

const HomePage = () => {

  const [newLink, setNewLink] = useState({
    url: "",
    short: "",
  });

  const [isLinkGenerated, setIsLinkGenerated] = useState(false);

  const toast = useToast();

  const { createLink } = useLinkStore();

  // Function to generate the short link

  const generateShortLink = () => {

    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz"; // string to generate from
 
    let lenString = 5; // short link length

    let randomstring = ''; // initially set to empty

    // loop through to pick a new string each time

    for (let i = 0; i < lenString; i++) {

      let rnum = Math.floor(Math.random() * characters.length);

      randomstring += characters.substring(rnum, rnum + 1);

    }

    // return the value of the short link generated

    return randomstring;

  };

  // Function to handle adding a new link

  const handleAddLink = async () => {

    // validate that link box is not empty

    if (!newLink.url.trim()) {
    
      toast({
      
      title: "Error",
      description: "Enter all fields",
      status: "error",
      isClosable: true,
      });

      return;
      
      } 

    try {
  
      // Generate the short link when the button is clicked

      const generatedLink = generateShortLink();

      setNewLink((prev) => ({ ...prev, short: generatedLink }));

      const { success, message } = await createLink({ ...newLink, short: generatedLink });
    
    if (!success) {
    
    toast({
    
    title: "Error",
    description: message,
    status: "error",
    isClosable: true,
    });
    
    } 
    
    else {
    
    toast({

    title: "Success",
    description: message,
    status: "success",
    isClosable: true,
    });

    }

    setIsLinkGenerated(true); // Set to true after successfully saved in the db
    
    
    }

    catch (error) {

      toast.error("An error occurred while creating the link.");

    }

  };
    

  return (

    
  <>

  <section className='home-top'>
  
  <div className='container'>

    <div className='row'>

      <div className='col-lg-6 col-md-5 col-sm-12 mt-3'>

        <h3 className='h-bold'>Shrt.ng short URL & QR <br/>code generator</h3>

        <p>A short url allows you to collect so much information about your customers and their behaviour</p>

      <div id='shrt'>

        <div className="input-group">

       <input className="form-control s-round" type="text" name='url' 
       
       placeholder='Paste a link to make it short'

       value={newLink.url}
							
       onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
       
       />

       <br/>

       <input className="form-control s-round" type="text" name='short' 
      
       value={newLink.short}
							
       onChange={(e) => setNewLink({ ...newLink, short: e.target.value })}

       hidden
       
       />
            
            <div className="btn-in">
                                  
            <button type='button' className='rounded txt-btn btn btn-primary btn-sm' onClick={handleAddLink}>Short it</button>

                </div>

            </div>
        </div>
        
      </div>

      <div className='col-lg-6 col-md-7 col-sm-12'>

        <img src="/shrt.png" className='img-home'/>

        </div>

      
      </div>

    </div>

    </section>

    <section className="others mb-5">

      <div className='col-lg-6 col-md-6 col-sm-6 cen-round mx-auto shadow'>

        <div className='p-4'>

        {isLinkGenerated 

          ? <span id='show-shrt'>Your short link is : <i className='text-primary'>https://shrt.com.ng/{newLink.short}</i></span>

          : <span>One <i className='text-muted'>shrt.com.ng/link</i> infinite possibilities</span>}

        </div>
        
      </div>

      <div className='container'>

    <div className='row mt-5'>

    <h4 className='h-bold-2 text-center mb-3'>A powerful tool every one needs</h4>

    <div className='col-lg-7 col-md-7 col-sm-12 mx-auto mt-1'>

    <p className='text-muted'>A short link is a powerful marketing tool when you use it properly. It is more than a link, it is a medium between your clients amd their destination</p>

    </div>

    </div>

    </div>
    
    <div className='container'>

     <div className='row mt-3'>
      
      <div className='col-lg-4 col-md-4 col-sm-12 mt-3'>

        <div className='inner-box p-3 shadow'>

          <p className='h3'><PiTargetBold /></p>

        <p className='text-bold'>Smart Targeting</p>

        <p className='text-muted'>Target your customers to increase your reach and redirect them to a relevant

          page or a social media ad campaign.

        </p>

        </div>

        </div>

        <div className='col-lg-4 col-md-4 col-sm-12 mt-3'>

        <div className='inner-box p-3 shadow'>

          <p className='h3'><SiGoogleanalytics /></p>

        <p className='text-bold'>In-Depth Analysis</p>

        <p className='text-muted'>Share your links to your network and measure data to optimize

          your marketing campaign performance. Reach an audience that fit your needs.

        </p>

        </div>

        </div>

        <div className='col-lg-4 col-md-4 col-sm-12 mt-3'>

        <div className='inner-box p-3 shadow'>

          <p className='h3'><BiCustomize /></p>

        <p className='text-bold'>Customise Link</p>

        <p className='text-muted'>Use this powerful tool to easily customize a short link to suit your brand. 

          We let you choose how your link will look like to increase your conversion rate.
        </p>

        </div>

        </div>

        </div>

        </div>


    </section>
  
  </>




  )
}

export default HomePage