from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def dict_factory(cursor, row):

    d = {}

    for idx, col in enumerate(cursor.description):

        d[col[0]] = row[idx]

    return d

@app.route('/')
def home():
  return '''<h1 align="center"> Welcome to API for Selection Test of "Ingesting the Canadian Common CV"</h1><br/>
  <h2 align="center"> View API Documentation <a href="https://documenter.getpostman.com/view/8064496/SzS2wnmA?version=latest">here</a></h2><br/>
  <h2 align="center"> View the frontend at <a href="http://localhost:3000/">http://localhost:3000/</a></h2>'''

@app.route('/posts')
def get_posts():
    # Create cursor
    con = sqlite3.connect("bio-info.db")
    con.row_factory = dict_factory
    cur = con.cursor()
    field = request.args.get('sort')
    order = request.args.get('order')
    if field != 'ViewCount' and field != 'Score':
        field = 'CreationDate'  # default field
    if order != 'desc':
        order = 'asc'  # default order
    cur.execute("SELECT * FROM posts ORDER BY "+field+" "+order)
    posts = cur.fetchall()
    con.close()
    return jsonify(results=posts, success=True)


@app.route('/search')
def search_posts():
    con = sqlite3.connect("bio-info.db")
    con.row_factory = dict_factory
    cur = con.cursor()
    keyword = request.args.get('keyword')
    if keyword == None:
        keyword = ''
    pattern = '%'+keyword+'%'
    cur.execute(
        "SELECT * FROM posts WHERE Title LIKE ? OR Body LIKE ? ORDER BY CreationDate asc", (pattern, pattern))
    posts = cur.fetchall()
    con.close()
    return jsonify(results=posts, success=True)


@app.route('/posts/<string:id>')
def get_post(id):
    con = sqlite3.connect("bio-info.db")
    con.row_factory = dict_factory
    cur = con.cursor()
    cur.execute("SELECT * FROM posts WHERE Id=?", [id])
    post = cur.fetchone()
    if post==None:
      return jsonify(error="Invalid PostId", success=False)
    cur.execute("SELECT tag FROM post_tag_map WHERE postId=?", [id])
    tagList = cur.fetchall()
    tags = []
    for tag in tagList:
        tags.append(tag['tag'])
    con.close()
    post['Tags'] = tags
    return jsonify(results=post, success=True)
