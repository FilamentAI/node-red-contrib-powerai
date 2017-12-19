IBM PowerAI Vision
------------------
 
A <a href="http://nodered.org" target="_new">Node-RED</a> that allows a flow to upload an image to be classified either using a image or object classifier. The results are sent on in the msg.payload property for further use. 


Install
-------

Run the following command in the root directory of your Node-RED install

    npm install node-red-contrib-powerai

Pre-reqs
--------

You will need have access to a PowerAI Vision server. 

Config
------

In the node configuration you will need to set as a minimum the IP / hostname where the PowerAI vision application resides, and the Dataset ID that you'd like to classify against. The optional filename property allows you to specify the file to be uploaded and classified but if this is not set it'll be assumed to be in msg.payload. Currently there is only one API to call but this may change in the future. 

Usage
-----

Using the node is simple - all you need to provide is the full path to the image you wish to upload. 
