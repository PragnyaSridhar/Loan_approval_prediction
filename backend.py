from flask import Flask,render_template,jsonify,request,abort,send_file
from flask_cors import CORS
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
import pickle


# apis required
#   1   - add user(signup)
#   2   - delete user(deactivate)
#   3   - validate user(login)
#   4   - predict loan approval
#   5   - query db
#   6   - graphs
#   7   - clear db/reset db


app = Flask(__name__)
CORS(app)

df = fix_df()
(X_train,Y_train,X_test,Y_test)=split_df(df)
db='loan.db'
model = SVC(kernel='rbf')

print("setup")
# global X_train
# global Y_train
# global db
# global model

colList={1:["Gender",("Male","Female")],2:["Married",("No","Yes")],3:["Dependents",("0","1","2","3+")],\
         4:["Education",("Not Graduate","Graduate")],5:["Self_Employed",("No","Yes")],
            6:["Credit_History",("No","Yes")],7:["Property_Area",("Urban","Rural","Semi-urban")]}

try:
    os.system("rm "+db)
except:
    pass
mydb = sqlite3.connect(db)

#create tables
mydb.execute("CREATE TABLE users (uname VARCHAR(255),pswd VARCHAR(40))")
mydb.execute("CREATE TABLE loans (Gender VARCHAR(6),Married BOOLEAN,Dependents INTEGER,Education BOOLEAN,Self_Employed BOOLEAN,ApplicantIncome INTEGER, CoapplicantIncome INTEGER,LoanAmount INTEGER,Loan_Amount_Term INTEGER,Credit_History BOOLEAN,Property_Area VARCHAR(20),Loan_Status BOOLEAN)")
mydb.commit()

#populate table with initial dataset
i=0
y = Y_train.values
for index,row in X_train.iterrows():
    query = "INSERT INTO loans ('Gender', 'Married', 'Dependents', 'Education', 'Self_Employed',\
        'ApplicantIncome', 'CoapplicantIncome', 'LoanAmount','Loan_Amount_Term', 'Credit_History',\
                'Property_Area','Loan_Status') VALUES ("
    
    for i in range(len(row)):
        if(i!=0):
            query+=','
        query+= str(row[i])
        # print(row)
    query+=","+str(y[i])
    i+=1
    query+=")"
    mydb.execute(query)
    mydb.commit()

# for val in Y_train.values:
#     query = "INSERT INTO loans ('Loan_Status') VALUES ("+str(val)+")"
#     mydb.execute(query)
#     mydb.commit()

# qu = "SELECT * FROM loans;"
# s = mydb.execute(qu)
# for row in s:
#     print(row)
# qu = "SELECT * FROM loans;"

# print("****************************************************************************")
# print(qu)

# s=mydb.execute(qu)
    
# res = []
# for row in s:
#     res.append(row)
# mydb.close()
# print(res)


f=open("test.txt","w")
ls=Y_test.values
ind=0

for index,row in X_test.iterrows():
    query=''
    for i in range(len(row)):
        if(i!=0):
            query+=','
        query+= str(row[i])
    query+=','+str(ls[ind])+"\n"
    ind+=1
    f.write(query)
f.close()
    
    
mydb.close()
# train model
model.fit(X_train, Y_train)
# with open("model.pickle", "r+b") as f:
#     model = pickle.load(f)
print("training done")

for i in range(4,8):
    fn=str(i)+".png"
    try:
        os.system("rm "+fn)
    except:
        pass
    plot_bar(X_train,Y_train,i,0.2,colList)
print("graphs done")

# plot_bar(X_train,Y_train,1,0.2,colList)
# plot_bar(X_train,Y_train,2,0.2,colList)
# plot_bar(X_train,Y_train,3,0.2,colList)
# print("graphs done")

def make_str(ar):
    res="("
    for a in range(len(ar)):
        if(a!=0):
            res=res+","
        res+=str(ar[a])
    res+=")"
    return res

def get_data(row):
    r=[]
    # gender
    if(row[0]=="0.0"):
        r.append('Male')
    else:
        r.append('Female')

    # Married
    if(row[1]==0):
        r.append('No')
    else:
        r.append('Yes')

    # Number of dependents
    if(row[2] in (0,1,2)):
        r.append(str(row[2]))
    else:
        r.append("3+")
    
    # Education
    if(row[3]==0):
        r.append('No')
    else:
        r.append("Yes")

    # self employed
    if(row[4]==0):
        r.append('No')
    else:
        r.append("Yes")

    r.append(row[5])
    r.append(row[6])
    r.append(row[7])
    r.append(row[8])

    # credit history
    if(row[9]==0):
        r.append('No')
    else:
        r.append("Yes")

    # property area
    if(row[10]=="1.0"):
        r.append('Urban')
    elif(row[10]=="2.0"):
        r.append("Rural")
    else:
        r.append('Semi-urban')

    # Loan approved
    if(row[11]==0):
        r.append('No')
    else:
        r.append("Yes")

    return r

@app.route("/user/add",methods=["POST"])
def addUser():
    print("add user")
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
    print("delete user")
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
        resp = flask.make_response()
        resp.set_cookie('username', uname)
        print(resp,type(resp))
        return(str(uname),200)

# ----------------- tested

@app.route("/loan/predict",methods=["POST"])
def predict():
    print("predict")
    global model
    gender = int(request.get_json()["gender"])
    married = int(request.get_json()["married"])
    dependents = int(request.get_json()["dependents"])
    education = int(request.get_json()["education"])
    selfEmployed = int(request.get_json()["self employed"])
    appInc = int(request.get_json()["applicant income"])
    cappInc = int(request.get_json()["coapplicant income"])
    loanAmt = int(request.get_json()["loan amount"])
    loanTerm = int(request.get_json()["loan term"])
    credHist = int(request.get_json()["credit history"])
    propAr = int(request.get_json()["property area"])

    data = [[gender,married,dependents,education,selfEmployed,appInc,cappInc,loanAmt,loanTerm,credHist,propAr]]

    res = model.predict(data)
    data[0].append(res[0])
    print("----------------------------------------------\n",res[0],"\n-------------------------------------")
    obj = {
        "operation": "insert",
        "column": "",
        "insert": "'"+",".join([str(i) for i in data[0]])+"'",
        "table": "loans"
    }
    obj = json.dumps(obj)  # stringified json
    obj = json.loads(obj)  # content-type:application/json
    # send request to db api
    x = requests.post("http://localhost:5000/db/write", json=obj)
    return (str(res[0]),200)
    

@app.route("/loan/query",methods=["POST"])
def querydb():
    print("query")
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
        gen="("
        for g in range(len(gender)):
            if(g!=0):
                gen+=","
            if(gender[g]==0):
                gen+="0.0"
            else:
                gen+="1.0"
        gen+=")"
        # gender = make_str(gender)
        where+="Gender IN "+gen
        flag=1
    if(married!=''):
        married = make_str(married)
        if(flag==1):
            where+=' AND'
        flag=1
        where+=' Married IN '+married
    if(len(dependents)!=0):
        dependents = make_str(dependents)
        if(flag==1):
            where+=' AND'
        flag=1
        where+=' Dependents IN '+dependents
    if(education!=''):
        education = make_str(education)
        if(flag==1):
            where+=' AND'
        flag=1
        where+=' Education IN'+education
    if(selfEmployed!=''):
        selfEmployed = make_str(selfEmployed)
        if(flag==1):
            where+=' AND'
        flag=1
        where+=' Self_Employed IN '+selfEmployed
    if(len(appInc)!=0):
        if(flag==1):
            where+=' AND'
        flag=1
        if(appInc[0]==None):
            appInc[0]=0
        if(appInc[1]==None):
            appInc[1]=10000
        where+='(ApplicantIncome BETWEEN '+str(appInc[0])+' AND '+str(appInc[1])+')'
    if(len(cappInc)!=0):
        if(flag==1):
            where+=' AND'
        flag=1
        if(cappInc[0]==None):
            cappInc[0]=0
        if(cappInc[1]==None):
            cappInc[1]=10000
        where+='(CoapplicantIncome BETWEEN '+str(cappInc[0])+' AND '+str(cappInc[1])+')'
    if(len(loanAmt)!=0):
        if(flag==1):
            where+=' AND'
        flag=1
        if(loanAmt[0]==None):
            loanAmt[0]=0
        if(loanAmt[1]==None):
            loanAmt[1]=10000
        where+='(LoanAmount BETWEEN '+str(loanAmt[0])+' AND '+str(loanAmt[1])+')'
    if(len(loanTerm)!=0):
        if(flag==1):
            where+=' AND'
        flag=1
        if(loanTerm[0]==None):
            loanTerm[0]=0
        if(loanTerm[1]==None):
            loanTerm[1]=1000
        where+='(Loan_Amount_Term BETWEEN '+str(loanTerm[0])+' AND '+str(loanTerm[1])+')'
    if(credHist!=''):
        credHist = make_str(credHist)
        if(flag==1):
            where+=' AND'
        flag=1
        where+=' Credit_History IN '+credHist
    if(propAr!=''):
        prop="("
        for g in range(len(propAr)):
            if(g!=0):
                prop+=","
            if(propAr[g]==1):
                prop+="1.0"
            elif(propAr[g]==2):
                prop+="2.0"
            else:
                prop+="3.0"
        prop+=")"
        if(flag==1):
            where+=' AND'
        flag=1
        where+=' Property_Area IN '+prop
    if(status!=''):
        status = make_str(status)
        if(flag==1):
            where+=' AND'
        flag=1
        where+=' Loan_Status IN '+status

    obj = {
        "columns": "*",
        "where": where,
        "table": "loans"
    }

    mydb = sqlite3.connect(db)
    qu = "SELECT * FROM loans WHERE ("+ where +");"
    # qu = "SELECT * FROM loans;"

    # print("****************************************************************************")
    print(qu)

    s=mydb.execute(qu)
        
    res = ''
    for row in s:
        print(row)
        row = get_data(row)
        r = str(row)
        r = r[1:-1:1]
        res+=r+";"
    # print(r2)
    mydb.close()
    print(res)
    return (jsonify(res), 200)
        

@app.route("/loan/graph",methods=["GET"])
def graph():
    global colList
    print("graphs")
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
    num=request.args['num']
    name = str(num)+".png"
    return send_file(name, mimetype='image/png')

    

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
        mydb.commit()

    for val in Y_train.values:
        query = "INSERT INTO loans ('Loan_Status') VALUES ("+str(val)+")"
        mydb.execute(query)
        mydb.commit()

if __name__=='__main__':
    app.debug=True
    app.run()
