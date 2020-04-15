import pandas as pd
from sklearn.utils import resample
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
import numpy as np
import matplotlib.pyplot as plt



def fix_df():
    df = pd.read_csv("loan_data_set.csv")
    
    df['Gender'] = df['Gender'].map({'Female': 1, 'Male': 0})
    df['Married'] = df['Married'].map({'Yes': 1, 'No': 0})
    df['Dependents'] = df['Dependents'].map({'0':0,'1': 1, '2': 2,'3+':3})
    df['Self_Employed'] = df['Self_Employed'].map({'Yes': 1, 'No': 0})
    df['Property_Area'] = df['Property_Area'].map({'Urban':1,'Rural':2,'Semiurban':3})
    df['Education'] = df['Education'].map({'Graduate': 1, 'Not Graduate': 0})
    df['Loan_Status'] = df['Loan_Status'].map({'Y': 1, 'N': 0})

    df = df.dropna()
    df = upsample(df)
    return df

def upsample(df):
    # Separate majority and minority classes
    df_majority = df[df.Loan_Status==1]
    df_minority = df[df.Loan_Status==0]
    
    # Upsample minority class
    df_minority_upsampled = resample(df_minority, 
                                    replace=True,     # sample with replacement
                                    n_samples=332,    # to match majority class
                                    random_state=123) # reproducible results
    
    # Combine majority class with upsampled minority class
    df_upsampled = pd.concat([df_majority, df_minority_upsampled])
    
    # Display new class counts
    # df_upsampled.Loan_Status.value_counts()
    return df_upsampled

def split_df(df):
    Y = df['Loan_Status']
    X = df.drop(['Loan_Status','Loan_ID'],axis=1)

    X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.33, random_state=42)

    return(X_train,Y_train,X_test,Y_test)

def get_XY(X_train, Y_train, col1):
    X=[0,1]
    u = X_train[col1].unique()
    u = np.sort(u)
    u=list(u)
    print(u)
    Y=[]
    Y_train=Y_train.values
#     print(X)
    for x in u:
        Y.append([0,0])
#     print(Y)
    i=0
    for index,row in X_train.iterrows():
        Y[u.index(row[col1])][Y_train[i]]+=1
        i+=1    
    return(X,Y)

def plot_bar(X_train,Y_train,col,barWidth,colList):
    X,Y = get_XY(X_train,Y_train,colList[col][0])
    Xf=[]
    if(len(colList[col][1])==3):
        Xf.append([x-barWidth/3 for x in X])
        Xf.append(X)
        Xf.append([x+barWidth/3 for x in X])
    elif(len(colList[col][1])==4):
        Xf.append([x-barWidth/4 for x in X])
        Xf.append([x-barWidth/2 for x in X])
        Xf.append([x+barWidth/2 for x in X])
        Xf.append([x+barWidth/4 for x in X])
    else:     
        Xf.append([x-barWidth/2 for x in X])
        Xf.append([x + barWidth/2 for x in X])
    colors=('#7f6d5f','#557f2d','#e57373','#00bfa5')
    for i in range(len(Y)):                                                                                             
        plt.bar(Xf[i], Y[i], color=colors[i], width=barWidth, edgecolor='white', label=colList[col][1][i])
    plt.legend()
    plt.xticks([0,1])
    plt.title(colList[col][0]+" vs loan approval numbers")
    plt.grid(False)
    plt.xlabel('Loan Status')
    plt.ylabel('Count')
    plt.savefig("./graphs/"+str(col)+".png")
    plt.clf()


