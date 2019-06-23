const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const OrganisationSchema = mongoose.Schema({
  name: String,
  yearFounded: Number,
  revenue: String
}, {
  timestamps: true
});

mongoose.model('Organisation', OrganisationSchema);
