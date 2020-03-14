#!/usr/bin/python

import sys
import sqlite3
from datetime import datetime
import xml.etree.ElementTree as ET


def date(timestamp):
    """Function to convert a timestamp to date"""
    return datetime.strptime(timestamp[:-4], '%Y-%m-%dT%H:%M:%S')


if len(sys.argv) == 1:
    xmlFile = 'bioinformatics_posts_se.xml'
else:
    xmlFile = sys.argv[1]

tree = ET.parse(xmlFile)
root = tree.getroot()

if len(sys.argv) <= 2:
    databaseFile = 'bio-info.db'
else:
    databaseFile = sys.argv[2]

conn = sqlite3.connect(databaseFile)

curr = conn.cursor()

curr.execute('''CREATE TABLE IF NOT EXISTS posts
(Id integer primary key,
PostTypeId integer not null,
LastEditDate date,
ViewCount integer default 0,
AcceptedAnswerId integer,
Title string,
AnswerCount integer default 0,
LastEditorUserId integer,
CommentCount integer default 0,
ClosedDate date,
Body string,
CreationDate date,
OwnerUserId integer,
LastActivityDate date,
ParentId integer,
OwnerDisplayName string,
Score integer default 0,
FavoriteCount integer default 0
)''')

curr.execute('''CREATE TABLE IF NOT EXISTS post_tag_map
(
postId integer,
tag string,
FOREIGN KEY (postId)
REFERENCES posts(Id)
)''')

dtypes = {'Id': int,
          'PostTypeId': int,
          'LastEditDate': date,
          'ViewCount': int,
          'AcceptedAnswerId': int,
          'Title': str,
          'AnswerCount': int,
          'LastEditorUserId': int,
          'CommentCount': int,
          'ClosedDate': date,
          'Body': str,
          'CreationDate': date,
          'OwnerUserId': int,
          'LastActivityDate': date,
          'ParentId': int,
          'OwnerDisplayName': str,
          'Score': int,
          'FavoriteCount': int}

for child in root:
    attrs = []
    vals = []
    variables = []
    for attr, val in child.attrib.items():
        if attr == 'Tags':
            tags = val[1:-1].split("><")
            for tag in tags:
                curr.execute('INSERT INTO post_tag_map('+'postId,tag'+')' +
                             ' VALUES('+'?,?' + ')', (child.attrib['Id'], tag))
        else:
            variables.append("?")
            attrs.append(attr)
            dtype = dtypes[attr]
            if(dtype == date):
                vals.append(str(dtype(val)))
            elif dtype == int:
                vals.append(int(val))
            else:
                vals.append(val)
    curr.execute('INSERT INTO posts('+(','.join(attrs))+')' +
                 ' VALUES('+(','.join(variables)) + ')', vals)

conn.commit()
conn.close()
