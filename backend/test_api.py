import requests

# add user successfully
def test_adduser1():
    obj1 = {
        "username":"lav",
        "password":"123",
        "confirm password":"123"
    }
    response = requests.post("http://localhost:5000/user/add", json = obj1)
    assert(response.status_code == 201)

# passwords dont match
def test_adduser2():
    obj1 = {
        "username": "prag",
        "password": "123",
        "confirm password":"124"
    }
    response = requests.post("http://localhost:5000/user/add", json = obj1)
    assert(response.status_code == 400)

# if user exists, dont add
def test_adduser3():
    obj1 = {
        "username": "unique",
        "password": "123",
        "confirm password":"124"
    }
    response = requests.post("http://localhost:5000/user/add", json = obj1)
    assert(response.status_code == 400)

# delete user successfully
def test_deluser1():
    response = requests.delete("http://localhost:5000/user/lav")
    assert(response.status_code == 200)

# dont delete user who doesnt exist
def test_deluser2():
    response = requests.delete("http://localhost:5000/user/UserWhoDoesntExist")
    assert(response.status_code == 400)

# get correct response body
def test_readdb1():
    obj1 = {
        "columns": "uname,pswd",
        "where": "uname='unique'",
        "table": "users"
    }
    response = requests.post("http://localhost:5000/db/read", json = obj1)
    response_body = response.json()
    assert(response_body == [["unique","123"]]
    )

# get empty response body if user doesnt exist
def test_readdb2():
    obj1 = {
        "columns": "uname,pswd",
        "where": "uname='randomUser'",
        "table": "users"
    }
    response = requests.post("http://localhost:5000/db/read", json = obj1)
    response_body = response.json()
    assert(response_body == [])

# ensure write isnt returning some wrong response
def test_writedb1():
    obj1 = {
            "operation": "insert",
            "column": "(uname,pswd)",
            "insert": "['joshi','123']",
            "table": "users"
        }
    response = requests.post("http://localhost:5000/db/write", json = obj1)
    response_body = response.json()
    assert(response_body == {})

# write success
def test_writedb2():
    obj1 = {
            "operation": "insert",
            "column": "(uname,pswd)",
            "insert": "['ram','123']",
            "table": "users"
        }
    response = requests.post("http://localhost:5000/db/write", json = obj1) 
    assert(response.status_code == 200)

def test_querygraph():
    response = requests.get("http://localhost:5000/loan/graph")
    assert(response.headers['Content-Type'] == "image/png")