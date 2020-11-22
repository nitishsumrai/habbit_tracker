const { query } = require('express');
const express = require('express');
const path = require('path');

const portNumber = 8000;
const app = express();
const db = require('./config/mongoose')
const Hobby = require("./models/hobbies");
const today = new Date().getDate();
const todayTS = new Date();
const mlSInADay = 86400 * 1000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// render home page for user 
app.get('/', function (req, res) {
    Hobby.find({}, function (err, Hobbies) {
        if (err) {
            console.log('Error in fetching Hobbies from Db');
            return;
        }
        res.render('home', {
            title: 'Habit Tracker',
            Hobbies: Hobbies,
            today: today
        });
    });
});
// render weekly info page for user
app.get('/weekly', function (req, res) {

    // get dates of last 7 days in a array
    let lastSevenDates = [];
    for (let i = 0; i <= 6; i++) {
        lastSevenDates.unshift(new Date(todayTS - mlSInADay * i).getDate());
    }

    Hobby.find({}, function (err, Hobbies) {
        if (err) {
            console.log('Error in fetching Hobbies from Db');
            return;
        }
        // array to keep info of job status of each hobby for last week
        let statusOfHobbiesForLast7Days = [];

        for (let hobby of Hobbies) {
            let statusOfHobbyForLast7Days = [];

            // get an array of dates to check if any date is already present in model or not and if not mark its JobStatus as nothing
            let dates = hobby.dates.map(ele => ele.date);

            for (let cdate of lastSevenDates) {
                if (dates.includes(cdate)) {
                    let indexOfDate = dates.indexOf(cdate);
                    statusOfHobbyForLast7Days.push(hobby.dates[indexOfDate]);
                } else {
                    statusOfHobbyForLast7Days.push({ date: cdate, jobStatus: 'nothing' });

                }
            }
            // push job status of last seven days in array for each hobby
            statusOfHobbiesForLast7Days.push(statusOfHobbyForLast7Days);
        }
        res.render('weekly', {
            title: 'Habit Tracker',
            Hobbies: Hobbies,
            statusOfHobbiesForLast7Days: statusOfHobbiesForLast7Days
        });
    });
});
app.get('/update-hobby-status/', function (req, res) {
    console.log(req.query);
    Hobby.findById(req.query.hobbyid, function (err, hobby) {
        if (err) {
            console.log('error in finding a hobby for updating its status');
            return;
        }
        // isDatePresent to see wheather date is already present in Dates of hobby if not then add it. 
        let isDatePresent = false;
        hobby.dates.forEach(function (element, index) {
            if (element.date == req.query.date) {
                console.log('Change status of this habbit', req.query.date);
                if (element.jobStatus == "nothing") {
                    hobby.dates[index].jobStatus = "done"
                } else {
                    if (element.jobStatus == "done") {
                        hobby.dates[index].jobStatus = "not done"
                    } else {
                        hobby.dates[index].jobStatus = "nothing"
                    }
                }
                isDatePresent = true;
            }
        });
        console.log(isDatePresent);
        //    status of date passed in req is not present, add it
        if (!isDatePresent) {
            // add new date at 0th Index of array
            hobby.dates.unshift({
                date: req.query.date,
                jobStatus: 'done'
            });
        }

        hobby.save(function (err) {
            if (err) {
                console.log("Error in updatins status of a Hobby", err)
            }
            return res.redirect('back');
        });
    });
});
// create a hobby
app.post('/create-habit', async function (req, res) {
    const hobby = new Hobby({
        nameOfHobby: req.body.nameOfHobby,
        dates: [{ date: today }]
    })
    console.log(hobby)
    await hobby.save(function (err) {
        if (err) {
            console.log("Error in createing a Hobby", err)
        }
        res.redirect('back');
    });
});
// delete a hobby
app.get('/delete-hobby/', function (req, res) {
    console.log(req.query);
    Hobby.findByIdAndDelete(req.query.id, function (err, hobby) {
        if (err) {
            console.log('Error in deleting a hobby');
            return;
        }
        res.redirect('back');
    });
})
// change the status and if today is not present then add it
app.post('/status/', function (req, res) {
    console.log(req.body)
    Hobby.findOne({ _id: req.query.id }, function (err, hobby) {
        if (err) {
            console.log('Error in fetching a hobby to update its Status');
            return;
        }
        // change today's status
        if (hobby.dates[hobby.dates.length - 1].date == today) {
            hobby.dates[hobby.dates.length - 1].jobStatus = req.body.jobStatus
        } else {
            // push today's status
            hobby.dates.push({
                jobStatus: req.body.jobStatus,
                date: today
            })
        }
        hobby.save(function (err) {
            if (err) {
                console.log('Error in updating jobstatus of a hobby');
                return;
            }
            return res.redirect('back');
        })
    })
});

app.listen(portNumber, function (err) {
    if (err) {
        console.log('server is not running', err);
    }
    console.log('server is up and running on Port:', portNumber);
});
