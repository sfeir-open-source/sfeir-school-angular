'use strict';

const _ = require('underscore');
const PEOPLES = require('./data/persons').people.map(person => {
  // work with timestamps, it's cleaner
  person.entryDate = parseDate(person.entryDate);
  person.birthDate = parseDate(person.birthDate);
  return person;
});

exports.listAll = function (req, res) {
  console.log('List all PEOPLES');
  if (!PEOPLES || PEOPLES.length === 0) {
    return res.status(204).json();
  }
  return res.status(200).json(PEOPLES);
};

exports.filterByName = function (req, res) {
  const name = getParam(req, 'name');
  console.log('List by name : name=' + name);

  const filteredPeoples = _.union(_.where(PEOPLES, { lastname: name }), _.where(PEOPLES, { firstname: name }));

  return res.status(200).json(filteredPeoples);
};

exports.filterBySkill = function (req, res) {
  const skill = getParam(req, 'skill');
  console.log('List by skill : skill=' + skill);

  const filteredPeoples = _.filter(PEOPLES, function (person) {
    return _.contains(person.skills, skill);
  });

  return res.status(200).json(filteredPeoples);
};

exports.get = function (req, res) {
  const id = getId(req);
  console.log('Get person : id=' + id);

  const person = _.findWhere(PEOPLES, { id: id });

  if (!person) {
    return res.status(404).json({ error: 'La personne avec l\'id "' + id + '" n\'existe pas.' });
  }

  return res.status(200).json(person);
};

exports.getRandom = function (req, res) {
  const person = PEOPLES[Math.floor(Math.random() * PEOPLES.length)];
  if (!person) {
    return res.status(204).json();
  }
  return res.status(200).json(person);
};

exports.create = function (req, res) {
  const person = req.body;
  const lastname = person.lastname;
  const firstname = person.firstname;
  console.log('Create person : lastname=' + lastname + ', firstname=' + firstname);

  const found = _.findWhere(PEOPLES, { lastname: lastname, firstname: firstname });
  if (found) {
    return res.status(409).json({ error: 'La personne "' + lastname + ' ' + firstname + '" existe déjà.' });
  }

  delete person.id;
  person.id = createId();
  person.entryDate = parseDate('01/03/2016');
  person.birthDate = parseDate('02/06/1991');
  PEOPLES.push(person);

  return res.status(200).json(person);
};

exports.update = function (req, res) {
  const id = getId(req);
  console.log('Update person : id=' + id);

  const person = req.body;

  const index = _.findIndex(PEOPLES, function (p) {
    return p.id === id;
  });

  if (index === -1) {
    return res.status(404).json({ error: 'La personne avec l\'id "' + id + '" n\'existe pas.' });
  }

  Object.assign(PEOPLES[index], person);

  return res.status(200).json(PEOPLES[index]);
};

exports.delete = function (req, res) {
  const id = getId(req);
  console.log('Delete person : id=' + id);

  const index = _.findIndex(PEOPLES, function (p) {
    return p.id === id;
  });

  if (index === -1) {
    return res.status(404).json({ error: 'La personne avec l\'id "' + id + '" n\'existe pas.' });
  }

  PEOPLES.splice(index, 1);

  if (!PEOPLES || PEOPLES.length === 0) {
    return res.status(204).json();
  }

  return res.status(200).json(PEOPLES);
};

function getParam(req, param) {
  return req.params[param];
}

function getId(req) {
  const param = getParam(req, 'id');
  return param;
}

function createId() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 24; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

function parseDate(stringDate) {
  const dates = stringDate.split('/');
  return new Date(dates[2] + '/' + dates[1] + '/' + dates[0]).getTime();
}
