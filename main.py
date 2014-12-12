#!/usr/bin/env python
"""
Example for Facebook Python SDK
Author: Colin Su <littleq0903@gmail.com>
"""
from bottle import Bottle, run, template
from bottle import static_file
from bottle import jinja2_template
from bottle import request
from bottle import static_file
import json
import facebook

import os



# setup these environment variable by adding "heroku.config"
# - FACEBOOK_APP_ID
# - FACEBOOK_SECRET
FACEBOOK_APP_ID = os.environ['FACEBOOK_APP_ID']
FACEBOOK_SECRET = os.environ['FACEBOOK_SECRET']

# WSGI handler
app = Bottle()

# Checkpoint 0
@app.route('/static/<filename:path>')
def static(filename):
    return static_file(filename, root='static/')


#@app.route('/main_map')
@app.route('/')
def main_map():
    template_data = {
        'facebook_app_id': FACEBOOK_APP_ID
    }
    return static_file('main_map.html', root='./')
	
@app.route('/fb_test')
def index():
    template_data = {
        'facebook_app_id': FACEBOOK_APP_ID
    }
    return jinja2_template('index.html', **template_data)

@app.route('/cp1')
def cp1():
    fb_access_token = request.cookies['fb_access_token']
    fb_graph = facebook.GraphAPI(fb_access_token)
    profile = fb_graph.get_object("me")
    return json.dumps(profile)
        
    #    return "cp1"

