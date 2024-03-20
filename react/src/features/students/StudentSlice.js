import { createSlice } from "@reduxjs/toolkit";


const studentSlice = createSlice({
        name:"Student",
        initialState:{
            studentsList:[
                {
                    id:1,
                    name:"John",
                    age:20
                },
                {
                    id:2,
                    name:"Jane",
                    age:21,
                },
                {
                    id:3,
                    name:"Jack",
                    age:22
                },
                {
                    id:4,
                    name:"Jill",
                    age:23
                },
                {
                    id:5,
                    name:"Joe",
                    age:24
                }
            ],
            studentObject:{}
        },
        reducers:{
            getStudents:(state) => {
                
            },
            createStudent:(state, actions) => {
                let payload = {
                    id:state.studentsList.length + 1,
                    name:actions.payload.name,
                    age:actions.payload.age
                }
                state.studentsList.push(payload)
            },
            deleteStudent:(state, actions) => {
                
            },
            
            getStudentById:(state, actions) => {
                    console.log("actions.payload",JSON.stringify(actions.payload));
            },
            updateStudent:(state, actions) => {
                
            }
        },
});


export const { 
    getStudents,
    createStudent,
    deleteStudent,
    getStudentById,
    updateStudent,

 } = studentSlice.actions;

 export default studentSlice.reducer

