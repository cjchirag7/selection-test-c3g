# Selection Tests for project 'Ingesting the Canadian Common CV'

1. The data was analysed in a jupyter notebook [data-analysis.ipynb](data-analysis.ipynb)

2. The data was ingested to a sqlite database by parsing the XML Data and inserting the records accordingly to the database using python. The code for this lies in [ingest.py](ingest.py)

The file can be run to ingest data from any XML File having a similar format to a sqlite database using the following Command line arguements :

```(bash)
python3 ingest.py <XML-File-Location> <DatabaseFile-Name>
```

In case no arguements are provided, the default arguements would be used.
