class Controller {
  constructor(facade) {
    this.facade = facade;
  }

  create(req, res) {
    this.facade
      .create(req.body)
      .then(doc => res.status(201).json(doc))
      .catch(err => res.send(err.status || 500, err.json || err));
  }

  find(req, res) {
    return this.facade
      .find(req.query)
      .then(collection => res.status(200).json(collection))
      .catch(err => res.send(err.status || 500, err.json || err));
  }

  findOne(req, res) {
    return this.facade
      .findOne(req.query)
      .then(doc => res.status(200).json(doc))
      .catch(err => res.send(err.status || 500, err.json || err));
  }

  findById(req, res) {
    return this.facade
      .findById(req.params.id)
      .then(doc => {
        if (!doc) {
          return res.sendStatus(404);
        }
        return res.status(200).json(doc);
      })
      .catch(err => res.send(err.status || 500, err.json || err));
  }

  update(req, res) {
    this.facade
      .update({ _id: req.params.id }, req.body)
      .then(results => {
        if (results.n < 1) {
          return res.sendStatus(404);
        }
        if (results.nModified < 1) {
          return res.sendStatus(304);
        }
        res.sendStatus(204);
      })
      .catch(err => res.send(err.status || 500, err.json || err));
  }

  remove(req, res) {
    this.facade
      .remove({ _id: req.params.id })
      .then(doc => {
        if (!doc) {
          return res.sendStatus(404);
        }
        return res.sendStatus(204);
      })
      .catch(err => res.send(err.status || 500, err.json || err));
  }
}

module.exports = Controller;
