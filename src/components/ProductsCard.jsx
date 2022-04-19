import React, {useCallback, useState,useEffect} from 'react';
import {
  Card,
  TextContainer,
  RadioButton,
  Stack
} from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import axios from "axios";

export function ProductsCard() {
  const [value, setValue] = useState('Disabled');

  const handleChange = useCallback(
    (_checked, newValue) => {setValue(newValue)
      appStatussettings(newValue);
    },
    [],
  );

  const app = useAppBridge();
  // const fetch = userLoggedInFetch(app);
  
  
async function appStatussettings(status) {
    const axios_instance = axios.create();
    // Intercept all requests on this Axios instance
    axios_instance.interceptors.request.use(async function (config) {
      const token = await getSessionToken(app);
      // Append your request headers with an authenticated token
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    });
  
   const data = await axios_instance.post('/shop-admin-active-status',
    { status: status}
   )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

const getappActiveStatus = async() => { 
  const axios_instance = axios.create();
  // Intercept all requests on this Axios instance
  axios_instance.interceptors.request.use(async function (config) {
    const token = await getSessionToken(app);
    // Append your request headers with an authenticated token
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  });

 const data = await axios_instance.get('/shop-app-active-status',)
  .then(function (response) {
    console.log(response);
    if (response.data.app_status == 'Active') {
      setValue('Active');
    }else{
      setValue('Disabled')
    }
  })
  .catch(function (error) {
    console.log(error);
  });

}

  useEffect(() => {
    getappActiveStatus();
  }, []);
  

  return (
    <>
      <Card title="Welcome to Order Tracking " sectioned>
        <TextContainer spacing="loose">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            sit quae quisquam aspernatur harum accusamus architecto odio unde
            corrupti sint eligendi quo, error, porro aliquam cumque velit
            sapiente fugiat, esse voluptas adipisci officia doloribus ex?
            Suscipit in possimus enim ab recusandae illum odio, rerum
            voluptatibus voluptatem neque, blanditiis vel eveniet?
          </p>
          <Stack vertical>
            <RadioButton
              label="App are Active"
              helpText="User will be able to check out with a customer app"
              id="Active"
              name="accounts"
              checked={value === "Active"}
              onChange={handleChange}
            />
            <RadioButton
              label="App are Disabled"
              helpText="User will only be able to check out as guests."
              checked={value === "Disabled"}
              id="Disabled"
              name="accounts"
              onChange={handleChange}
            />
          </Stack>
        </TextContainer>
      </Card>
    </>
  );
}
