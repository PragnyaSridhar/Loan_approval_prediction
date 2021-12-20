# Loan Approval Prediction
## Web Technologies II Course Project
Loan eligibility is important for banks to determine if a loan applicant can be granted the loan. Several parameters could help make this decision and automating this process enables the bank to do this more effectively. The following user details are collected - Gender, Marital Status, Dependents, Education, Self Employed, Applicant Income, Co-Applicant Income, Loan Amount, Loan Term, Credit History, Property Area and subsequently a Support Vector Classifier has been trained to predict whether the loan will be approved. An accuracy of 86% was obtained with 100% sensitivity and 78% specificity.

### Implementation details:
##### Tech Stack:
Front End - React and Materialize CSS
Backend - Flask application (Python)
Database - SQLite
Ajax patterns (Multistage and Periodic refresh), REST APIs
Setting Cookies

##### Web Technologies Concepts Used
Asynchronous XHR calls for form submissions (Queries and Prediction) and loading pages
Multistage download to load and display graphs on dashboard
Periodic refresh to update query page if database is updated
CORS Handling
REST APIs to handle and serve frontend requests

##### Model details
**Dataset** - Dream Housing Finance company dataset
**Model** - Support Vector Classifier (Sklearn)
