# JackWillett-COMP3000-Shop-systems
COMP3000 project. A stock management and analysis tool for shops with inbuilt customer viewing access via website.

### Supervisor: 
Fatma Bouabdallah 

### Deployed site link: 
https://shop-deployment-test-front.onrender.com
Owner account: Username – "Owner" , Password – "Helpme8-/" 

### Youtube Video:
https://youtu.be/PrDqjfbNtNs

### Trello backlog link: 
https://trello.com/invite/b/670aa2637f28d2a4b832c90b/ATTIebff11846c176bbaf010041afc0afa162C2B8816/comp3000-backlog 

### Project Vision:  

The Stock management and analysis with inbuilt customer access is a stock management and analysis system that has integrated customer interaction that allows shops to better manage stock with analysis tools suggesting product placement, whether sales will increase/decrease and allows customers to view what is currently in stock.  

Currently, from what I could discover supermarkets stock is currently tracked via a computer system and databases that removes stock from the database when scanned/bought and added when bought via staff as well as some other features. This is why I propose adding both a low-level AI which will attempt to predict future sales and where they could be placed in the store to increase the time people spend in the supermarket so that they may see other things that catch their interest to help maximise sales/profits. Along with this the stock tables will track multiple months so that profits/losses can be seen and visualised graphically for ease of viewing/analysing.  

As well as all this, from what I discovered no supermarket inventory management system has extensive integration with customers. This is why I propose the adding of a website/app that allows both the customer to find both the supermarket of their choice via selection and to view the stock of that supermarket and the price so that they don’t waste time going to one that does not have their desired product in stock so that they can compare the prices allowing better competition (comparing the prices can be optional for the supermarket depending on if it wants it). For the AI models I would most likely use a linear regression or random forest model, the linear regression would be more practical, but the random forest is more versatile so useful if unable to get the LR to work, this will take more research and testing when the time comes. 

### Project aims:
The aim of this project is to create a system in which the customers of a certain shop/supermarket can view the current stock of a specific shop before they go there to shop so that they do not waste time and money to buy things that are not there. This would help the shops with their customer satisfaction rating as shoppers would no longer be disappointed after walking around the shop for an hour and not finding what they were looking for or ordering online and it being out of stock.

High level staff members (e.g. managers) will also be able to access these databases and edit the content stored inside using a username and password to log in. They will be able to add, update and delete items, sales records along with shops. The database will automatically suggest placement for the items within the shop based off sales data (those items that sell more be placed further to the rear as it means customers will have to walk past other items that may catch their interest. This will all be linked to a website where the customers can access it meaning it is all one simple to use system and multiple do not have to be managed. Along with this there will be an app as well that they can download. The shops could integrate this into existing apps if they have them or use it as a base to start with. The database would also be easy to switch out as they would just have to link their database to the API instead of the one created in this project. 

### Technologies:
- Docker Desktop
- Visual Studio Code
- MongoDB Atlas
- Render
- Android Studio
- React
- Recharts
- Express
- Mongoose
- Bcrypt
- JsonWebToken
- Cors
- Dotenv
- WebSockets
- Mocha
- Chai

### Similar projects

![image](https://github.com/user-attachments/assets/6dd71624-43d8-4ef1-a356-0b8ef031fcfa)

### Conclusions
In conclusion, this project successfully achieved the majority of its main goals while also including additional features beyond the original planned ones. A full stack web application was developed to efficiently track shop sales, data, staff and other details. The implementation of Websockets enabled real time updates, ensuring that changes to stock and sales and the shops that are on show were immediately reflected across the entire system for anyone viewing it. Additionally, Render was used for deployment, providing a simple and scalable hosting solution that allows for easy maintenance in future updates. 

Despite these accomplishments, some challenges arose during development, particularly during time management, balancing this project alongside other coursework limited the time available to develop certain features, most notably the mobile app, which ended up being scrapped. However, this also led to the prioritisation of core functionality and as a result, some additional smaller features are integrated to make it better for users. I faced technical challenges and issues with websockets, due to limited resources and nonfunctioning code where it had been taught prior, though through my own research, I finally found a working solution. 

Looking to the future, there are multiple areas where this project could be expanded and improved. One improvement would be the development of the mobile application that was originally planned, which would make it easier for customers to use in a short amount of time. On the customer side, new features such as the ability to place orders directly through the site or the app could be introduced offering a way to shop from home and for the staff, the stock updating system could be further refined by implementing barcode scanning for inventory management, reducing the amount of manual input that needs to be done. Additionally, a more advanced machine learning model could be used for the sales prediction to make it more accurate as linear regression is rather flawed. 

Overall, this project met its primary goals and demonstrated web development technologies in building a scalable, interactive and user-friendly application, while some features remain for future development due to time limitation, the system has been designed in a way that allows for future expansion in an easy way. 



  

 

 
