var fs = require("fs");
var request = require("request");

module.exports = function(RED) {
    
    function PowerAIVision(config) {

        RED.nodes.createNode(this,config);
        var node = this;

        node.on('input', function(msg) {
            
            var _this = this;

            if ( config.host == null ) { 
                this.status({fill:"red",shape:"dot",text:"Host name not set."});
                node.send(msg);
            } else if ( config.api == null ) { 
                this.status({fill:"red",shape:"dot",text:"API not selected."});
                node.send(msg);
            } else if ( config.dataset == null ) { 
                this.status({fill:"red",shape:"dot",text:"Dataset not provided."});
                node.send(msg);
            } else { 
            
                var apiURL = "http://" + config.host + config.api + config.dataset;
                var filePath = "";
                
                if ( config.filename != null ) { 
                    filePath = config.filename;
                } else { 
                    filePath = msg.payload;
                }
                
                var options = { 
                    method: 'POST',
                    url: apiURL,
                    headers: 
                    { 
                        connection: 'keep-alive',
                        cookie: 'JSESSIONID=ntv9z81hkfdd1r1tbdawlzwby',
                        'cache-control': 'no-cache',
                        accept: '*/*',
                        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
                        'accept-language': 'en,en-US;q=0.9',
                        'accept-encoding': 'gzip, deflate',
                        origin: "http://" + config.host,
                        pragma: 'no-cache',
                        'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
                        formData: { 
                            files: { 
                                value: fs.createReadStream(filePath),
                                options: { 
                                    filename: 'P1050934.JPG', 
                                    contentType: null 
                                } 
                            },
                            dataset_id: config.dataset
                        } 
                    };

                this.status({fill:"green",shape:"dot",text:"Requesting..."});
                
                request(options, function (error, response, body) {
                    if (error) throw new Error(error);
                    _this.status({fill:"green",shape:"dot",text:"Request complete."});
                    var resp = { 
                        filename : filePath,
                        payload : JSON.parse(body)
                    }
                    node.send(resp);
                });
                
            }
            
        });
        
    }
    
    RED.nodes.registerType("powerai",PowerAIVision);
    
}






