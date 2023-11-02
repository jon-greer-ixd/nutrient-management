//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

//Data
var farm_details = require('./data/farm_details.json');
var field_details = require('./data/field_details.json');

router.get('/', function (req, res) { 
    req.session.data.farm_details = farm_details
    req.session.data.field_details = field_details
    req.session.data.chosenfield = null
    // for (var x in field_details) {
    //     console.log ( field_details[x].name )
    // }
    // console.log( `Welcome to ${req.session.data.farm_details.name}` );
    res.render('index')
})

router.get(/manure_again_handler/, function (req, res) { 
        console.log( `manure_again ${req.session.data.manure_again}` );
    if (req.session.data.manure_again == "yes") {
        res.redirect('q5_manure_when')
    } else {
        res.redirect('check')
    }
})

router.get(/create_plan_handler/, function (req, res) { 
    for ( var y in req.session.data.field_details ) {
        if(req.session.data.field_details[y].reference === req.query.chosenfield) {
            req.session.data.chosenfield = req.session.data.field_details[y]
        }
    }
    console.log(req.session.data.chosenfield.name)
    res.redirect('q1_use')
})

router.get(/manure_if_handler/, function (req, res) { 
if (req.session.data.manure_if == "yes") {
    res.redirect('q5_manure_when')
} else {
    res.redirect('check')
}
})

