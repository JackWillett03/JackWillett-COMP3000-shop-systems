# JackWillett-COMP3000-Shop-systems
COMP3000 project. A stock management and analysis tool for shops with inbuilt customer viewing access, website and app

### Supervisor: 
Fatma Bouabdallah 

### Trello link: 
https://trello.com/invite/b/670aa2637f28d2a4b832c90b/ATTIebff11846c176bbaf010041afc0afa162C2B8816/comp3000-backlog

### Project Vision:  

For shops who want an improved stock management and analysis system as well as improved customer interaction  

The Stock management and analysis system with customer access is a stock management and analysis system that has integrated customer interaction that allows shops to better manage stock with analysis tools suggesting product placement, whether they should increase/decrease stock of items, implement sales and allows customers to view what is currently in stock.  

Currently, from what I could discover supermarkets stock is currently tracked via a computer system and databases that removes stock from the database when scanned/bought and added when bought via staff, however that is about it. This is why I propose adding both a low level ai which will attempt to predict which products should go on sales/prices and where they could be placed in the store to increase the time people spend in the supermarket so that they may see other things that catch their interest to help maximise sales/profits. Along with this the stock tables will track multiple months so that profits/losses can be seen and visualised graphically for ease of viewing/analysing.  

As well as all this, from what I could discover no supermarket inventory management system has extensive integration with customers. This is why I propose the adding of a website/app that allows both the customer to find both the supermarket of their choice via selection and to view the stock of that supermarket and the price so that they don’t waste time going to one that does not have their desired product in stock so that they can compare the prices allowing better competition (comparing the prices can be optional for the supermarket depending on if it wants it). For the AI models I would most likely use a linear regression or random forest model, the linear regression would be more practical, but the random forest is more versatile so useful if unable to get the LR to work, this will take more research and testing when the time comes. 
   

### Risk Plan:

Unauthorised access to sensitive data (e.g. sales records) - Have data transferred under HTTPS and encrypt data at rest using SQL. 
Non compliance with data security (e.g. GDPR) - Ensure user data isn’t collected and if it is is only stored as necessary. 
Weak authentication could allow unauthorised users access – Enforce strong password policies/multi factor authentication. Limit login attempts number, different versions for staff and customers. 
Bugs and issues could lead to bad user experience – thorough testing must be implemented  
Data loss/deletion – Backups however might be extremely hard in this project where I most likely won’t have extra places to back up too 

  

### Proposed Gantt chart:
![Images/Screenshot_2024-10-12_164736.png](https://raw.githubusercontent.com/JackWillett03/JackWillett-COMP3000-shop-systems/refs/heads/main/Images/Screenshot%202024-10-12%20164736.png?token=GHSAT0AAAAAACYCDBZPZ4RYNRATBH52PIVKZYKT7VQ)
  

### Keywords:
Database, Machine learning, Application, Website, HTML, CSS, JavaScript, Python, Java, SQL, Customer interaction, management. 

  

 

 
