let students = [];

// Load students from API
async function loadStudents(){

const response = await fetch("https://jsonplaceholder.typicode.com/users");
const data = await response.json();

students = data.slice(0,5).map(user => ({
name: user.name,
marks: [
Math.floor(Math.random()*100),
Math.floor(Math.random()*100),
Math.floor(Math.random()*100)
]
}));

displayStudents();
}


// Add student manually
function addStudent(){

const name = document.getElementById("name").value;

const m1 = Number(document.getElementById("m1").value);
const m2 = Number(document.getElementById("m2").value);
const m3 = Number(document.getElementById("m3").value);

const student = {
name: name,
marks: [m1,m2,m3]
};

students.push(student);

displayStudents();

}


// Calculate average
function calculateAverage(marks){

let total = marks.reduce((a,b)=>a+b,0);

return (total / marks.length).toFixed(2);

}


// Calculate grade
function calculateGrade(avg){

if(avg >= 80) return "A";
if(avg >= 60) return "B";
if(avg >= 50) return "C";

return "F";

}


// Delete student
function deleteStudent(index){

students.splice(index,1);

displayStudents();

}


// Display table
function displayStudents(){

let table = "";

students.forEach((student,index)=>{

let avg = calculateAverage(student.marks);
let grade = calculateGrade(avg);

table += `
<tr>

<td>${student.name}</td>

<td>${student.marks.join(", ")}</td>

<td>${avg}</td>

<td>${grade}</td>

<td>
<button onclick="deleteStudent(${index})">Delete</button>
</td>

</tr>
`;

});

document.getElementById("studentTable").innerHTML = table;

}