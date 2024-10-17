import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { useLinkStore } from "../store/link";

const RedirectToTarget = () => {

const { short } = useParams();

const { fetchLinks, Links, setLinks } = useLinkStore(); // Get fetch function, links, and a setter for links

  useEffect(() => {

    // Clear the Links before fetching new data

    setLinks([]); // Reset the state to ensure fresh data fetch

    fetchLinks().then(() => {

      console.log("Links fetched successfully.");

    }).catch((error) => {

      console.error("Error fetching links:", error);

    });

  }, [short, fetchLinks, setLinks]);

  useEffect(() => {

    // Ensure Links is an array and short is defined

    if (short && Array.isArray(Links) && Links.length > 0) {

      console.log("Searching for the short link:", short);

      // Find the link object that matches the short code

      const foundLink = Links.find(link => link.short === short);

      if (foundLink && foundLink.url) {

        console.log("Found target URL:", foundLink.url);

        let targetUrl = foundLink.url;

      if (!/^https?:\/\//i.test(targetUrl)) {

        targetUrl = `https://${targetUrl}`; // You can use https if that's preferable

      }

        window.location.href = targetUrl; // Redirect the user to the target URL
        
      } else {

        console.error("Short link not found or no target URL available for:", short);

        // Optionally, display a message or navigate to a 'not found' page

      }
    } 
    
    else {

      console.log("Short or Links are not ready yet.");

    }
  }, [short, Links]);


       return <div className='p-3'>Redirecting...</div>;

    };


export default RedirectToTarget;
