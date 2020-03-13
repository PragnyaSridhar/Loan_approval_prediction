from flask import Flask,render_template,jsonify,request,abort
import flask
import sqlite3
import os
import requests


# apis required
#   1   - add user(signup)
#   2   - delete user(deactivate)
#   3   - validate user(login)
#   4   - predict loan approval
#   5   - query db
#   6   - graphs
#   7   - clear db/reset db


app = Flask(__name__)
flag=os.system("find . -name 'loan.db'")
if(flag==0):
    mydb = sqlite3.connect('loan.db')

    #create tables
    mydb.execute("CREATE TABLE users (uname VARCHAR(255),pswd VARCHAR(40))")
    mydb.execute("CREATE TABLE loans ()")
    mydb.commit()

    #populate table with initial dataset
    x = requests.post("http://localhost:5000/db/reset")

# train model

@app.route("/user/add",methods=["PUT"])
def addUser():
    pass

@app.route("/user/<username>",methods=["DELETE"])
def delUser(username):
    pass

@app.route("/user/login",methods=["POST"])
def login():
    pass

@app.route("/loan/predict",methods=["POST"])
def predict():
    pass

@app.route("/loan/query",methods=["POST"])
def query():
    pass

@app.route("/loan/graph",methods=["POST"])
def graph():
    pass

@app.route("/db/reset",methods=["POST"])
def resetDB():
    pass

if __name__=='__main__':
    app.debug=True
    app.run()