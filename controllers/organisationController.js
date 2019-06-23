const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Organisation = mongoose.model('Organisation');

router.get('/', (req, res) => {
    res.render("organisation/addOrEdit", {
        viewTitle: "Insert Organisation"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

function insertRecord(req, res) {
    var organisation = new Organisation();
    organisation.name = req.body.name || "Untitled Organisation";
    organisation.yearFounded = req.body.yearFounded;
    organisation.revenue = req.body.revenue;
    organisation.save((err, doc) => {
        if (!err)
            res.redirect('organisation/list');
        else {
            console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Organisation.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('organisation/list'); }
        else {
            console.log('Error during record update : ' + err);
        }
    });
}

router.get('/list', (req, res) => {
    Organisation.find((err, docs) => {
        if (!err) {
            res.render("organisation/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving organisation list :' + err);
        }
    });
});

router.get('/:id', (req, res) => {
    Organisation.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("organisation/addOrEdit", {
                viewTitle: "Update Organisation",
                organisation: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Organisation.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/organisation/list');
        }
        else { console.log('Error in organisation delete :' + err); }
    });
});

module.exports = router;
