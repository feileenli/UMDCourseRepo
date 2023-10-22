const express = require('express');
const app = express();
const port = 5151;
const axios = require('axios');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});

app.post('/submit', (req, res) => {
    const id = req.body.id;
    const url = `/${id}`;
    res.redirect(url);
});

app.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const api_response = await axios.get(`https://api.umd.io/v1/courses/${id}`);

        //parsing the JSON response from the api 
        const courseID = id;
        const courseData = api_response.data; 
        const courseName = courseData.name;
        const courseDescription = courseData.description;
        const credits = courseData.credits;

        res.render('class', {courseID, courseName, courseDescription, credits}); 
    
    } catch (error) {
        res.status(404).send('Course not found');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



// app.get('/open-course-page/:courseCode', async (req, res) => {
//     const courseCode = req.params.courseCode.toLowerCase(); // Convert to lowercase

//     // Fetch the list of all courses from the API (adjust the URL as needed)
//     const apiUrl = 'https://api.umd.io/v1/courses';

//     try {
//         const response = await fetch(apiUrl);
//         const data = await response.json();

//         const courseData = data.find((course) => course.course_id === courseCode);

//         if (courseData) {
//             // Extract relevant information
//             const courseID = courseData.course_id;
//             const courseName = courseData.name;
//             const courseDescription = courseData.description;
//             const credits = courseData.credits;

//             // Render the EJS template with the extracted data
//             res.render('home', {
//                 courseID,
//                 courseName,
//                 courseDescription,
//                 credits,
//             });
//         } else {
//             res.send('Course not found');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         res.send('An error occurred while fetching course data');
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });



