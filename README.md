# Selection Tests for project 'Ingesting the Canadian Common CV'

1. The data was analysed in a jupyter notebook [data-analysis.ipynb](data-analysis.ipynb)

2. The data was ingested to a sqlite database by parsing the XML Data and inserting the records accordingly to the database using python. The code for this lies in [ingest.py](ingest.py)

The file can be run to ingest data from any XML File having a similar format to a sqlite database using the following Command line arguements :

```(bash)
python3 ingest.py <XML-File-Location> <DatabaseFile-Name>
```

In case no arguements are provided, the default arguements would be used. Currently, the data of posts has been ingested in ***bio-info.db*** file.

3. The API was made in Flask.

i. Enter the following commands once in terminal to create a virtual environment and install the dependencies :
```
pipenv shell
pipenv install -r requirements.txt
virtualenv run
```

ii. Enter the following command to run the server :-
```
env FLASK_ENV=development FLASK_APP=app.py flask run
```

iii. The API documentation can be viewed [here](https://documenter.getpostman.com/view/8064496/SzS2wnmA?version=latest)

4. The frontend was made in React.

i. Enter the following commands to move to 'frontend' directory and install the dependencies :
```
cd frontend
npm install
```

ii. To run the frontend in browser, enter the following command :
```
npm start
```

## Screenshots of the web application

![home page](https://selection-tests-cjchirag7.s3.ap-south-1.amazonaws.com/home.png)
![search page](https://selection-tests-cjchirag7.s3.ap-south-1.amazonaws.com/search-results.png)
![post detail page](https://selection-tests-cjchirag7.s3.ap-south-1.amazonaws.com/post-detail-1.png)
![post detail page](https://selection-tests-cjchirag7.s3.ap-south-1.amazonaws.com/post-detail-2.png)