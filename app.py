import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, request
from sqlalchemy import create_engine

from flask import Response,json

from flask import Flask, jsonify

from flask_cors import CORS, cross_origin

from flask import Flask, render_template



#################################################
# Database Setup
#################################################


# Creating a search engine
engine = create_engine(f'postgres://opmfpaidxrrblr:373f90b1388a2db48e1e451d78cdbebc29d6b740c3be05de36c82f4398c06850@ec2-34-196-34-158.compute-1.amazonaws.com:5432/d4pn5auatd9uv3')

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table

tableData_results = engine.execute("SELECT * FROM tabledata").fetchall()

pointsData_results = engine.execute("SELECT * FROM country_points").fetchall()

csvFile_results = engine.execute("SELECT * FROM country_list").fetchall()

coffeequality_results = engine.execute("SELECT * FROM coffeequality").fetchall()

ml_data_results = engine.execute("SELECT * FROM ml_table").fetchall()

tableData = []
pointsData = []
csvFile = []
coffeedata = []
ml_data = []

# for i in coffeequality_results:
#     a = {"species":i[0],"country":i[1],"harvest_year":i[2],"aroma":i[3],"cupper_points":i[4],"sweetness":i[5],"clean_cup":i[6],"uniformity":i[7],"balance":i[8],"body":i[9],"acidity":i[10],"aftertaste":i[11],"flavor":i[12],"total_cup_points":i[13]}
#     new.append(a)

for i in tableData_results:
    a = {'Species':i[0],'Owner':i[1],'Country of Origin':i[2],'Aroma':i[3],'Flavor':i[4],'Aftertaste':i[5],'Acidity':i[6],'Body':i[7],'Balance':i[8],'Uniformity':i[9],'Clean Cup':i[10],'Sweetness':i[11],'Cupper Points':i[12],'Total Cup Points':i[13]}
    tableData.append(a)

for i in pointsData_results:
    b = {'Species':i[0],'Country_of_Origin':i[1],'Avg_Cup_Points':i[2]}
    pointsData.append(b)

for i in csvFile_results:
    c = {'country':i[0]}
    csvFile.append(c)

for i in coffeequality_results:
    d = {"species":i[0],"country":i[1],"harvest_year":i[2],"aroma":i[3],"cupper_points":i[4],"sweetness":i[5],"clean_cup":i[6],"uniformity":i[7],"balance":i[8],"body":i[9],"acidity":i[10],"aftertaste":i[11],"flavor":i[12],"total_cup_points":i[13]}
    coffeedata.append(d)

for i in ml_data_results:
    e = {"Acidity":i[0],"Aftertaste":i[1],"Aroma":i[2],"Balance":i[3],"Body":i[4],"Clean Cup":i[5],"Cupper Points":i[6],"Flavor":i[7],"Sweetness":i[8],"Uniformity":i[9],"Total Cup Points":i[10]}
    ml_data.append(e)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)



#################################################
# Flask Routes
#################################################


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/tableData", methods=["GET"])
def tabledata():   
    return (json.dumps(tableData))

@app.route("/pointsData", methods=["GET"])
def pointsdata():    
    return (json.dumps(pointsData))

@app.route("/csvFile", methods=["GET"])
def csvfile():     
    return (json.dumps(csvFile))


@app.route("/coffeedata", methods=["GET"])
def welcome():   
    return (json.dumps(coffeedata))



@app.route("/coffee_map")
def coffee_map():
    return render_template("coffee_map.html")

@app.route("/radar")
def radar():
    return render_template("radar.html")

@app.route("/sean")
def sean():
    return render_template("Sean_intro.html")

@app.route("/gina")
def gina():
    return render_template("gina_intro.html")

if __name__ == '__main__':
    app.run(debug=True)
