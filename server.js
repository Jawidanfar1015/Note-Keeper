// importing dependecies
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const { json } = require('express');
const { notStrictEqual } = require('assert');

// setting up server
const app = express();
// assigning port for the server
const PORT = process.env.PORT || 3334;

// Static Middleware, using json and urlencoded true
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));