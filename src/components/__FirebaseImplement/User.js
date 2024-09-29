// User.js
// basic dataStructure of a User structure stored in DB
// class member: check in documentation
import userTasks from "./userTasks";
class User {
    // 1. Members
    // PART I registered on LoginSignUp
    #userEmail;
    #userPassword;

    // PART II 
    // If upon sign-in PART II information = default, abort PART I from DB (delete account)
    #userName; 
    #priority;

    // PART III userTasks
    #registeredTasks = []; //hold data of type userTasks

    // 2. Constructor
    constructor(userEmail, userPassword, userName = -1) { // by default, userName is -1
        this.#userEmail = userEmail; // MUST
        this.#userPassword = userPassword; // MUST
        this.#userName = userName; 
    } 

    // 3. Getter
    get userEmail() {
        return this.#userEmail;
    }

    get userPassword() {
        return this.#userPassword;
    }

    get userName() {
        return this.#userName;
    }

    // 4. Accessor
    set userEmail(value) {
        this.#userEmail = value; 
    }

    set userPassword(value) {
        this.#userPassword = value; 
    }

    set userName(value) {
        this.#userName = value; 
    }

    set registeredTasks(value) {
        this.#registeredTasks = value; 
    }

    // Adding Tasks
    addTask(task) {
        if (task instanceof Tasks) { 
            this.#registeredTasks.push(task);
        } else {
            throw new Error("Invalid task. Must be an instance of Tasks.");
        }
    }

    /* Overloaded method for adding a task with details
    addTaskDetails(taskTitle, taskDescription,taskPriority) {
        const newTask = new userTasks(taskTitle, taskDescription,taskPriority);
        this.#registeredTasks.push(newTask);
    }

    // Removing Tasks
    removeTask(task) {
        const index = this.#registeredTasks.indexOf(task);
        if (index > -1) {
            this.#registeredTasks.splice(index, 1);
        } else {
            throw new Error("Task not found.");
        }
    }*/
}

export default User;
 /* Not implementing for this demo version
    static VALID_WORKING_STYLES = [-1, 0, 1, 2];
    #workingStyle;

     // related to tasks

    /*static MAX_FAVOURITE = 3;
    #favTasks;

    static TIME_DAY_START = "00:00"; //
    static TIME_DAY_END = "23:59"; // 
    #dayStart;
    #dayEnd;
    */

    /*this.#workingStyle = workingStyle; 
    this.#favTasks = [User.MAX_FAVOURITE]; 
    this.#dayStart = User.TIME_DAY_START; 
    this.#dayEnd = User.TIME_DAY_END;
    
    
    get workingStyle() {
        return this.#workingStyle;
    }

    set workingStyle(value) {
        if (User.VALID_WORKING_STYLES.includes(value)) {
            this.#workingStyle = value; 
        } else {
            throw new Error("Invalid working style. Must be one of: " + User.VALID_WORKING_STYLES.join(", "));
        }
    }
   
*/   