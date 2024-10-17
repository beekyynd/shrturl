import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLinkStore } from "../store/link";

const RedirectToTarget = () => {

  const { short } = useParams();

  const { redirectToTarget } = useLinkStore();

  const navigate = useNavigate();

	useEffect(() => {

  const link = redirectToTarget(short);

  if (link) {

    // Redirect to the target URL if found

    console.log("Happy");

  } 
  
  else {

    
    console.log("links:", "Not found");

}

}, [short, redirectToTarget, navigate]);


  return <div>Redirecting...</div>;

};

export default RedirectToTarget;
