export interface User{
    id:number,
    name:string,
    email:string,
    password:string,
    type:'admin'| 'teacher' | 'student';
}

// Sample Data of Users in Database
const users: User[] = [
    { id: 1, name: 'Admin', email: 'admin@example.com', password: 'admin@1234', type: 'admin' },
    { id: 2, name: 'Teacher', email: 'teacher@example.com', password: 'teacher@1234', type: 'teacher' },
    { id: 3, name: 'Student', email: 'student@example.com', password: 'student@1234', type: 'student' }
   ];