from flask import Flask,render_template,jsonify,request,abort
import flask
import sqlite3
import os
import requests
import json
import ast
import pandas as pd
import numpy as np
from dataFn import *
from sklearn.svm import SVC
from flask_cors import CORS

# apis required
#   1   - add user(signup)
#   2   - delete user(deactivate)
#   3   - validate user(login)
#   4   - predict loan approval
#   5   - query db
#   6   - graphs
#   7   - clear db/reset db


app = Flask(__name__)
# CORS(app)

df = fix_df()
(X_train,Y_train,X_test,Y_test)=split_df(df)
db='loan.db'
model = SVC(kernel='rbf')



@app.before_first_request
def setup():
    print("setup")
    global X_train
    global Y_train
    global db
    global model

    try:
        os.system("rm "+db)
    except:
        pass
    mydb = sqlite3.connect(db)

    #create tables
    mydb.execute("CREATE TABLE users (uname VARCHAR(255),pswd VARCHAR(40))")
    mydb.execute("CREATE TABLE loans (Loan_ID VARCHAR(8),Gender VARCHAR(6),Married BOOLEAN,Dependents INTEGER,Education BOOLEAN,Self_Employed BOOLEAN,ApplicantIncome INTEGER, CoapplicantIncome INTEGER,LoanAmount INTEGER,Loan_Amount_Term INTEGER,Credit_History BOOLEAN,Property_Area VARCHAR(20),Loan_Status BOOLEAN)")
    mydb.commit()

    #populate table with initial dataset
    x = requests.post("http://localhost:5000/db/reset")

    # train model
    model.fit(X_train, Y_train)

@app.route("/user/add",methods=["PUT"])
def addUser():
    uname = request.get_json()["username"]
    pswd = request.get_json()["password"]
    cpswd = request.get_json()["confirm password"]
    users = []
    obj = {
        "columns": "uname,pswd",
        "where": "uname='"+uname+"'",
        "table": "users"
    }
    obj = json.dumps(obj) 
    obj = json.loads(obj)

    # send request to db api
    x = requests.post("http://localhost:5000/db/read", json=obj)

    users = ast.literal_eval(x.text)
    if(len(users) != 0):
        return abort(400)
    else:
        if(pswd!=cpswd):
            return abort(400)
        
        obj = {
            "operation": "insert",
            "column": "(uname,pswd)",
            "insert": "['"+uname+"','"+pswd+"']",
            "table": "users"
        }
        obj = json.dumps(obj)  # stringified json
        obj = json.loads(obj)  # content-type:application/json
        # send request to db api
        x = requests.post("http://localhost:5000/db/write", json=obj)
        return (jsonify({}), 201)

@app.route("/user/<username>",methods=["DELETE"])
def delUser(username):
    obj = {
        "columns": "uname,pswd",
        "where": "uname='"+username+"'",
        "table": "users"
    }
    obj = json.dumps(obj)  # stringified json
    obj = json.loads(obj)  # content-type:application/json
    # send request to db api
    x = requests.post("http://localhost:5000/db/read", json=obj)
    print(x.text)
    users = ast.literal_eval(x.text)

    if(len(users) == 0):
        return abort(400)
    else:
        obj = {
            "operation": "delete",
            "column": "uname",
            "insert": "'"+username+"'",
            "table": "users"
        }
        obj = json.dumps(obj)  # stringified json
        obj = json.loads(obj)  # content-type:application/json
        # send request to db api
        x = requests.post("http://localhost:5000/db/write", json=obj)
        return (jsonify({}), 200)

@app.route("/user/login",methods=["POST"])
def login():
    print("login")
    uname = request.get_json()["username"]
    pswd = request.get_json()["password"]

    obj = {
        "columns": "uname,pswd",
        "where": "uname='"+uname+"' AND pswd='"+pswd+"'",
        "table": "users"
    }
    obj = json.dumps(obj)  # stringified json
    obj = json.loads(obj)  # content-type:application/json
    # send request to db api
    x = requests.post("http://localhost:5000/db/read", json=obj)
    print(x.text)
    users = ast.literal_eval(x.text)

    if(len(users) == 0):
        return abort(400)
    else:
        return(jsonify({}),200)

# ----------------- tested

@app.route("/loan/predict",methods=["POST"])
def predict():
    global model
    gender = request.get_json()["gender"]
    dependents = request.get_json()["dependents"]
    education = request.get_json()["education"]
    selfEmployed = request.get_json()["self employed"]
    appInc = request.get_json()["applicant income"]
    cappInc = request.get_json()["coapplicant income"]
    loanAmt = request.get_json()["loan amount"]
    loanTerm = request.get_json()["loan term"]
    credHist = request.get_json()["credit history"]
    propAr = request.get_json()["property area"]

    data = [[gender,dependents,education,selfEmployed,appInc,cappInc,loanAmt,loanTerm,credHist,propAr]]

    res = model.predict(data)
    return (res[0],200)
    

@app.route("/loan/query",methods=["POST"])
def query():
    # filter based on 
    #       loanId - T
    #       gender - D
    #       dependents - D
    #       education - D
    #       selfEmployed - D
    #       applicantIncome - T (2 for range) or D with ranges
    #       coapplicantIncome - same
    #       loan amount - same
    #       loan term - D
    #       credit history - D
    #       property area - D
    #       approval - D
    # T is textbox D is dropdown
    # offer no filter also as option for each
    cols = ["gender","married","dependents","education","self employed","applicant income","coapplicant income","loan amount","loan term","credit history","property area","approval"]
    data = []
    gender = request.get_json()[cols[0]]
    married = request.get_json()[cols[1]]
    dependents = request.get_json()[cols[2]]
    education = request.get_json()[cols[3]]
    selfEmployed = request.get_json()[cols[4]]
    appInc = request.get_json()[cols[5]]
    cappInc = request.get_json()[cols[6]]
    loanAmt = request.get_json()[cols[7]]
    loanTerm = request.get_json()[cols[8]]
    credHist = request.get_json()[cols[9]]
    propAr = request.get_json()[cols[10]]
    status = request.get_json()[cols[11]]

    # appInc > 4000 and <6000 or 
    where=''
    flag=0
    if(gender!=''):
        where+="Gender=" + gender
        flag=1
    if(education!=''):
        if(flag==1):
            where+=' AND'
        flag=1
        where+=' Married='+married
    if(len(dependents)!=0):
        if(flag==1):
            where+=' AND'
        flag=1
        where+=' Dependents in '+dependents
    if(education!=''):
        if(flag==1):
            where+=' AND'
        flag=1
        where+=' Education='+education
    if(selfEmployed!=''):
        if(flag==1):
            where+=' AND'
        flag=1
        where+=' Self_Employed='+selfEmployed
    if(len(appInc)!=0):
        if(flag==1):
            where+=' AND'
        flag=1
        where+='(ApplicantIncome BETWEEN '+appInc[0]+'AND '+appInc[1]+')'
    if(len(cappInc)!=0):
        if(flag==1):
            where+=' AND'
        flag=1
        where+='(CoapplicantIncome BETWEEN '+cappInc[0]+'AND '+cappInc[1]+')'
    if(len(loanAmt)!=0):
        if(flag==1):
            where+=' AND'
        flag=1
        where+='(LoanAmount BETWEEN '+loanAmt[0]+'AND '+loanAmt[1]+')'
    if(len(loanTerm)!=0):
        if(flag==1):
            where+=' AND'
        flag=1
        where+='(Loan_Amount_Term BETWEEN '+loanTerm[0]+'AND '+loanTerm[1]+')'
    if(credHist!=''):
        if(flag==1):
            where+=' AND'
        flag=1
        where+=' Credit_History='+credHist
    if(propAr!=''):
        if(flag==1):
            where+=' AND'
        flag=1
        where+=' Property_Area='+propAr
    if(status!=''):
        if(flag==1):
            where+=' AND'
        flag=1
        where+=' Loan_Status='+status

    obj = {
        "columns": "*",
        "where": where,
        "table": "loans"
    }
    obj = json.dumps(obj)  # stringified json
    obj = json.loads(obj)  # content-type:application/json
    # send request to db api
    x = requests.post("http://localhost:5000/db/read", json=obj)
    print(x.text)
    users = ast.literal_eval(x.text)

    return(jsonify(users),200)
    

@app.route("/loan/graph",methods=["POST"])
def graph():
    # I thought we could just make a couple of graphs and just show it
    # it should refresh by itself every 30 mins or so but to demonstrate we can make that 5 mins
    # About 4 graphs should be enough
    # 1) gender vs approval - combined bar chart
    # 2) no of dependents vs approval - 
    # 3) education vs aproval
    # 4) selfEmployment vs approval
    # 5) income vs approval - combine bargraphs
    # 6) similar stuff
    # I will try on tableau
    pass

@app.route("/db/write", methods=["POST"])
def insert():
    mydb = sqlite3.connect(db)
    op = request.get_json()["operation"]
    column = request.get_json()["column"]
    insert = request.get_json()["insert"]
    table = request.get_json()["table"]
    query = ''
    if(op == "insert"):
        query += 'INSERT INTO ' + table+' '+column+' VALUES ('
        insert = insert[1:len(insert)-1]
        insert = insert.split(",")
        # insert = list(map(lambda x:str(x),insert))
        for i in range(len(insert)):
            if(i != 0):
                query += ","
            query += insert[i]
        query += ")"

    else:
        query += 'DELETE FROM '+table+' WHERE ('
        column = column.split(",")
        insert = insert.split(",")
        if(len(column) != len(insert)):
            abort(400)
        for i in range(len(column)):
            if(i != 0):
                query += 'AND'
            query += column[i]+'='+insert[i]
        query += ")"
    print(query)
    query = query+";"
    mydb.execute(query)
    mydb.commit()
    mydb.close()
    return ("{}", 200)

# -------------------------------------------------5 Read fron DB-------------------------------------------------
# Read into a DB
@app.route("/db/read", methods=["POST"])
def read():
    mydb = sqlite3.connect(db)

    query = 'SELECT '
    columns = request.get_json()["columns"]
    where = request.get_json()["where"]
    table = request.get_json()["table"]
    try:
        distinct = request.get_json()["distinct"]
        query+='DISTINCT '
    except:
        distinct = '0'
    '''
    Made the read a little more flexible with respect to where conditions and select * condition
    '''
    if len(columns) != 1:
        for col in columns.split(','):
            query += col+','
        query = query[0:-1]
    else:
        query = 'SELECT '+columns
    if where != '':
        query = query+' FROM '+table+' WHERE ('
        where = where.split(",")
        for i in range(len(where)):
            if(i != 0):
                query += ' AND '
            query += where[i]
        query += ")"
    else:
        query = query+' FROM '+table
    print(query)
    query = query+";"
    s=mydb.execute(query)
    
    res = []
    for row in s:
        res.append(row)
    mydb.close()
    return (jsonify(res), 200)

@app.route("/db/reset",methods=["POST"])
def resetDB():
    global db
    mydb = sqlite3.connect(db)

    #create tables
    # mydb.execute("CREATE TABLE users (uname VARCHAR(255),pswd VARCHAR(40))")
    # mydb.execute("CREATE TABLE loans (Loan_ID VARCHAR(8),Gender VARCHAR(6),Married BOOLEAN,Dependents INTEGER,Education BOOLEAN,Self_Employed BOOLEAN,ApplicantIncome INTEGER, CoapplicantIncome INTEGER,LoanAmount INTEGER,Loan_Amount_Term INTEGER,Credit_History BOOLEAN,Property_Area VARCHAR(20),Loan_Status BOOLEAN)")
    # mydb.commit()
    query = 'SELECT name FROM sqlite_master WHERE type="table"'
    mydb.execute(query)
    s = mydb.fetchall()
    for table in s:
        # print(table[0])
        query = "DELETE FROM "+table[0]
        mydb.execute(query)
        mydb.commit()

    global X_train
    global Y_train

    for index,row in X_train.iterrows():
        query = "INSERT INTO loans ('Gender', 'Married', 'Dependents', 'Education', 'Self_Employed',\
            'ApplicantIncome', 'CoapplicantIncome', 'LoanAmount','Loan_Amount_Term', 'Credit_History',\
                 'Property_Area') VALUES ("
        
        for i in range(len(row)):
            if(i!=0):
                query+=','
            query+= str(row[i])
        query+=")"

        mydb.execute(query)
        mydb.coomit()

    for val in Y_train.values:
        query = "INSERT INTO loans ('Loan_Status') VALUES ("+str(val)+")"
        mydb.execute(query)
        mydb.commit()

if __name__=='__main__':
    app.debug=True
    app.run()